import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>('light');

  // Load theme from localStorage when user changes
  useEffect(() => {
    if (user?._id) {
      const savedAppSettings = localStorage.getItem(`appSettings_${user._id}`);
      if (savedAppSettings) {
        try {
          const settings = JSON.parse(savedAppSettings);
          if (settings.theme) {
            setThemeState(settings.theme);
          }
        } catch (error) {
          console.error('Error loading theme:', error);
        }
      }
    } else {
      // Reset to default when no user
      setThemeState('light');
    }
  }, [user?._id]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Update localStorage settings
    if (user?._id) {
      const savedAppSettings = localStorage.getItem(`appSettings_${user._id}`);
      let settings = { theme: newTheme, units: 'metric', autoSave: true };
      
      if (savedAppSettings) {
        try {
          settings = { ...JSON.parse(savedAppSettings), theme: newTheme };
        } catch (error) {
          console.error('Error parsing saved settings:', error);
        }
      }
      
      localStorage.setItem(`appSettings_${user._id}`, JSON.stringify(settings));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 