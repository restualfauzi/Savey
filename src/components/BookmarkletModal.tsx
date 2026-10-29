import React, { useState } from 'react';
import { X, Bookmark, MoveRight, ExternalLink, Check, Copy } from 'lucide-react';

interface BookmarkletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkletModal: React.FC<BookmarkletModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://savey.app';
  const bookmarkletCode = `javascript:(function(){window.open('${currentOrigin}/?url='+encodeURIComponent(window.location.href),'_blank');})();`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Bookmarklet Pintas Peramban
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-neutral-400">
                Unduh video 1-klik saat menonton di Instagram, TikTok, atau X
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-[13px] text-slate-600 dark:text-neutral-300">
          <p>
            Tarik (drag &amp; drop) tombol di bawah ini ke <strong>Bilah Bookmark (Bookmarks Bar)</strong> peramban Chrome, Safari, atau Edge Anda:
          </p>

          {/* Draggable Button */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#202022] border border-dashed border-blue-400 dark:border-blue-500/40 text-center flex flex-col items-center justify-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-neutral-400">
              Tarik tombol ini ke bilah bookmark atas:
            </span>
            <a
              href={bookmarkletCode}
              onClick={(e) => {
                e.preventDefault();
                alert('Tarik tombol ini ke Bookmarks Bar (Ctrl+Shift+B / Cmd+Shift+B) di browser Anda!');
              }}
              draggable
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-[13px] shadow-md shadow-blue-500/20 inline-flex items-center gap-2 cursor-grab active:cursor-grabbing active:scale-95 transition-all"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>Simpan ke Savey</span>
            </a>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-semibold text-slate-900 dark:text-white text-[12px] uppercase tracking-wider">
              Cara Menggunakannya:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-[12px] text-slate-600 dark:text-neutral-400 pl-1">
              <li>Buka video di TikTok, Instagram Reels, X/Twitter, atau Facebook di PC.</li>
              <li>Klik bookmark <strong>&quot;Simpan ke Savey&quot;</strong> di baris bookmark Anda.</li>
              <li>Savey otomatis terbuka dan langsung memproses tautan video tersebut tanpa perlu copy-paste!</li>
            </ol>
          </div>

          {/* Copyable Code for Mobile / Advanced */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-500">Kode Bookmarklet:</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-[11px] font-medium text-[#0071e3] dark:text-[#2997ff] flex items-center gap-1 hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>
            <code className="block p-2 rounded-xl bg-slate-100 dark:bg-[#101012] text-[10px] font-mono text-slate-700 dark:text-neutral-400 break-all select-all border border-slate-200 dark:border-white/5">
              {bookmarkletCode}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
