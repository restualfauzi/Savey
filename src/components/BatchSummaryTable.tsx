import React from 'react';
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RotateCcw,
  Sparkles,
  Layers,
  Smartphone,
  ExternalLink,
  Film,
  SlidersHorizontal
} from 'lucide-react';
import { BatchItem, QualityOption, PreferredQuality } from '../types';
import { PLATFORMS } from '../utils/platforms';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { PlatformIcon } from './SocialIcons';

interface BatchSummaryTableProps {
  items: BatchItem[];
  isProcessingBatch: boolean;
  isDownloadingAll: boolean;
  onDownloadItem: (item: BatchItem) => void;
  onDownloadAll: () => void;
  onRetryItem: (item: BatchItem) => void;
  onRemoveItem: (id: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
  onChangeFormat: (itemId: string, option: QualityOption) => void;
  onApplyQualityToAll?: (quality: PreferredQuality) => void;
  onPreviewItem: (item: BatchItem) => void;
}

export const BatchSummaryTable: React.FC<BatchSummaryTableProps> = ({
  items,
  isProcessingBatch,
  isDownloadingAll,
  onDownloadItem,
  onDownloadAll,
  onRetryItem,
  onRemoveItem,
  onClearCompleted,
  onClearAll,
  onChangeFormat,
  onApplyQualityToAll,
  onPreviewItem,
}) => {
  const { t, language, preferredQuality, setPreferredQuality, setIsSettingsOpen } = useThemeLanguage();

  if (items.length === 0) return null;

  const readyItems = items.filter((i) => i.status === 'ready' || i.status === 'completed');
  const completedCount = items.filter((i) => i.status === 'completed').length;
  const readyToDownloadCount = items.filter((i) => i.status === 'ready').length;

  return (
    <section id="batch-summary-section" className="py-10 max-w-5xl mx-auto px-4 sm:px-6 animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl transition-all">
        {/* Table Header Bar */}
        <div className="p-6 sm:p-7 border-b border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70 dark:bg-[#121214]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">
                    {t.batch.summaryTitle}
                  </h3>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-[#f5f5f7]">
                    {items.length} {language === 'en' ? 'videos' : 'video'}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-[#86868b] mt-0.5">
                  {t.batch.summarySubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Batch Quality Preset Switcher */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#1e1e20] border border-slate-200 dark:border-white/[0.08] rounded-full shadow-xs">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="text-[11px] font-medium text-slate-500 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                title={t.settings.title}
              >
                <SlidersHorizontal className="w-3 h-3 text-[#0071e3] dark:text-[#2997ff]" />
                <span className="hidden md:inline">{t.settings.presetLabel}:</span>
              </button>
              {(['1080p', '720p', 'mp3'] as PreferredQuality[]).map((q) => {
                const isActive = preferredQuality === q;
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setPreferredQuality(q);
                      if (onApplyQualityToAll) onApplyQualityToAll(q);
                    }}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0071e3] text-white shadow-xs'
                        : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={`Set default to ${q.toUpperCase()}`}
                  >
                    {q.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {completedCount > 0 && (
              <button
                onClick={onClearCompleted}
                className="px-3 py-1.5 text-[11px] font-medium text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] rounded-full transition-colors cursor-pointer"
              >
                {t.batch.clearCompleted}
              </button>
            )}
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 text-[11px] font-medium text-slate-600 dark:text-[#86868b] hover:text-red-500 dark:hover:text-red-400 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] rounded-full transition-colors cursor-pointer"
            >
              {t.batch.clearAll}
            </button>
            <button
              onClick={onDownloadAll}
              disabled={isDownloadingAll || readyToDownloadCount === 0}
              className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-semibold rounded-full transition-all flex items-center gap-2 shadow-md shadow-[#0071e3]/20 cursor-pointer"
            >
              {isDownloadingAll ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.batch.downloadingAll}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.batch.downloadAllBtn} ({readyToDownloadCount})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Global Progress Bar when downloading all */}
        {isDownloadingAll && (
          <div className="px-6 py-3 bg-blue-50/70 dark:bg-[#0071e3]/10 border-b border-blue-100 dark:border-[#0071e3]/20 flex items-center justify-between text-[12px]">
            <span className="text-[#0071e3] dark:text-[#2997ff] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{language === 'en' ? `Downloading ${completedCount} of ${items.length} videos...` : `Mengunduh ${completedCount} dari ${items.length} video...`}</span>
            </span>
            <span className="font-mono tabular-nums text-[#0071e3] dark:text-[#2997ff] font-bold">
              {Math.round((completedCount / items.length) * 100)}%
            </span>
          </div>
        )}

        {/* Table View (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06] text-[11px] font-semibold text-slate-500 dark:text-[#86868b] uppercase tracking-wider bg-slate-50/50 dark:bg-[#121214]/50">
                <th className="py-3 px-4 sm:px-6">{t.batch.colVideo}</th>
                <th className="py-3 px-4 hidden md:table-cell">{t.batch.colPlatform}</th>
                <th className="py-3 px-4">{t.batch.colFormat}</th>
                <th className="py-3 px-4 hidden sm:table-cell">{t.batch.colSize}</th>
                <th className="py-3 px-4">{t.batch.colStatus}</th>
                <th className="py-3 px-4 sm:px-6 text-right">{t.batch.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {items.map((item) => {
                const platformInfo = PLATFORMS[item.platform] || PLATFORMS.unknown;
                const currentOpt =
                  item.selectedOption || item.metadata?.qualityOptions[0];

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Video Column */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => item.metadata && onPreviewItem(item)}
                          className="w-12 h-14 bg-black rounded-xl overflow-hidden shrink-0 relative border border-slate-200 dark:border-white/10 cursor-pointer group"
                        >
                          {item.metadata?.cover ? (
                            <img
                              src={item.metadata.cover}
                              alt={item.metadata.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Film className="w-5 h-5" />
                            </div>
                          )}
                          <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] font-mono text-white px-1 rounded">
                            {currentOpt?.format.toUpperCase() || 'MP4'}
                          </span>
                        </div>

                        <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                          <h4
                            onClick={() => item.metadata && onPreviewItem(item)}
                            className="font-semibold text-slate-900 dark:text-white truncate cursor-pointer hover:text-[#0071e3] dark:hover:text-[#2997ff] transition-colors leading-tight"
                            title={item.metadata?.title || item.originalUrl}
                          >
                            {item.metadata?.title || item.originalUrl}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-[#86868b] truncate mt-0.5 font-mono">
                            {item.metadata?.author.username || item.originalUrl}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Platform */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <PlatformIcon platform={item.platform} size={14} colored className="shrink-0" />
                        <span>{platformInfo.name}</span>
                      </span>
                    </td>

                    {/* Format / Resolution Dropdown */}
                    <td className="py-3.5 px-4">
                      {item.metadata ? (
                        <select
                          value={currentOpt?.id || ''}
                          onChange={(e) => {
                            const opt = item.metadata?.qualityOptions.find(
                              (o) => o.id === e.target.value
                            );
                            if (opt) onChangeFormat(item.id, opt);
                          }}
                          className="bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] text-[11px] text-slate-800 dark:text-[#f5f5f7] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0071e3] cursor-pointer"
                        >
                          {item.metadata.qualityOptions.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.resolution} ({o.format.toUpperCase()})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">
                          1080p MP4
                        </span>
                      )}
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 hidden sm:table-cell font-mono text-[12px] text-slate-600 dark:text-[#86868b]">
                      {currentOpt?.sizeEstimate || '~18 MB'}
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4">
                      {item.status === 'analyzing' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#0071e3] dark:text-[#2997ff] font-medium">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{t.batch.statusAnalyzing}</span>
                        </span>
                      )}

                      {item.status === 'queued' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#86868b] font-medium">
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                          <span>{t.batch.statusQueued}</span>
                        </span>
                      )}

                      {item.status === 'ready' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#0071e3] dark:text-[#2997ff] font-semibold bg-blue-50 dark:bg-[#0071e3]/10 px-2 py-0.5 rounded-full">
                          <span>{t.batch.statusReady}</span>
                        </span>
                      )}

                      {item.status === 'downloading' && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-[#0071e3] dark:text-[#2997ff] font-bold">
                            <span>{t.batch.statusDownloading}</span>
                            <span className="font-mono">{item.progress}%</span>
                          </div>
                          <div className="w-24 h-1.5 bg-slate-200 dark:bg-[#2c2c2e] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0071e3] transition-all"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {item.status === 'completed' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.batch.statusCompleted}</span>
                        </span>
                      )}

                      {item.status === 'failed' && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[100px]" title={item.error}>
                            {t.batch.statusFailed}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'failed' ? (
                          <button
                            onClick={() => onRetryItem(item)}
                            className="p-1.5 text-[#0071e3] dark:text-[#2997ff] hover:bg-blue-50 dark:hover:bg-[#0071e3]/10 rounded-lg transition-colors cursor-pointer"
                            title={t.batch.retry}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onDownloadItem(item)}
                            disabled={item.status === 'analyzing' || item.status === 'downloading'}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-800 dark:text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                            title="Save to Gallery"
                          >
                            <Download className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                            <span className="hidden sm:inline">
                              {item.status === 'completed' ? (language === 'en' ? 'Re-Save' : 'Simpan Ulang') : (language === 'en' ? 'Save' : 'Simpan')}
                            </span>
                          </button>
                        )}

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Dedicated Mobile Card View (< md) */}
        <div className="block md:hidden p-3.5 space-y-3 bg-slate-50/40 dark:bg-[#121214]/40">
          {items.map((item) => {
            const platformInfo = PLATFORMS[item.platform] || PLATFORMS.unknown;
            const currentOpt = item.selectedOption || item.metadata?.qualityOptions[0];

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-3.5 shadow-sm space-y-3"
              >
                {/* Header row: thumbnail + title + platform */}
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => item.metadata && onPreviewItem(item)}
                    className="w-14 h-16 bg-black rounded-xl overflow-hidden shrink-0 relative border border-slate-200 dark:border-white/10 cursor-pointer"
                  >
                    {item.metadata?.cover ? (
                      <img
                        src={item.metadata.cover}
                        alt={item.metadata.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Film className="w-6 h-6" />
                      </div>
                    )}
                    <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] font-mono text-white px-1 rounded">
                      {currentOpt?.format.toUpperCase() || 'MP4'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <PlatformIcon platform={item.platform} size={13} colored className="shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {platformInfo.name}
                      </span>
                    </div>
                    <h4
                      onClick={() => item.metadata && onPreviewItem(item)}
                      className="font-semibold text-[13px] text-slate-900 dark:text-white line-clamp-2 leading-snug cursor-pointer"
                    >
                      {item.metadata?.title || item.originalUrl}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-[#86868b] truncate mt-0.5 font-mono">
                      {item.metadata?.author.username || item.originalUrl}
                    </p>
                  </div>
                </div>

                {/* Format selector & size row */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-white/[0.04]">
                  {item.metadata ? (
                    <select
                      value={currentOpt?.id || ''}
                      onChange={(e) => {
                        const opt = item.metadata?.qualityOptions.find((o) => o.id === e.target.value);
                        if (opt) onChangeFormat(item.id, opt);
                      }}
                      className="flex-1 bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] text-[12px] text-slate-800 dark:text-[#f5f5f7] rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#0071e3] cursor-pointer"
                    >
                      {item.metadata.qualityOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.resolution} ({o.format.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">1080p MP4</span>
                  )}

                  <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-[#86868b] shrink-0">
                    {currentOpt?.sizeEstimate || '~18 MB'}
                  </span>
                </div>

                {/* Progress bar if downloading */}
                {item.status === 'downloading' && (
                  <div className="space-y-1 py-1">
                    <div className="flex items-center justify-between text-[11px] text-[#0071e3] dark:text-[#2997ff] font-bold">
                      <span>{t.batch.statusDownloading}</span>
                      <span className="font-mono">{item.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-[#2c2c2e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0071e3] transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Status indicator and action buttons */}
                <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                  <div>
                    {item.status === 'analyzing' && (
                      <span className="inline-flex items-center gap-1.5 text-[#0071e3] dark:text-[#2997ff] font-medium">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.batch.statusAnalyzing}</span>
                      </span>
                    )}

                    {item.status === 'queued' && (
                      <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-[#86868b] font-medium">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span>{t.batch.statusQueued}</span>
                      </span>
                    )}

                    {item.status === 'ready' && (
                      <span className="inline-flex items-center gap-1.5 text-[#0071e3] dark:text-[#2997ff] font-semibold bg-blue-50 dark:bg-[#0071e3]/10 px-2 py-0.5 rounded-full">
                        <span>{t.batch.statusReady}</span>
                      </span>
                    )}

                    {item.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.batch.statusCompleted}</span>
                      </span>
                    )}

                    {item.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[150px]">{item.error || t.batch.statusFailed}</span>
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {item.status === 'ready' && (
                      <button
                        onClick={() => onDownloadItem(item)}
                        className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-[12px] font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer min-h-[38px]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Download' : 'Unduh'}</span>
                      </button>
                    )}

                    {item.status === 'completed' && (
                      <button
                        onClick={() => onDownloadItem(item)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-700 dark:text-white text-[11px] font-medium rounded-xl flex items-center gap-1 cursor-pointer min-h-[36px]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Re-save' : 'Unduh Ulang'}</span>
                      </button>
                    )}

                    {item.status === 'failed' && (
                      <button
                        onClick={() => onRetryItem(item)}
                        className="px-3 py-1.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[11px] font-medium rounded-xl flex items-center gap-1 cursor-pointer min-h-[36px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t.batch.retry}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-xl cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-slate-50 dark:bg-[#121214] border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-[#86868b]">
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
            <span>{t.batch.saveToGalleryAll}</span>
          </div>
          <div>
            <span>
              {readyToDownloadCount} {t.batch.queueStats}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
