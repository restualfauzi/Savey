import React, { useState } from 'react';
import { X, Smartphone, Apple, Monitor, CheckCircle, ArrowRight } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface GalleryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryGuideModal: React.FC<GalleryGuideModalProps> = ({ isOpen, onClose }) => {
  const { t } = useThemeLanguage();
  const [activeDevice, setActiveDevice] = useState<'ios' | 'android' | 'pc'>('ios');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative text-left transition-all max-h-[90vh] overflow-y-auto no-scrollbar pb-8 sm:pb-8">
        {/* Mobile Drag Indicator */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">
                {t.galleryGuide.title}
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
                {t.galleryGuide.subtitle}
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

        {/* Device Switcher */}
        <div className="grid grid-cols-3 gap-2 my-6 p-1 bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-full">
          <button
            onClick={() => setActiveDevice('ios')}
            className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeDevice === 'ios'
                ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>{t.galleryGuide.iosTab}</span>
          </button>
          <button
            onClick={() => setActiveDevice('android')}
            className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeDevice === 'android'
                ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.galleryGuide.androidTab}</span>
          </button>
          <button
            onClick={() => setActiveDevice('pc')}
            className={`py-2 px-3 rounded-full text-[12px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeDevice === 'pc'
                ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{t.galleryGuide.pcTab}</span>
          </button>
        </div>

        {/* Steps Content */}
        <div className="space-y-4">
          {activeDevice === 'ios' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">{t.galleryGuide.iosStep1Title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-0.5 leading-relaxed">
                    {t.galleryGuide.iosStep1Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">{t.galleryGuide.iosStep2Title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-0.5 leading-relaxed">
                    {t.galleryGuide.iosStep2Desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/80 dark:bg-[#0071e3]/10 border border-blue-200 dark:border-[#0071e3]/20 rounded-2xl flex items-center gap-2.5 text-[12px] text-[#0071e3] dark:text-[#2997ff]">
                <CheckCircle className="w-4 h-4 shrink-0 font-bold" />
                <span>{t.galleryGuide.iosTip}</span>
              </div>
            </div>
          )}

          {activeDevice === 'android' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">{t.galleryGuide.androidStep1Title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-0.5 leading-relaxed">
                    {t.galleryGuide.androidStep1Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">{t.galleryGuide.androidStep2Title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-0.5 leading-relaxed">
                    {t.galleryGuide.androidStep2Desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/80 dark:bg-[#0071e3]/10 border border-blue-200 dark:border-[#0071e3]/20 rounded-2xl flex items-center gap-2.5 text-[12px] text-[#0071e3] dark:text-[#2997ff]">
                <CheckCircle className="w-4 h-4 shrink-0 font-bold" />
                <span>{t.galleryGuide.androidTip}</span>
              </div>
            </div>
          )}

          {activeDevice === 'pc' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">{t.galleryGuide.pcStep1Title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-0.5 leading-relaxed">
                    {t.galleryGuide.pcStep1Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">{t.galleryGuide.pcStep2Title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-0.5 leading-relaxed">
                    {t.galleryGuide.pcStep2Desc}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white active:scale-98 text-[13px] font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#0071e3]/20"
          >
            <span>{t.galleryGuide.doneBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
