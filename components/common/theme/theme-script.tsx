'use client';

export function ThemeScript() {
  // This script will run before hydration to prevent flash of incorrect theme
  const themeScript = `
    (function() {
      try {
        // Get stored theme or use system preference
        const storedTheme = localStorage.getItem('user-preferences');
        const theme = storedTheme ? JSON.parse(storedTheme).state.theme : 'system';
        
        // Get system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = theme === 'system' ? systemTheme : theme;
        
        // Set data-theme attribute before hydration
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Set color scheme meta tag
        const meta = document.createElement('meta');
        meta.name = 'color-scheme';
        meta.content = currentTheme;
        document.head.appendChild(meta);
      } catch (e) {
        console.error('Theme initialization error:', e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
