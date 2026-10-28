import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, Translations, DICTIONARY } from '../utils/i18n';
import { PreferredQuality, QualityOption } from '../types';

type Theme = 'dark' | 'light';

interface ThemeLanguageContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  preferredQuality: PreferredQuality;
  setPreferredQuality: (q: PreferredQuality) => void;
  matchPreferredQuality: (options: QualityOption[]) => QualityOption;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('en');
  const [preferredQuality, setPreferredQualityState] = useState<PreferredQuality>('1080p');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Initialize theme, language, and preferredQuality from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('savey_theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        setThemeState('light');
      }

      const savedLang = localStorage.getItem('savey_lang') as Language | null;
      if (savedLang === 'en' || savedLang === 'id') {
        setLanguageState(savedLang);
      } else {
        setLanguageState('en');
      }

      const savedQuality = localStorage.getItem('savey_preferred_quality') as PreferredQuality | null;
      if (savedQuality === '1080p' || savedQuality === '720p' || savedQuality === 'mp3') {
        setPreferredQualityState(savedQuality);
      } else {
        setPreferredQualityState('1080p');
      }
    } catch (e) {
      console.warn('Failed to read settings from localStorage:', e);
    }
  }, []);

  // Update HTML class and body attributes when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#f5f5f7';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1d1d1f';
    }
    try {
      localStorage.setItem('savey_theme', theme);
    } catch (e) {
      console.warn(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('savey_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn(e);
    }
  };

  const setPreferredQuality = (q: PreferredQuality) => {
    setPreferredQualityState(q);
    try {
      localStorage.setItem('savey_preferred_quality', q);
    } catch (e) {
      console.warn(e);
    }
  };

  // Helper to pick the user's preferred option from a video's quality options list
  const matchPreferredQuality = useCallback(
    (options: QualityOption[]): QualityOption => {
      if (!options || options.length === 0) {
        return {
          id: 'hd',
          label: '1080p Master',
          resolution: '1080p',
          format: 'mp4',
          url: '',
        };
      }

      if (preferredQuality === '1080p') {
        const hd = options.find(
          (o) =>
            o.resolution.toLowerCase().includes('1080') ||
            o.id.toLowerCase() === 'hd' ||
            o.label.toLowerCase().includes('1080')
        );
        if (hd) return hd;
        const mp4 = options.find((o) => o.format === 'mp4');
        if (mp4) return mp4;
        return options[0];
      }

      if (preferredQuality === '720p') {
        const sd = options.find(
          (o) =>
            o.resolution.toLowerCase().includes('720') ||
            o.id.toLowerCase() === 'sd' ||
            o.label.toLowerCase().includes('720')
        );
        if (sd) return sd;
        const mp4 = options.find((o) => o.format === 'mp4');
        if (mp4) return mp4;
        return options[0];
      }

      if (preferredQuality === 'mp3') {
        const audio = options.find(
          (o) => o.format === 'mp3' || o.id === 'audio' || o.label.toLowerCase().includes('mp3')
        );
        if (audio) return audio;
        return options[0];
      }

      return options[0];
    },
    [preferredQuality]
  );

  const t = DICTIONARY[language];

  return (
    <ThemeLanguageContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        language,
        setLanguage,
        t,
        preferredQuality,
        setPreferredQuality,
        matchPreferredQuality,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};
