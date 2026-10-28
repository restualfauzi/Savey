import React, { useState, useEffect } from 'react';
import {
  ArrowDownToLine,
  Clock,
  Sun,
  Moon,
  Globe,
  SlidersHorizontal,
  Menu,
  X,
  Smartphone,
  CheckCircle2,
  HelpCircle,
  Layers
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';

interface NavbarProps {
  onOpenHistory: () => void;
  historyCount: number;
  onScrollToDownloader: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  historyCount,
  onScrollToDownloader,
}) => {
  const {
    theme,
    toggleTheme,
    language,
    t,
    preferredQuality,
    setPreferredQuality,
    setIsSettingsOpen,
    setIsLanguageModalOpen,
  } = useThemeLanguage();

  const currentLangMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMobileNavClick = (callback?: () => void) => {
    setMobileMenuOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 apple-glass-nav h-12 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="/"
            className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center text-[10px]">
              <ArrowDownToLine className="w-3 h-3 stroke-[2.5]" />
            </span>
            <span>Savey</span>
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-normal text-slate-600 dark:text-[#86868b]">
            <a
              href="#downloader"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.downloader}
            </a>
            <a
              href="#platforms"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.platforms}
            </a>
            <a
              href="#gallery-guide"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.galleryGuide}
            </a>
            <a
              href="#features"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.specs}
            </a>
            <a
              href="#faq"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Zone 3: Desktop Controls + Mobile Hamburger Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher Modal Trigger */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.08] rounded-full transition-all flex items-center gap-1.5 cursor-pointer min-h-[32px]"
              title={`${currentLangMeta.nativeName} (${currentLangMeta.name})`}
              aria-label="Select language"
            >
              <span className="text-[13px] leading-none" role="img" aria-label={currentLangMeta.name}>
                {currentLangMeta.flag}
              </span>
              <span className="uppercase font-mono font-semibold">{language}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-slate-700 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.08] rounded-full transition-all cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </button>

            {/* User Settings - Visible on sm+ */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hidden sm:flex px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.08] rounded-full transition-all items-center gap-1 cursor-pointer min-h-[32px]"
              title={t.settings.title}
            >
              <SlidersHorizontal className="w-3 h-3 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="font-mono font-semibold uppercase">{preferredQuality}</span>
            </button>

            {/* History - Visible on sm+ */}
            <button
              onClick={onOpenHistory}
              className="hidden sm:flex px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 items-center gap-1.5 cursor-pointer min-h-[32px]"
              title="View download history"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t.nav.history}</span>
              {historyCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (Desktop) */}
            <button
              onClick={onScrollToDownloader}
              className="hidden sm:flex px-3.5 py-1 text-[12px] font-medium text-white bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm min-h-[32px] items-center justify-center"
            >
              {t.nav.downloadNow}
            </button>

            {/* Mobile Hamburger Toggle Button (44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 -mr-1 flex items-center justify-center text-slate-700 dark:text-[#f5f5f7] hover:bg-slate-100 dark:hover:bg-[#161618] rounded-full transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.2]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-12 bottom-0 z-40 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-2xl md:hidden overflow-y-auto flex flex-col justify-between border-b border-slate-200 dark:border-white/[0.08] animate-fadeIn pb-safe">
          <div className="p-5 space-y-4">
            {/* Quick Mobile History, Language & Settings Card */}
            <div className="grid grid-cols-3 gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => handleMobileNavClick(onOpenHistory)}
                className="p-2.5 bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-all min-h-[64px]"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center mb-1">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-900 dark:text-white truncate block max-w-full">
                  {t.nav.history}
                </span>
                <span className="text-[9px] text-slate-500 dark:text-[#86868b]">
                  {historyCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleMobileNavClick(() => setIsLanguageModalOpen(true))}
                className="p-2.5 bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-all min-h-[64px]"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-[#2c2c2e] flex items-center justify-center mb-1 text-[14px]">
                  {currentLangMeta.flag}
                </div>
                <span className="text-[11px] font-semibold text-slate-900 dark:text-white uppercase font-mono truncate block max-w-full">
                  {language}
                </span>
                <span className="text-[9px] text-slate-500 dark:text-[#86868b] truncate max-w-full">
                  {currentLangMeta.nativeName}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleMobileNavClick(() => setIsSettingsOpen(true))}
                className="p-2.5 bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-all min-h-[64px]"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center mb-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-900 dark:text-white truncate block max-w-full">
                  {t.settings.navSettings}
                </span>
                <span className="text-[9px] font-mono font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase">
                  {preferredQuality}
                </span>
              </button>
            </div>

            {/* Navigation Links with Iconography */}
            <nav className="space-y-1">
              <a
                href="#downloader"
                onClick={() => handleMobileNavClick()}
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#161618] active:bg-slate-200 dark:active:bg-[#2c2c2e] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center shrink-0">
                  <ArrowDownToLine className="w-4 h-4" />
                </div>
                <span>{t.nav.downloader}</span>
              </a>

              <a
                href="#platforms"
                onClick={() => handleMobileNavClick()}
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#161618] active:bg-slate-200 dark:active:bg-[#2c2c2e] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <span>{t.nav.platforms}</span>
              </a>

              <a
                href="#gallery-guide"
                onClick={() => handleMobileNavClick()}
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#161618] active:bg-slate-200 dark:active:bg-[#2c2c2e] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span>{t.nav.galleryGuide}</span>
              </a>

              <a
                href="#features"
                onClick={() => handleMobileNavClick()}
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#161618] active:bg-slate-200 dark:active:bg-[#2c2c2e] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>{t.nav.specs}</span>
              </a>

              <a
                href="#faq"
                onClick={() => handleMobileNavClick()}
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#161618] active:bg-slate-200 dark:active:bg-[#2c2c2e] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span>{t.nav.faq}</span>
              </a>
            </nav>
          </div>

          {/* Mobile Footer Drawer Actions */}
          <div className="p-5 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-[#0c0c0e]/50 space-y-3.5">
            {/* Preferred Quality Quick Switcher */}
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-[#86868b] uppercase tracking-wider mb-2">
                {language === 'en' ? 'Default Download Quality' : 'Kualitas Unduh Utama'}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['1080p', '720p', 'mp3'] as const).map((q) => {
                  const isActive = preferredQuality === q;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setPreferredQuality(q)}
                      className={`py-2 text-[12px] font-semibold rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0071e3] border-[#0071e3] text-white shadow-xs'
                          : 'bg-white dark:bg-[#161618] border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {q === '1080p' ? '1080p HD' : q === '720p' ? '720p Saver' : 'Audio MP3'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Big Action Download Button */}
            <button
              type="button"
              onClick={() => handleMobileNavClick(onScrollToDownloader)}
              className="w-full py-3.5 px-4 bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 text-white font-semibold rounded-2xl text-[14px] shadow-lg shadow-[#0071e3]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
              <span>{t.nav.downloadNow}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
