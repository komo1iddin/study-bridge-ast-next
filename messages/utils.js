/**
 * Utility functions for working with translations
 */

/**
 * Converts translations from the legacy flat format to the modular format
 * @param {Object} flatTranslations - The translations in the old flat format
 * @returns {Object} Structured translations object
 */
export function flatToModular(flatTranslations) {
  const result = {
    components: {},
    pages: {},
    common: {}
  };

  // Process each translation key
  Object.entries(flatTranslations).forEach(([key, value]) => {
    if (typeof value === 'object') {
      // Handle nested objects (e.g., navbar, home)
      if (key === 'navbar') {
        result.components.navbar = value;
      } else if (key === 'footer') {
        result.components.footer = value;
      } else if (key === 'common' || key === 'buttons' || key === 'validation' || key === 'status') {
        result.common[key] = value;
      } else {
        // Assume it's a page
        result.pages[key] = value;
      }
    }
  });

  return result;
}

/**
 * Converts modular translations back to the flat format for compatibility
 * @param {Object} modularTranslations - The translations in the modular format
 * @returns {Object} Flat translations object
 */
export function modularToFlat(modularTranslations) {
  const result = {};

  // Process components
  if (modularTranslations.components) {
    Object.entries(modularTranslations.components).forEach(([component, translations]) => {
      result[component] = translations;
    });
  }

  // Process pages
  if (modularTranslations.pages) {
    Object.entries(modularTranslations.pages).forEach(([page, translations]) => {
      result[page] = translations;
    });
  }

  // Process common
  if (modularTranslations.common) {
    Object.entries(modularTranslations.common).forEach(([key, translations]) => {
      result[key] = translations;
    });
  }

  return result;
}

/**
 * Function to migrate legacy translation files to the new modular format
 * @param {string} filePath - Path to the legacy translation file
 * @returns {Promise<void>}
 */
export async function migrateTranslationFile(filePath) {
  try {
    // This is a placeholder - in a real implementation you would:
    // 1. Read the file
    // 2. Parse JSON
    // 3. Convert using flatToModular
    // 4. Write to new files in the appropriate directories
    console.log(`Migration of ${filePath} would happen here`);
  } catch (error) {
    console.error(`Error migrating translation file: ${error.message}`);
  }
}

/**
 * Validates that all languages have the same translation keys
 * @param {Object} translations - The combined translations object
 * @returns {Object} Validation results with missing keys by language
 */
export function validateTranslationKeys(translations) {
  const languages = Object.keys(translations);
  const result = {
    valid: true,
    missingKeys: {}
  };

  // Collect all keys from all languages
  const allKeys = new Set();
  const keysByLanguage = {};

  languages.forEach(lang => {
    keysByLanguage[lang] = collectKeys(translations[lang]);
    keysByLanguage[lang].forEach(key => allKeys.add(key));
  });

  // Check if any language is missing keys
  languages.forEach(lang => {
    const missingKeys = Array.from(allKeys).filter(key => !keysByLanguage[lang].has(key));
    if (missingKeys.length > 0) {
      result.valid = false;
      result.missingKeys[lang] = missingKeys;
    }
  });

  return result;
}

/**
 * Helper function to collect all keys from a nested object
 * @param {Object} obj - The object to collect keys from
 * @param {string} prefix - Prefix for nested keys
 * @returns {Set<string>} Set of all keys
 */
function collectKeys(obj, prefix = '') {
  const keys = new Set();
  
  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.add(fullKey);
    
    if (typeof value === 'object' && value !== null) {
      collectKeys(value, fullKey).forEach(nestedKey => keys.add(nestedKey));
    }
  });
  
  return keys;
} 