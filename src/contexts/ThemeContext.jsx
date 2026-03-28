import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Theme preference: 'light', 'dark', or 'system'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) return saved;
    return 'system';
  });

  // Font size preference: 'small', 'medium', 'large'
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    if (saved && ['small', 'medium', 'large'].includes(saved)) return saved;
    return 'medium';
  });

  // Apply theme (dark class)
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (newTheme) => {
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else if (newTheme === 'light') {
        root.classList.remove('dark');
      } else if (newTheme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    };
    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (theme === 'system') {
        if (e.matches) root.classList.add('dark');
        else root.classList.remove('dark');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  // Apply font size (by setting root font-size)
  useEffect(() => {
    const root = document.documentElement;
    let fontSizePx = 16;
    if (fontSize === 'small') fontSizePx = 14;
    else if (fontSize === 'large') fontSizePx = 18;
    else fontSizePx = 16;
    root.style.fontSize = `${fontSizePx}px`;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};