#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2]; //my-api

if (!projectName) {
  console.error("Please provide a project name.");
  process.exit(1);
}


//project folder name
fs.mkdirSync(projectName);

// copy template files
function copyTemplates(source, destination) {
  const items = fs.readdirSync(source);
   
  items.forEach((item) => {
    const sourcePath = `${source}/${item}`;
    const destinationPath = `${destination}/${item}`;
    
    // Check if the item is a directory or a file
    const stats = fs.statSync(sourcePath);
   
    // If it's a directory, create it in the destination and copy its contents recursively
    if (stats.isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true });
      copyTemplates(sourcePath, destinationPath);
    }
    // If it's a file, copy it to the destination
     else {
      const content = fs.readFileSync(sourcePath, "utf-8");
      fs.writeFileSync(destinationPath, content);
    }
  });
}
const templatePath = path.join(__dirname, "templates");
copyTemplates(templatePath,  projectName);

console.log(`
✅ Backend project created successfully!

Next steps:

cd ${projectName}
npm install
npm run dev
`); 
