#!/usr/bin/env node

/**
 * Migration script to convert flat translation files to modular structure
 * 
 * Usage: node migrate.js [path/to/file.json] [--dry-run]
 * 
 * This script will:
 * 1. Read the specified JSON file
 * 2. Convert its structure to the modular format
 * 3. Create the appropriate component, page and common files
 * 4. (Optionally) just show what would be done with --dry-run
 */

const fs = require('fs').promises;
const path = require('path');
const { flatToModular } = require('./utils');

async function migrate() {
  const args = process.argv.slice(2);
  const filePath = args[0];
  const dryRun = args.includes('--dry-run');
  
  if (!filePath) {
    console.error('Error: Please provide a file path to migrate.');
    console.error('Usage: node migrate.js [path/to/file.json] [--dry-run]');
    process.exit(1);
  }
  
  try {
    console.log(`Reading file: ${filePath}`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const translations = JSON.parse(fileContent);
    
    // Extract language code from the filename
    const fileName = path.basename(filePath);
    const language = fileName.split('.')[0]; // Assumes format like "en.json"
    
    if (!['en', 'ru', 'uz'].includes(language)) {
      console.warn(`Warning: Unrecognized language code "${language}". Proceeding anyway.`);
    }
    
    console.log(`Converting ${language} translations to modular format...`);
    const modularTranslations = flatToModular(translations);
    
    // Create directories if they don't exist
    const baseDir = path.dirname(filePath);
    const dirs = [
      path.join(baseDir, 'components'),
      path.join(baseDir, 'pages'),
      path.join(baseDir, 'common')
    ];
    
    for (const dir of dirs) {
      if (dryRun) {
        console.log(`[DRY RUN] Would create directory: ${dir}`);
      } else {
        try {
          await fs.mkdir(dir, { recursive: true });
          console.log(`Created directory: ${dir}`);
        } catch (err) {
          if (err.code !== 'EEXIST') throw err;
          console.log(`Directory already exists: ${dir}`);
        }
      }
    }
    
    // Process components
    if (modularTranslations.components) {
      for (const [component, content] of Object.entries(modularTranslations.components)) {
        const componentDir = path.join(baseDir, 'components', component);
        const componentFile = path.join(componentDir, `${language}.json`);
        
        if (dryRun) {
          console.log(`[DRY RUN] Would create directory: ${componentDir}`);
          console.log(`[DRY RUN] Would write file: ${componentFile}`);
          console.log(`[DRY RUN] Contents: ${JSON.stringify(content, null, 2).substring(0, 100)}...`);
        } else {
          try {
            await fs.mkdir(componentDir, { recursive: true });
            await fs.writeFile(componentFile, JSON.stringify(content, null, 2));
            console.log(`Created component file: ${componentFile}`);
          } catch (err) {
            console.error(`Error creating component file ${componentFile}: ${err.message}`);
          }
        }
      }
    }
    
    // Process pages
    if (modularTranslations.pages) {
      for (const [page, content] of Object.entries(modularTranslations.pages)) {
        const pageDir = path.join(baseDir, 'pages', page);
        const pageFile = path.join(pageDir, `${language}.json`);
        
        if (dryRun) {
          console.log(`[DRY RUN] Would create directory: ${pageDir}`);
          console.log(`[DRY RUN] Would write file: ${pageFile}`);
          console.log(`[DRY RUN] Contents: ${JSON.stringify(content, null, 2).substring(0, 100)}...`);
        } else {
          try {
            await fs.mkdir(pageDir, { recursive: true });
            await fs.writeFile(pageFile, JSON.stringify(content, null, 2));
            console.log(`Created page file: ${pageFile}`);
          } catch (err) {
            console.error(`Error creating page file ${pageFile}: ${err.message}`);
          }
        }
      }
    }
    
    // Process common
    if (modularTranslations.common) {
      const commonFile = path.join(baseDir, 'common', `${language}.json`);
      
      if (dryRun) {
        console.log(`[DRY RUN] Would write file: ${commonFile}`);
        console.log(`[DRY RUN] Contents: ${JSON.stringify(modularTranslations.common, null, 2).substring(0, 100)}...`);
      } else {
        try {
          await fs.writeFile(commonFile, JSON.stringify(modularTranslations.common, null, 2));
          console.log(`Created common file: ${commonFile}`);
        } catch (err) {
          console.error(`Error creating common file ${commonFile}: ${err.message}`);
        }
      }
    }
    
    console.log(dryRun ? '[DRY RUN] Migration completed' : 'Migration completed successfully');
    
  } catch (error) {
    console.error(`Error during migration: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

migrate(); 