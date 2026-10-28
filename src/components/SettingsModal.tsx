import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  Check,
  Sparkles,
  Zap,
  Music2,
  Sun,
  Moon,
  Globe,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { PreferredQuality } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    t,
    preferredQuality,
    setPreferredQuality,
    theme,
    toggleTheme,
    language,
    setLanguage
  } = useThemeLanguage();

  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectQuality = (quality: PreferredQuality) => {
    setPreferredQuality(quality);
    const label =
      quality === '1080p'
        ? '1080p Master'
        : quality === '720p'
        ? '720p Data Saver'
        : 'MP3 Audio';
    setSavedFeedback(`${t.settings.savedFeedback} ${label}`);
    setTimeout(() => {
      setSavedFeedback(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative text-left transition-all max-h-[90vh] overflow-y-auto no-scrollbar pb-8 sm:pb-7">
        {/* Mobile Drag Indicator */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">
                {t.settings.title}
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
                {t.settings.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Feedback Banner */}
        {savedFeedback && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-[12px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-medium">{savedFeedback}</span>
          </div>
        )}

        {/* SECTION 1: DEFAULT VIDEO QUALITY */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {t.settings.qualitySectionTitle}
            </h4>
            <span className="text-[11px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              {language === 'en' ? 'Auto-Saved' : 'Tersimpan Otomatis'}
            </span>
          </div>
          <p className="text-[12px] text-slate-500 dark:text-[#86868b] mb-3 leading-relaxed">
            {t.settings.qualitySectionDesc}
          </p>

          <div className="space-y-2.5">
            {/* 1080p Option */}
            <div
              onClick={() => handleSelectQuality('1080p')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                preferredQuality === '1080p'
                  ? 'bg-blue-50/70 dark:bg-[#0071e3]/10 border-[#0071e3] dark:border-[#2997ff] ring-1 ring-[#0071e3] dark:ring-[#2997ff]'
                  : 'bg-slate-50 dark:bg-[#121214] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 border-[#0071e3] dark:border-[#2997ff]">
                {preferredQuality === '1080p' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0071e3] dark:bg-[#2997ff]" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-16">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-white">
                    {t.settings.opt1080Title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] text-[10px] font-bold">
                    {t.settings.opt1080Tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#86868b] mt-1 leading-snug">
                  {t.settings.opt1080Desc}
                </p>
              </div>

              <span className="absolute top-3.5 right-3.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                1080p MP4
              </span>
            </div>

            {/* 720p Option */}
            <div
              onClick={() => handleSelectQuality('720p')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                preferredQuality === '720p'
                  ? 'bg-blue-50/70 dark:bg-[#0071e3]/10 border-[#0071e3] dark:border-[#2997ff] ring-1 ring-[#0071e3] dark:ring-[#2997ff]'
                  : 'bg-slate-50 dark:bg-[#121214] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 border-[#0071e3] dark:border-[#2997ff]">
                {preferredQuality === '720p' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0071e3] dark:bg-[#2997ff]" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-16">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-white">
                    {t.settings.opt720Title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                    {t.settings.opt720Tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#86868b] mt-1 leading-snug">
                  {t.settings.opt720Desc}
                </p>
              </div>

              <span className="absolute top-3.5 right-3.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                720p MP4
              </span>
            </div>

            {/* MP3 Audio Option */}
            <div
              onClick={() => handleSelectQuality('mp3')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                preferredQuality === 'mp3'
                  ? 'bg-blue-50/70 dark:bg-[#0071e3]/10 border-[#0071e3] dark:border-[#2997ff] ring-1 ring-[#0071e3] dark:ring-[#2997ff]'
                  : 'bg-slate-50 dark:bg-[#121214] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 border-[#0071e3] dark:border-[#2997ff]">
                {preferredQuality === 'mp3' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0071e3] dark:bg-[#2997ff]" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-16">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-white">
                    {t.settings.optMp3Title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 text-[10px] font-bold">
                    {t.settings.optMp3Tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#86868b] mt-1 leading-snug">
                  {t.settings.optMp3Desc}
                </p>
              </div>

              <span className="absolute top-3.5 right-3.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                320k MP3
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: SYSTEM PREFERENCES (THEME & LANGUAGE) */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/[0.08]">
          <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
            {t.settings.appearanceTitle}
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {/* Theme Control */}
            <div className="p-3 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-amber-400" />
                ) : (
                  <Sun className="w-4 h-4 text-slate-700" />
                )}
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-[#86868b]">{t.settings.themeLabel}</p>
                  <p className="text-[12px] font-semibold text-slate-900 dark:text-white">
                    {theme === 'dark' ? t.settings.themeDark : t.settings.themeLight}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-white rounded-lg shadow-sm hover:opacity-80 transition-opacity cursor-pointer"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>

            {/* Language Control */}
            <div className="p-3 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-[#86868b]">{t.settings.languageLabel}</p>
                  <p className="text-[12px] font-semibold text-slate-900 dark:text-white uppercase font-mono">
                    {language === 'en' ? 'English (EN)' : 'Indonesia (ID)'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-white rounded-lg shadow-sm hover:opacity-80 transition-opacity cursor-pointer font-mono"
              >
                {language === 'en' ? 'ID' : 'EN'}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: GALLERY INTEGRATION INFO */}
        <div className="mt-5 p-3.5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-[#0071e3]/10 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-[12px] font-semibold text-slate-900 dark:text-white">
              {t.settings.galleryBehaviorTitle}
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-[#86868b] leading-tight mt-0.5">
              {t.settings.galleryBehaviorDesc}
            </p>
          </div>
        </div>

        {/* Footer Done Button */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-medium rounded-full transition-all cursor-pointer shadow-md shadow-[#0071e3]/20"
          >
            {t.settings.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
