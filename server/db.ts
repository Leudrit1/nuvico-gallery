// ✅ Lexo .env me rrugë të plotë për ESM
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

// ✅ Importo mysql2/promise
import mysql from "mysql2/promise";

// ✅ Kontrollo nëse variablat e databazës ekzistojnë
const requiredVars = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
for (const variable of requiredVars) {
  if (!process.env[variable]) {
    throw new Error(`❌ ${variable} is not defined in .env file`);
  }
}

// ✅ Krijo pool për lidhje me MySQL
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
