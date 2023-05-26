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
    }
    document.querySelector('html')?.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={themeState}>
    {children}
  </ThemeContext.Provider>;
};

export default ThemeContextProvider;
