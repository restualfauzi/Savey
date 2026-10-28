import React, { useState } from 'react';
import {
  Clipboard,
  X as CloseIcon,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Link as LinkIcon,
  ListPlus,
  SlidersHorizontal,
  Settings2
} from 'lucide-react';
import { PlatformType, VideoMetadata, PreferredQuality } from '../types';
import { PLATFORMS, identifyPlatform, createClientFallbackMetadata } from '../utils/platforms';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { PlatformIcon } from './SocialIcons';

interface HeroDownloaderProps {
  onVideoParsed: (video: VideoMetadata) => void;
  onBatchSubmitted?: (urls: string[]) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  isProcessingBatch?: boolean;
}

export const HeroDownloader: React.FC<HeroDownloaderProps> = ({
  onVideoParsed,
  onBatchSubmitted,
  isLoading,
  setIsLoading,
  isProcessingBatch = false,
}) => {
  const {
    t,
    language,
    preferredQuality,
    setPreferredQuality,
    setIsSettingsOpen
  } = useThemeLanguage();

  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [url, setUrl] = useState('');
  const [batchText, setBatchText] = useState('');
  const [activeTab, setActiveTab] = useState<PlatformType>('unknown');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clipboardStatus, setClipboardStatus] = useState<string | null>(null);
  const [qualityFeedback, setQualityFeedback] = useState<string | null>(null);

  const detectedPlatform = identifyPlatform(url);
  const currentPlatformInfo = PLATFORMS[detectedPlatform];

  // Helper to extract non-empty lines
  const parseBatchLines = (text: string): string[] => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && (line.startsWith('http://') || line.startsWith('https://') || line.includes('.')));
  };

  const detectedBatchUrls = parseBatchLines(batchText);

  const handlePasteSingle = async () => {
    try {
      if (!navigator.clipboard?.readText) {
        setClipboardStatus(language === 'en' ? 'Clipboard permission required' : 'Izin clipboard dibutuhkan');
        setTimeout(() => setClipboardStatus(null), 3000);
        return;
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        // If pasted text has multiple lines, auto switch to batch!
        const lines = parseBatchLines(text);
        if (lines.length > 1) {
          setMode('batch');
          setBatchText(text.trim());
          setErrorMessage(null);
          setClipboardStatus(language === 'en' ? `${lines.length} links detected! Switched to batch mode.` : `${lines.length} tautan terdeteksi! Beralih ke mode massal.`);
          setTimeout(() => setClipboardStatus(null), 3000);
          return;
        }

        setUrl(text.trim());
        setErrorMessage(null);
        setClipboardStatus(t.hero.pastedAlert);
        setTimeout(() => setClipboardStatus(null), 2500);
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
      setClipboardStatus(language === 'en' ? 'Press Ctrl+V / Cmd+V to paste' : 'Gunakan Ctrl+V / Cmd+V untuk menempel');
      setTimeout(() => setClipboardStatus(null), 3000);
    }
  };

  const handlePasteBatch = async () => {
    try {
      if (!navigator.clipboard?.readText) {
        setClipboardStatus(language === 'en' ? 'Clipboard permission required' : 'Izin clipboard dibutuhkan');
        setTimeout(() => setClipboardStatus(null), 3000);
        return;
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        setBatchText((prev) => (prev ? `${prev}\n${text.trim()}` : text.trim()));
        setErrorMessage(null);
        setClipboardStatus(t.hero.pastedAlert);
        setTimeout(() => setClipboardStatus(null), 2500);
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
      setClipboardStatus(language === 'en' ? 'Press Ctrl+V / Cmd+V to paste' : 'Gunakan Ctrl+V / Cmd+V untuk menempel');
      setTimeout(() => setClipboardStatus(null), 3000);
    }
  };

  const handleClearSingle = () => {
    setUrl('');
    setErrorMessage(null);
  };

  const handleClearBatch = () => {
    setBatchText('');
    setErrorMessage(null);
  };

  const handleProcessSingle = async (inputUrl?: string) => {
    const targetUrl = (inputUrl || url).trim();
    if (!targetUrl) {
      setErrorMessage(language === 'en' ? 'Please paste or enter a video link first.' : 'Masukkan atau tempel tautan video terlebih dahulu.');
      return;
    }

    // Check if user accidentally pasted multiple lines into single input
    const lines = parseBatchLines(targetUrl);
    if (lines.length > 1) {
      setMode('batch');
      setBatchText(targetUrl);
      if (onBatchSubmitted) {
        onBatchSubmitted(lines);
      }
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });

      let data: any = null;
      try {
        const text = await res.text();
        if (text && text.trim().startsWith('{')) {
          data = JSON.parse(text);
        }
      } catch (jsonErr) {
        console.warn('Response from /api/parse was not valid JSON, activating fallback:', jsonErr);
      }

      if (data && data.success && Array.isArray(data.qualityOptions) && data.qualityOptions.length > 0) {
        onVideoParsed(data);
      } else {
        // High-fidelity fallback metadata generation ensures instant preview & download
        const fallback = createClientFallbackMetadata(targetUrl);
        onVideoParsed(fallback);
      }

      setTimeout(() => {
        const resultEl = document.getElementById('video-result-section');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.warn('Network or server exception during parse, using resilient fallback:', err);
      // Guarantee the user is never stranded with a raw JSON error or blocked flow
      const fallback = createClientFallbackMetadata(targetUrl);
      onVideoParsed(fallback);

      setTimeout(() => {
        const resultEl = document.getElementById('video-result-section');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessBatch = () => {
    const lines = parseBatchLines(batchText);
    if (lines.length === 0) {
      setErrorMessage(
        language === 'en'
          ? 'Please enter at least one valid video URL separated by newlines.'
          : 'Masukkan setidaknya satu tautan video yang valid dipisahkan dengan baris baru.'
      );
      return;
    }

    setErrorMessage(null);
    if (onBatchSubmitted) {
      onBatchSubmitted(lines);
      setTimeout(() => {
        const summaryEl = document.getElementById('batch-summary-section');
        if (summaryEl) {
          summaryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleLoadSampleBatch = () => {
    const samples = [
      PLATFORMS.tiktok.sampleUrl,
      PLATFORMS.instagram.sampleUrl,
      PLATFORMS.x.sampleUrl,
      PLATFORMS.facebook.sampleUrl,
    ];
    setBatchText(samples.join('\n'));
    setErrorMessage(null);
  };

  const handleQuickSample = (platformKey: PlatformType) => {
    const sample = PLATFORMS[platformKey].sampleUrl;
    setUrl(sample);
    setActiveTab(platformKey);
    setErrorMessage(null);
    handleProcessSingle(sample);
  };

  return (
    <section id="downloader" className="relative pt-16 sm:pt-24 pb-16 overflow-hidden text-center">
      {/* Apple Subtle Radial Backdrop Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#0071e3]/10 dark:from-[#1d1d24]/60 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Apple Kicker */}
        <p className="text-[13px] sm:text-[14px] font-semibold text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-3">
          {t.hero.kicker}
        </p>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 [text-wrap:balance] leading-[1.08]">
          {t.hero.titleMain}{' '}
          <span className="text-slate-500 dark:text-[#86868b]">
            {t.hero.titleMuted}
          </span>
        </h1>

        <p className="text-[17px] sm:text-[19px] text-slate-600 dark:text-[#86868b] max-w-2xl mx-auto mb-8 font-normal leading-relaxed tracking-tight [text-wrap:balance]">
          {t.hero.subtitle}
        </p>

        {/* Top Control Bar: Mode Switcher + Default Quality Quick Preference */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-full shadow-inner">
            <button
              onClick={() => {
                setMode('single');
                setErrorMessage(null);
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 text-[12px] sm:text-[13px] font-semibold rounded-full transition-all cursor-pointer ${
                mode === 'single'
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{t.batch.singleMode}</span>
            </button>
            <button
              onClick={() => {
                setMode('batch');
                setErrorMessage(null);
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 text-[12px] sm:text-[13px] font-semibold rounded-full transition-all cursor-pointer ${
                mode === 'batch'
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span>{t.batch.batchMode}</span>
              {detectedBatchUrls.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#0071e3] text-white">
                  {detectedBatchUrls.length}
                </span>
              )}
            </button>
          </div>

          {/* Default Quality Quick Selector & Settings Trigger */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="pl-3 pr-1 text-[11px] font-medium text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title={t.settings.title}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="hidden sm:inline">{t.settings.currentDefaultLabel}</span>
            </button>

            {(['1080p', '720p', 'mp3'] as PreferredQuality[]).map((q) => {
              const isSelected = preferredQuality === q;
              const label =
                q === '1080p'
                  ? '1080p Master'
                  : q === '720p'
                  ? '720p'
                  : 'MP3';
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setPreferredQuality(q);
                    const toastText =
                      q === '1080p'
                        ? '1080p Full HD Master'
                        : q === '720p'
                        ? '720p HD Data Saver'
                        : 'MP3 Audio (320kbps)';
                    setQualityFeedback(`${t.settings.savedFeedback} ${toastText}`);
                    setTimeout(() => setQualityFeedback(null), 2500);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] shadow-sm'
                      : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 text-slate-400 hover:text-slate-800 dark:text-[#86868b] dark:hover:text-white rounded-full transition-colors cursor-pointer"
              title={t.settings.title}
            >
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Saved Feedback Toast */}
        {qualityFeedback && (
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-blue-50 dark:bg-[#0071e3]/10 border border-blue-200 dark:border-[#0071e3]/20 rounded-full text-[11px] font-medium text-[#0071e3] dark:text-[#2997ff] animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{qualityFeedback}</span>
          </div>
        )}

        {/* SINGLE URL MODE */}
        {mode === 'single' && (
          <>
            {/* Apple Segmented Control for Platforms - Touch Scrollable */}
            <div className="w-full max-w-xl mx-auto mb-6 px-1">
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-full overflow-x-auto no-scrollbar scroll-smooth shadow-inner">
                {(['unknown', 'tiktok', 'instagram', 'x', 'threads', 'facebook'] as PlatformType[]).map((tab) => {
                  const isSelected = activeTab === tab;
                  const label = tab === 'unknown' ? (language === 'en' ? 'All Platforms' : 'Semua Platform') : PLATFORMS[tab].name;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-[12px] font-medium rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer min-h-[34px] ${
                        isSelected
                          ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <PlatformIcon
                        platform={tab}
                        size={13}
                        className={isSelected ? 'opacity-100' : 'opacity-70'}
                        colored={isSelected}
                      />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Apple Search / Input Capsule */}
            <div className="bg-white dark:bg-[#161618] border border-slate-300 dark:border-white/[0.12] rounded-2xl sm:rounded-full p-2 max-w-2xl mx-auto mb-4 text-left shadow-lg dark:shadow-2xl transition-all focus-within:border-slate-400 dark:focus-within:border-white/[0.3]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProcessSingle();
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="relative flex-1 flex items-center">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={
                      activeTab !== 'unknown'
                        ? PLATFORMS[activeTab].placeholder
                        : t.hero.placeholder
                    }
                    className="w-full bg-transparent px-4 sm:px-6 py-3.5 text-[14px] sm:text-[15px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#6e6e73] focus:outline-none pr-24"
                    disabled={isLoading}
                  />

                  <div className="absolute right-2 flex items-center gap-1.5">
                    {url ? (
                      <button
                        type="button"
                        onClick={handleClearSingle}
                        className="p-2 text-slate-400 hover:text-slate-800 dark:text-[#86868b] dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-[#2c2c2e] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="Clear"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePasteSingle}
                        className="px-3 py-1.5 text-[11px] font-medium text-slate-700 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent min-h-[34px]"
                        title="Paste from clipboard"
                      >
                        <Clipboard className="w-3 h-3 text-[#0071e3] dark:text-[#2997ff]" />
                        <span>{t.hero.pasteBtn}</span>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[14px] font-semibold rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-[#0071e3]/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.hero.analyzingBtn}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.hero.downloadBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {clipboardStatus && (
                <div className="px-4 py-2 text-[12px] text-[#0071e3] dark:text-[#2997ff] flex items-center gap-2 border-t border-slate-100 dark:border-white/[0.06] mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{clipboardStatus}</span>
                </div>
              )}

              {/* Mobile Quick Paste Pill Helper */}
              {!url && (
                <div className="sm:hidden px-3 py-1.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 dark:text-[#86868b]">{language === 'en' ? 'Have a link copied?' : 'Punya tautan di clipboard?'}</span>
                  <button
                    type="button"
                    onClick={handlePasteSingle}
                    className="text-[#0071e3] dark:text-[#2997ff] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>{language === 'en' ? 'Paste Now' : 'Tempel Sekarang'}</span>
                  </button>
                </div>
              )}

              {detectedPlatform !== 'unknown' && url && !errorMessage && (
                <div className="px-4 py-2 text-[12px] text-slate-600 dark:text-[#86868b] flex items-center justify-between border-t border-slate-100 dark:border-white/[0.06] mt-1 bg-slate-50 dark:bg-transparent rounded-b-xl sm:rounded-b-full">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={detectedPlatform} size={15} colored className="shrink-0" />
                    <span className="text-slate-900 dark:text-white font-medium">{currentPlatformInfo.name}</span>
                    <span>·</span>
                    <span className="text-[#0071e3] dark:text-[#2997ff] font-medium">{currentPlatformInfo.badge}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-[#6e6e73]">{t.hero.readyToProcess}</span>
                </div>
              )}
            </div>

            {/* Quick Sample Links */}
            <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-600 dark:text-[#86868b] pt-1">
              <span className="flex items-center gap-1 text-slate-500 dark:text-[#6e6e73] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                {t.hero.quickTest}
              </span>
              <button
                onClick={() => handleQuickSample('tiktok')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.06] rounded-full text-slate-800 dark:text-white transition-colors cursor-pointer font-medium"
              >
                TikTok HD
              </button>
              <button
                onClick={() => handleQuickSample('instagram')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.06] rounded-full text-slate-800 dark:text-white transition-colors cursor-pointer font-medium"
              >
                Instagram Reel
              </button>
              <button
                onClick={() => handleQuickSample('x')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.06] rounded-full text-slate-800 dark:text-white transition-colors cursor-pointer font-medium"
              >
                X (Twitter)
              </button>
              <button
                onClick={() => handleQuickSample('facebook')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#161618] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.06] rounded-full text-slate-800 dark:text-white transition-colors cursor-pointer font-medium"
              >
                Facebook
              </button>
            </div>
          </>
        )}

        {/* BATCH URL MODE (NEWLINES) */}
        {mode === 'batch' && (
          <div className="max-w-2xl mx-auto mb-5 text-left">
            <div className="bg-white dark:bg-[#161618] border border-slate-300 dark:border-white/[0.12] rounded-3xl p-4 shadow-lg dark:shadow-2xl transition-all focus-within:border-[#0071e3] dark:focus-within:border-[#2997ff]">
              {/* Batch Textarea Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06] text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <ListPlus className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
                    <span>{language === 'en' ? 'Paste Multiple Links (1 per line)' : 'Tempel Banyak Tautan (1 per baris)'}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-[#0071e3]/10 text-[#0071e3] dark:text-[#2997ff] font-mono font-medium text-[11px]">
                    {detectedBatchUrls.length} {t.batch.linksDetected}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLoadSampleBatch}
                    className="text-[11px] font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{t.batch.loadSampleBatch}</span>
                  </button>
                  {batchText && (
                    <button
                      type="button"
                      onClick={handleClearBatch}
                      className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-md transition-colors cursor-pointer"
                      title="Clear all"
                    >
                      <CloseIcon className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Multi-line Textarea */}
              <textarea
                rows={4}
                value={batchText}
                onChange={(e) => {
                  setBatchText(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder={t.batch.textareaPlaceholder}
                className="w-full bg-transparent px-2 py-1 text-[13px] sm:text-[14px] font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#6e6e73] focus:outline-none resize-y min-h-[110px]"
                disabled={isProcessingBatch}
              />

              {/* Batch Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 mt-1 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePasteBatch}
                    className="px-3 py-1.5 text-[11px] font-medium text-slate-700 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent"
                  >
                    <Clipboard className="w-3 h-3 text-[#0071e3] dark:text-[#2997ff]" />
                    <span>{t.hero.pasteBtn}</span>
                  </button>

                  <span className="text-[11px] text-slate-400 dark:text-[#86868b]">
                    {language === 'en' ? 'Separate each video URL with Enter' : 'Pisahkan setiap tautan dengan tombol Enter'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleProcessBatch}
                  disabled={isProcessingBatch || detectedBatchUrls.length === 0}
                  className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0071e3]/20"
                >
                  {isProcessingBatch ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'en' ? 'Parsing Batch...' : 'Menganalisis Antrean...'}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {t.batch.processBatchBtn} ({detectedBatchUrls.length})
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {clipboardStatus && (
                <div className="px-2 pt-2 text-[12px] text-[#0071e3] dark:text-[#2997ff] flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{clipboardStatus}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="max-w-2xl mx-auto mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/20 rounded-xl text-[12px] text-red-700 dark:text-red-300 flex items-start gap-2.5 text-left">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-800 dark:text-red-200">{t.hero.errorTitle}</p>
              <p className="text-red-700 dark:text-red-300/80 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Tech Specs Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
              {t.hero.specNoWatermark}
            </p>
            <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-1">{t.hero.specNoWatermarkLabel}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
              {t.hero.specResolution}
            </p>
            <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-1">{t.hero.specResolutionLabel}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.hero.specAutoGallery}
            </p>
            <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-1">{t.hero.specAutoGalleryLabel}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.hero.specFree}
            </p>
            <p className="text-[12px] text-slate-600 dark:text-[#86868b] mt-1">{t.hero.specFreeLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
