import { DEFAULT_THEME, MantineProvider } from '@mantine/core';
import { createContext, useContext, useState, ReactNode } from 'react';
import { orangeTheme } from './theme';

interface ThemeContextType {
  isOrangeTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isOrangeTheme, setIsOrangeTheme] = useState(true);

  const toggleTheme = () => {
    setIsOrangeTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isOrangeTheme, toggleTheme }}>
      <MantineProvider theme={isOrangeTheme ? orangeTheme : DEFAULT_THEME}>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}