import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');

// Function to recursively find all .js files
function findJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(findJsFiles(filePath));
    } else if (file.endsWith('.js')) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Find all .js files recursively
const jsFiles = findJsFiles(distDir);

console.log(`Found ${jsFiles.length} JavaScript files to process:`);
jsFiles.forEach(file => console.log(`  - ${path.relative(distDir, file)}`));

// Process each .js file
jsFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace .ts extensions with .js in import statements
  content = content.replace(/\.ts'/g, ".js'");
  content = content.replace(/\.ts"/g, '.js"');
  
  // Fix @shared path aliases to relative paths
  content = content.replace(/from "@shared\/schema"/g, 'from "../shared/schema.js"');
  content = content.replace(/from '@shared\/schema'/g, "from '../shared/schema.js'");
  
  // Add .js extension to relative imports that don't have it
  content = content.replace(/from "\.\/([^"]+)(?<!\.js)"/g, 'from "./$1.js"');
  content = content.replace(/from '\.\/([^']+)(?<!\.js)'/g, "from './$1.js'");
  content = content.replace(/from "\.\.\/([^"]+)(?<!\.js)"/g, 'from "../$1.js"');
  content = content.replace(/from '\.\.\/([^']+)(?<!\.js)'/g, "from '../$1.js'");
  
  // Clean up any double .js extensions
  content = content.replace(/\.js\.js+/g, '.js');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed imports in ${path.relative(distDir, filePath)}`);
});

console.log('Import extensions and path aliases fixed successfully!');
