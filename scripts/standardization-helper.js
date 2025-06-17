#!/usr/bin/env node

/**
 * Standardization Helper Script
 * 
 * This script scans React components to identify usage patterns that should 
 * be migrated to the new standardized typography and spacing system.
 * 
 * Usage: node scripts/standardization-helper.js [directory]
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

// Default directory to scan if none provided
const defaultDir = path.join(process.cwd(), 'app');

// Typography patterns to identify (direct Tailwind classes that should be replaced)
const typographyPatterns = [
  { pattern: /text-(\w+xl|lg|base|sm|xs)\s+font-bold/, standardClass: 'h1-h6 classes' },
  { pattern: /text-(\w+xl|lg|base|sm|xs)\s+font-semibold/, standardClass: 'h5-h6 classes' },
  { pattern: /text-(\w+xl|lg|base|sm|xs)\s+(?!font-(bold|semibold))/, standardClass: 'body classes' },
  { pattern: /font-(raleway|sans)/, standardClass: 'typography classes (built into h1-h6)' },
  { pattern: /tracking-(tight|normal|wide)/, standardClass: 'typography classes (built into h1-h6)' },
  { pattern: /leading-(tight|normal|relaxed|loose)/, standardClass: 'typography classes' },
];

// Spacing patterns to identify
const spacingPatterns = [
  { pattern: /p[xytlrb]-\d+/, standardClass: 'card-padding' },
  { pattern: /m[xytlrb]-\d+/, standardClass: 'stack-* classes' },
  { pattern: /gap-\d+/, standardClass: 'grid-gap or flex-gap classes' },
  { pattern: /py-\d+\s+(?:md|lg):py-\d+/, standardClass: 'section-spacing' },
  { pattern: /px-\d+\s+(?:md|lg):px-\d+/, standardClass: 'section-container' },
  { pattern: /container/, standardClass: 'section-container' },
];

/**
 * Scans a file for patterns that should be migrated to the standardized system
 */
async function scanFile(filePath) {
  // Only scan JSX/TSX files
  if (!['.tsx', '.jsx'].includes(path.extname(filePath))) {
    return null;
  }

  // Skip node_modules
  if (filePath.includes('node_modules')) {
    return null;
  }

  const content = await readFile(filePath, 'utf8');
  const findings = [];

  // Check for typography patterns
  typographyPatterns.forEach(({ pattern, standardClass }) => {
    if (pattern.test(content)) {
      findings.push({
        type: 'typography',
        pattern: pattern.toString(),
        recommendation: standardClass
      });
    }
  });

  // Check for spacing patterns
  spacingPatterns.forEach(({ pattern, standardClass }) => {
    if (pattern.test(content)) {
      findings.push({
        type: 'spacing',
        pattern: pattern.toString(),
        recommendation: standardClass
      });
    }
  });

  if (findings.length === 0) {
    return null;
  }

  return {
    file: filePath,
    findings
  };
}

/**
 * Recursively scan directory for files
 */
async function scanDir(dir) {
  let results = [];
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      const subResults = await scanDir(fullPath);
      results = [...results, ...subResults];
    } else {
      const fileResult = await scanFile(fullPath);
      if (fileResult) {
        results.push(fileResult);
      }
    }
  }

  return results;
}

/**
 * Print the results in a readable format
 */
function printResults(results) {
  console.log('\n=== Standardization Helper Results ===\n');
  
  if (results.length === 0) {
    console.log('✅ No files found that need standardization!');
    return;
  }
  
  console.log(`Found ${results.length} files that should be updated to use the standardized system:\n`);
  
  results.forEach(result => {
    console.log(`📄 ${result.file}`);
    
    // Group findings by type
    const typographyFindings = result.findings.filter(f => f.type === 'typography');
    const spacingFindings = result.findings.filter(f => f.type === 'spacing');
    
    if (typographyFindings.length) {
      console.log('   Typography:');
      const uniqueRecommendations = [...new Set(typographyFindings.map(f => f.recommendation))];
      uniqueRecommendations.forEach(rec => {
        console.log(`   - Replace with ${rec}`);
      });
    }
    
    if (spacingFindings.length) {
      console.log('   Spacing:');
      const uniqueRecommendations = [...new Set(spacingFindings.map(f => f.recommendation))];
      uniqueRecommendations.forEach(rec => {
        console.log(`   - Replace with ${rec}`);
      });
    }
    
    console.log('');
  });
  
  console.log('For complete documentation on the standardization system, see:');
  console.log('docs/standardization-guide.md\n');
}

/**
 * Main function
 */
async function main() {
  try {
    const targetDir = process.argv[2] || defaultDir;
    console.log(`Scanning ${targetDir} for standardization opportunities...`);
    
    const results = await scanDir(targetDir);
    printResults(results);
  } catch (err) {
    console.error('Error scanning files:', err);
    process.exit(1);
  }
}

// Run the script
main(); 