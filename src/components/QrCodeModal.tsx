import React, { useState } from 'react';
import { X, Smartphone, Check, Copy, ExternalLink } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
}) => {
  const { language } = useThemeLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isEn = language === 'en';
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    videoUrl
  )}&margin=10&color=000000&bgcolor=ffffff`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl relative text-center transition-all pb-8 sm:pb-7">
        {/* Mobile Drag Indicator */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-5 h-5" />
        </div>

        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-1">
          {isEn ? 'Scan to Phone Gallery' : 'Pindai ke Galeri HP'}
        </h3>
        <p className="text-[12px] text-slate-600 dark:text-[#86868b] max-w-xs mx-auto mb-5">
          {isEn
            ? 'Point your iPhone or Android camera at this QR code to download directly to your mobile photo gallery.'
            : 'Arahkan kamera ponsel Anda ke kode QR ini untuk langsung mengunduh dan menyimpan ke galeri HP.'}
        </p>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl inline-block shadow-md border border-slate-200 mx-auto mb-5">
          <img
            src={qrSvgUrl}
            alt="QR Code"
            className="w-48 h-48 rounded-lg object-contain mx-auto"
          />
        </div>

        {/* Video title snippet */}
        <p className="text-[11px] text-slate-500 dark:text-[#86868b] truncate max-w-[260px] mx-auto mb-4 font-mono">
          {videoTitle}
        </p>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-900 dark:text-white text-[12px] font-semibold rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isEn ? 'Link Copied' : 'Tautan Tersalin') : (isEn ? 'Copy Direct Link' : 'Salin Tautan')}</span>
          </button>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full transition-colors cursor-pointer shadow-sm shadow-[#0071e3]/20"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
