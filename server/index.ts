import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import session from "express-session";
import MemoryStore from "memorystore";

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Allow both the server port and Vite dev server ports, plus VPS domain
  if (origin === 'http://localhost:4000' || 
      origin === 'http://localhost:5173' || 
      origin === 'http://localhost:5174' ||
      origin === 'http://72.60.37.178:4000' ||
      origin === 'http://72.60.37.178' ||
      origin?.startsWith('http://localhost:') ||
      origin?.startsWith('http://72.60.37.178:')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// Add session middleware before routes
app.use(session({
  store: new (MemoryStore(session))({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: process.env.SESSION_SECRET || 'temp-secret-key',
  resave: false, // Changed to false for better performance
  saveUninitialized: false, // Changed to false for better security
  name: 'sessionId',
  cookie: { 
    secure: false, // Set to false for HTTP, true for HTTPS
    httpOnly: false, // Set to false for debugging, true for production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax', // Use lax for better compatibility
    domain: undefined, // Let browser set domain automatically
    path: '/'
  }
}));

// Add session debugging middleware
app.use((req, res, next) => {
  console.log('=== Session Middleware ===');
  console.log('Session middleware - Session ID:', req.sessionID);
  console.log('Session middleware - Session data:', req.session);
  console.log('Cookies received:', req.headers.cookie);
  console.log('Session store type:', req.session?.constructor?.name);
  console.log('User ID in session:', req.session?.userId);
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('========================');
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development" && process.env.NODE_ENV !== "production") {
    try {
      await setupVite(app, server);
      console.log("Vite development server configured");
    } catch (error) {
      console.warn("Vite setup failed, falling back to static files:", error);
      serveStatic(app);
    }
  } else {
    console.log("Serving static files from dist/public");
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
})();
