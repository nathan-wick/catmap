import React, {FC, createContext, useEffect, useState} from 'react';

export const ThemeContext = createContext<{
  theme: 'light' | 'dark',
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
}>({
  'theme': 'light',
  'setTheme': () => {
    // Theme Setter
  },
});

export const ThemeContextProvider: FC<{
    children: JSX.Element
}> = ({children}) => {
  const preferredTheme =
    localStorage.getItem('theme') as 'light' | 'dark' | null ?? 'light';
  const [theme, setTheme] = useState<'light' | 'dark'>(preferredTheme);
  const themeState = {
    theme,
    setTheme,
  };

  useEffect(() => {
    if (preferredTheme !== theme) {
      localStorage.setItem('theme', theme);
      location.reload();
    } else {
      if (theme === 'light') {
        document.body.style.backgroundColor = '#f8f9fa';
        document.body.style.color = '#212529';
      } else {
        document.body.style.backgroundColor = '#212529';
        document.body.style.color = '#f8f9fa';
      }
    }
  }, [theme]);

  return <ThemeContext.Provider value={themeState}>
    {children}
  </ThemeContext.Provider>;
};

export default ThemeContextProvider;
