import React, { useState } from 'react';
import { X, Globe, Check, Search, Sparkles } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { SUPPORTED_LANGUAGES, Language, LanguageMeta } from '../utils/i18n';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useThemeLanguage();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = SUPPORTED_LANGUAGES.filter((item) => {
    const q = query.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.cpmRegion.toLowerCase().includes(q)
    );
  });

  const handleSelect = (code: Language) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative text-left transition-all max-h-[90vh] flex flex-col pb-safe">
        {/* Mobile Drag Indicator */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">
                {language === 'en' ? 'Select Region & Language' : 'Pilih Wilayah & Bahasa'}
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
                {language === 'en'
                  ? 'Optimized localized experience & global ad delivery'
                  : 'Pengalaman lokal optimal & penyesuaian konten'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="pt-3 pb-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#86868b]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Search by language, country, or code (e.g. Deutsch, Japan, US)...'
                  : 'Cari bahasa atau negara (contoh: Jerman, Jepang, US)...'
              }
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] rounded-xl text-[12px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#86868b] focus:outline-none focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>
        </div>

        {/* Grid of Languages */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1.5 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((item) => {
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer min-h-[58px] ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-[#0071e3]/15 border-[#0071e3] text-slate-900 dark:text-white ring-1 ring-[#0071e3]/30 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#121214] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.14] text-slate-700 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[22px] leading-none shrink-0" role="img" aria-label={item.name}>
                      {item.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-slate-900 dark:text-white truncate">
                          {item.nativeName}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-slate-200 dark:bg-[#2c2c2e] text-slate-700 dark:text-slate-300">
                          {item.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-[#86868b] truncate mt-0.5">
                        {item.name} · {item.cpmRegion}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0071e3] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-8 text-center text-[12px] text-slate-400">
              {language === 'en' ? 'No matching languages found' : 'Tidak ada bahasa yang cocok'}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#86868b] shrink-0">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0071e3] dark:text-[#2997ff]" />
            <span>12 High-CPM Localized Regions</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium rounded-full text-[12px] cursor-pointer"
          >
            {t.settings.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
