import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, Translations, DICTIONARY, SUPPORTED_LANGUAGES } from '../utils/i18n';
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
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

// Localized SEO Titles & Descriptions for high Google ranking across regions
const SEO_METADATA: Record<Language, { title: string; desc: string }> = {
  en: {
    title: 'Savey – HD Video Downloader (TikTok, Instagram, X, Threads, FB) No Watermark',
    desc: 'Download TikTok, Instagram Reels, X/Twitter, Threads, and Facebook videos without watermark in pristine 1080p HD quality directly to your device gallery for free.',
  },
  id: {
    title: 'Savey – Pengunduh Video HD Tanpa Watermark (TikTok, Instagram, X, Threads, FB)',
    desc: 'Unduh video TikTok, Instagram Reels, X/Twitter, Threads, dan Facebook tanpa tanda air dalam kualitas HD 1080p langsung tersimpan ke galeri perangkat secara gratis.',
  },
  de: {
    title: 'Savey – HD Video Downloader ohne Wasserzeichen (TikTok, Instagram, X, Threads, FB)',
    desc: 'TikTok, Instagram Reels, X/Twitter, Threads und Facebook Videos ohne Wasserzeichen in 1080p Master-Qualität kostenlos direkt in die Fotogalerie herunterladen.',
  },
  fr: {
    title: 'Savey – Téléchargeur Vidéo HD Sans Filigrane (TikTok, Instagram, X, Threads, FB)',
    desc: 'Téléchargez les vidéos TikTok, Instagram Reels, X/Twitter, Threads et Facebook sans filigrane en qualité HD 1080p directement dans votre galerie de photos.',
  },
  es: {
    title: 'Savey – Descargar Videos HD Sin Marca de Agua (TikTok, Instagram, X, Threads, FB)',
    desc: 'Descarga videos de TikTok, Instagram Reels, X/Twitter, Threads y Facebook sin marca de agua en calidad 1080p HD directamente a la galería de tu teléfono gratis.',
  },
  ja: {
    title: 'Savey – 透かしなしHD動画ダウンローダー (TikTok, Instagram, X, Threads, FB)',
    desc: 'TikTok、Instagramリール、X（Twitter）、Threads、Facebookの動画をロゴ・透かしなしの最高画質1080pでスマホの写真アルバムに直接無料保存。',
  },
  nl: {
    title: 'Savey – HD Video Downloader Zonder Watermerk (TikTok, Instagram, X, Threads, FB)',
    desc: 'Download TikTok, Instagram Reels, X/Twitter, Threads en Facebook video’s zonder watermerk in 1080p masterkwaliteit direct naar je fotogalerij.',
  },
  it: {
    title: 'Savey – Scarica Video HD Senza Filigrana (TikTok, Instagram, X, Threads, FB)',
    desc: 'Scarica video da TikTok, Instagram Reels, X/Twitter, Threads e Facebook senza filigrana in alta definizione 1080p direttamente nella galleria del tuo dispositivo.',
  },
  sv: {
    title: 'Savey – Ladda ner HD-video utan vattenstämpel (TikTok, Instagram, X, Threads, FB)',
    desc: 'Ladda ner TikTok, Instagram Reels, X/Twitter, Threads och Facebook videor utan vattenstämpel i 1080p masterkvalitet direkt till din mobilgalleri gratis.',
  },
  no: {
    title: 'Savey – Last ned HD-video uten vannmerke (TikTok, Instagram, X, Threads, FB)',
    desc: 'Last ned videoer fra TikTok, Instagram Reels, X/Twitter, Threads og Facebook uten vannmerke i 1080p masterkvalitet rett til bildegalleriet ditt gratis.',
  },
  ko: {
    title: 'Savey – 워터마크 없는 고화질 HD 비디오 다운로더 (TikTok, Instagram, X, Threads, FB)',
    desc: 'TikTok, Instagram 릴스, X(Twitter), Threads, Facebook 영상을 워터마크 없이 깨끗한 1080p 마스터 화질로 기기 사진 앨범에 직접 무료 다운로드하세요.',
  },
  ar: {
    title: 'Savey – تنزيل مقاطع فيديو HD بدون علامة مائية (تيك توك، إنستغرام، إكس، ثريدز، فيسبوك)',
    desc: 'قم بتنزيل مقاطع الفيديو من تيك توك وإنستغرام ريلز وإكس وثريدز وفيسبوك بدون علامة مائية بجودة 1080p الأصلية مباشرة إلى ألبوم صور هاتفك مجاناً.',
  },
};

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('en');
  const [preferredQuality, setPreferredQualityState] = useState<PreferredQuality>('1080p');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  // Initialize theme, language, and preferredQuality from URL / localStorage / country detection
  useEffect(() => {
    try {
      // 1. Theme
      const savedTheme = localStorage.getItem('savey_theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        setThemeState('light');
      }

      // 2. Language Auto-Detection
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Language | null;
      const validCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

      if (urlLang && validCodes.includes(urlLang)) {
        setLanguageState(urlLang);
      } else {
        const savedLang = localStorage.getItem('savey_lang') as Language | null;
        if (savedLang && validCodes.includes(savedLang)) {
          setLanguageState(savedLang);
        } else {
          // Detect user's country / browser language automatically!
          const browserLang = (navigator.language || '').toLowerCase();
          if (browserLang.startsWith('id')) setLanguageState('id');
          else if (browserLang.startsWith('de')) setLanguageState('de');
          else if (browserLang.startsWith('fr')) setLanguageState('fr');
          else if (browserLang.startsWith('es')) setLanguageState('es');
          else if (browserLang.startsWith('ja')) setLanguageState('ja');
          else if (browserLang.startsWith('nl')) setLanguageState('nl');
          else if (browserLang.startsWith('it')) setLanguageState('it');
          else if (browserLang.startsWith('sv')) setLanguageState('sv');
          else if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) setLanguageState('no');
          else if (browserLang.startsWith('ko')) setLanguageState('ko');
          else if (browserLang.startsWith('ar')) setLanguageState('ar');
          else setLanguageState('en');
        }
      }

      // 3. Quality
      const savedQuality = localStorage.getItem('savey_preferred_quality') as PreferredQuality | null;
      if (savedQuality === '1080p' || savedQuality === '720p' || savedQuality === 'mp3') {
        setPreferredQualityState(savedQuality);
      } else {
        setPreferredQualityState('1080p');
      }
    } catch (e) {
      console.warn('Failed to read settings:', e);
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

  // Update document title, description, lang, and dir when language changes (SEO)
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';

    const seo = SEO_METADATA[language] || SEO_METADATA.en;
    document.title = seo.title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', seo.desc);
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', seo.title);
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', seo.desc);
    }

    try {
      localStorage.setItem('savey_lang', language);
    } catch (e) {
      console.warn(e);
    }
  }, [language]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
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

  const t = DICTIONARY[language] || DICTIONARY.en;

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
        isLanguageModalOpen,
        setIsLanguageModalOpen,
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
