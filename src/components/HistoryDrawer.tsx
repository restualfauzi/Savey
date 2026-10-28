import React from 'react';
import { X, Trash2, Download, Film, Clock, Play } from 'lucide-react';
import { DownloadHistoryItem } from '../types';
import { PLATFORMS } from '../utils/platforms';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DownloadHistoryItem[];
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
  onReDownload: (item: DownloadHistoryItem) => void;
  onPreview?: (item: DownloadHistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onDeleteItem,
  onReDownload,
  onPreview,
}) => {
  const { t, language } = useThemeLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#161618] border-l border-slate-200 dark:border-white/[0.08] h-full flex flex-col shadow-2xl transition-all pb-safe">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">{t.history.title}</h3>
            <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-[#86868b] bg-slate-200 dark:bg-[#2c2c2e] px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-[11px] font-medium text-red-600 dark:text-red-400 hover:text-red-700 p-2 transition-colors flex items-center gap-1 cursor-pointer min-h-[36px]"
                title={t.history.clearAll}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.history.clearAll}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-[#86868b]">
              <Film className="w-9 h-9 text-slate-400 dark:text-[#48484a] mb-3" />
              <p className="text-[14px] font-semibold text-slate-900 dark:text-[#f5f5f7]">{t.history.emptyTitle}</p>
              <p className="text-[12px] text-slate-500 dark:text-[#86868b] mt-1">
                {t.history.emptyDesc}
              </p>
            </div>
          ) : (
            history.map((item) => {
              const platform = PLATFORMS[item.platform] || PLATFORMS.unknown;
              const dateStr = new Date(item.savedAt).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl p-3 flex gap-3 hover:border-slate-300 dark:hover:border-white/[0.14] transition-colors"
                >
                  <div className="w-16 h-20 bg-black rounded-xl overflow-hidden shrink-0 relative border border-slate-200 dark:border-white/[0.06]">
                    {item.cover ? (
                      <img
                        src={item.cover}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Film className="w-6 h-6" />
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[8px] font-mono text-white px-1 rounded">
                      {item.format.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-[#86868b] mb-1">
                        <span className="text-[#0071e3] dark:text-[#2997ff] font-semibold">{platform.name}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{item.resolution}</span>
                        <span>·</span>
                        <span>{dateStr}</span>
                      </div>
                      <h4 className="text-[12px] font-semibold text-slate-900 dark:text-white truncate leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-[#86868b] truncate mt-0.5 font-mono">
                        {item.authorUsername}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        {onPreview && (
                          <button
                            onClick={() => onPreview(item)}
                            className="text-[11px] text-slate-700 dark:text-slate-300 hover:text-[#0071e3] dark:hover:text-[#2997ff] font-semibold flex items-center gap-1 cursor-pointer bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-md transition-colors"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{language === 'en' ? 'Preview' : 'Tonton'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => onReDownload(item)}
                          className="text-[11px] text-[#0071e3] dark:text-[#2997ff] hover:text-[#0077ed] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.history.reDownload}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        title={t.history.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-white/[0.08] text-[11px] text-slate-500 dark:text-[#6e6e73] text-center">
          {t.history.footerNote}
        </div>
      </div>
    </div>
  );
};
