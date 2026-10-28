import React from 'react';
import { X, Smartphone, Apple } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface PwaInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallGuideModal: React.FC<PwaInstallGuideModalProps> = ({ isOpen, onClose }) => {
  const { language } = useThemeLanguage();

  if (!isOpen) return null;

  const isEn = language === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 sm:p-8 shadow-2xl relative text-left transition-all max-h-[90vh] overflow-y-auto no-scrollbar pb-8 sm:pb-8">
        {/* Mobile Drag Indicator */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">
              {isEn ? 'Add Savey to Home Screen' : 'Pasang Savey ke Layar Utama'}
            </h3>
            <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
              {isEn ? 'Use Savey like a native iPhone or Android app' : 'Akses instan seperti aplikasi ponsel bawaan'}
            </p>
          </div>
        </div>

        <div className="space-y-4 my-6">
          {/* iOS Safari */}
          <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl">
            <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Apple className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
              <span>{isEn ? 'On iPhone & iPad (Safari)' : 'Di iPhone & iPad (Safari)'}</span>
            </h4>
            <ol className="text-[12px] text-slate-600 dark:text-[#86868b] space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                {isEn ? 'Tap the ' : 'Ketuk tombol '}
                <strong className="text-slate-900 dark:text-white font-semibold">{isEn ? 'Share icon' : 'Bagikan (Share)'}</strong>
                {isEn ? ' at the bottom of Safari' : ' di bagian bawah Safari'}
              </li>
              <li>
                {isEn ? 'Scroll down and tap ' : 'Gulir ke bawah lalu pilih '}
                <strong className="text-[#0071e3] dark:text-[#2997ff] font-semibold">{isEn ? '"Add to Home Screen"' : '"Tambah ke Layar Utama"'}</strong>
              </li>
              <li>
                {isEn ? 'Tap ' : 'Ketuk '}
                <strong className="text-slate-900 dark:text-white font-semibold">{isEn ? 'Add' : 'Tambah'}</strong>
                {isEn ? ' in top right corner. Savey will appear on your app grid!' : ' di pojok kanan atas. Ikon Savey siap digunakan!'}
              </li>
            </ol>
          </div>

          {/* Android Chrome */}
          <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl">
            <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
              <span>{isEn ? 'On Android (Chrome / Samsung Internet)' : 'Di Android (Chrome / Samsung Internet)'}</span>
            </h4>
            <ol className="text-[12px] text-slate-600 dark:text-[#86868b] space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                {isEn ? 'Tap the ' : 'Ketuk '}
                <strong className="text-slate-900 dark:text-white font-semibold">{isEn ? 'three dots menu (⋮)' : 'menu titik tiga (⋮)'}</strong>
                {isEn ? ' in top right' : ' di pojok kanan atas'}
              </li>
              <li>
                {isEn ? 'Select ' : 'Pilih '}
                <strong className="text-[#0071e3] dark:text-[#2997ff] font-semibold">{isEn ? '"Install App" or "Add to Home screen"' : '"Pasang Aplikasi" atau "Tambah ke Layar Utama"'}</strong>
              </li>
            </ol>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white active:scale-98 text-[13px] font-semibold rounded-full transition-all cursor-pointer shadow-md shadow-[#0071e3]/20"
        >
          {isEn ? 'Got it' : 'Mengerti'}
        </button>
      </div>
    </div>
  );
};
