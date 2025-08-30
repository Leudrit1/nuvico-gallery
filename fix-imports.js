import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');

// Read all .js files in dist directory
fs.readdirSync(distDir).forEach(file => {
  if (file.endsWith('.js') && fs.statSync(path.join(distDir, file)).isFile()) {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace .ts extensions with .js in import statements
    content = content.replace(/\.ts'/g, ".js'");
    content = content.replace(/\.ts"/g, '.js"');
    
    // Fix @shared path aliases to relative paths (avoid double .js)
    content = content.replace(/from "@shared\/([^"]+)"/g, 'from "../shared/$1"');
    content = content.replace(/from '@shared\/([^']+)'/g, "from '../shared/$1'");
    
    // Add .js extension to relative imports that don't have it
    content = content.replace(/from "\.\.\/shared\/([^"]+)"/g, 'from "../shared/$1.js"');
    content = content.replace(/from '\.\.\/shared\/([^']+)'/g, "from '../shared/$1.js'");
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${file}`);
  }
});

console.log('Import extensions and path aliases fixed successfully!');
