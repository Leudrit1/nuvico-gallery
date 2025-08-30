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
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${file}`);
  }
});

console.log('Import extensions fixed successfully!');
