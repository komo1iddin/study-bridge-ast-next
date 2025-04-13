#!/usr/bin/env node

/**
 * Script to create a new component translation
 * 
 * Usage: node create-component.js <component-name>
 * 
 * This script will:
 * 1. Create a directory for the component
 * 2. Create empty translation files for each language
 * 3. Update the index.js file to include the new component
 */

const fs = require('fs').promises;
const path = require('path');

const LANGUAGES = ['en', 'ru', 'uz'];
const DEFAULT_CONTENT = '{\n  \n}';

async function createComponent() {
  const args = process.argv.slice(2);
  const componentName = args[0];
  
  if (!componentName) {
    console.error('Error: Please provide a component name.');
    console.error('Usage: node create-component.js <component-name>');
    process.exit(1);
  }
  
  try {
    // Create component directory
    const componentDir = path.join(__dirname, 'components', componentName);
    
    try {
      await fs.mkdir(componentDir, { recursive: true });
      console.log(`Created directory: ${componentDir}`);
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
      console.log(`Directory already exists: ${componentDir}`);
    }
    
    // Create translation files for each language
    for (const lang of LANGUAGES) {
      const filePath = path.join(componentDir, `${lang}.json`);
      
      try {
        await fs.access(filePath);
        console.log(`File already exists: ${filePath}`);
      } catch {
        // File doesn't exist, create it
        await fs.writeFile(filePath, DEFAULT_CONTENT);
        console.log(`Created file: ${filePath}`);
      }
    }
    
    // Update index.js to import and include the new component
    const indexPath = path.join(__dirname, 'index.js');
    const indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Check if component is already in index.js
    if (indexContent.includes(`import ${componentName}En from`)) {
      console.log(`Component ${componentName} already imported in index.js`);
    } else {
      // Add imports
      const importStatements = LANGUAGES.map(lang => 
        `import ${componentName}${lang.charAt(0).toUpperCase() + lang.slice(1)} from './components/${componentName}/${lang}.json';`
      ).join('\n');
      
      // Add to messages object
      const updatedIndexContent = indexContent
        // Add imports after the last import
        .replace(/^(import.+;\n+)/m, match => `${match}${importStatements}\n\n`)
        // Add to each language object
        .replace(/en: {([^}]*)}/s, match => match.replace(/(\s+)(\/\/ Add other sections)/s, `$1${componentName}: ${componentName}En,\n$1$2`))
        .replace(/ru: {([^}]*)}/s, match => match.replace(/(\s+)(\/\/ Add other sections)/s, `$1${componentName}: ${componentName}Ru,\n$1$2`))
        .replace(/uz: {([^}]*)}/s, match => match.replace(/(\s+)(\/\/ Add other sections)/s, `$1${componentName}: ${componentName}Uz,\n$1$2`));
      
      await fs.writeFile(indexPath, updatedIndexContent);
      console.log(`Updated index.js with ${componentName} imports and exports`);
    }
    
    console.log(`Component ${componentName} translation template created successfully!`);
    console.log(`Don't forget to add your translations to the files in ${componentDir}`);
    
  } catch (error) {
    console.error(`Error creating component: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

createComponent(); 