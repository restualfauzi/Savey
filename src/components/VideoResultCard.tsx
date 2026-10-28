import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Smartphone,
  Eye,
  Heart,
  MessageCircle,
  Repeat,
  Info,
  Maximize2,
  QrCode,
  Music2
} from 'lucide-react';
import { VideoMetadata, QualityOption } from '../types';
import { PLATFORMS } from '../utils/platforms';
import { downloadAndSaveToGallery } from '../utils/downloader';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { QrCodeModal } from './QrCodeModal';
import { AudioExtractModal } from './AudioExtractModal';
import { PlatformIcon } from './SocialIcons';

interface VideoResultCardProps {
  video: VideoMetadata;
  onSaveToHistory: (video: VideoMetadata, selectedOption: QualityOption) => void;
  onOpenGalleryGuide: () => void;
  onOpenPreview?: (video: VideoMetadata, selectedOption?: QualityOption) => void;
}

export const VideoResultCard: React.FC<VideoResultCardProps> = ({
  video,
  onSaveToHistory,
  onOpenGalleryGuide,
  onOpenPreview,
}) => {
  const { t, language, matchPreferredQuality } = useThemeLanguage();
  const [selectedQualityId, setSelectedQualityId] = useState<string>(() => {
    const matched = matchPreferredQuality(video.qualityOptions);
    return matched?.id || video.qualityOptions[0]?.id || 'hd';
  });

  // Keep selected option in sync with user preferred quality or when a new video is loaded
  useEffect(() => {
    const matched = matchPreferredQuality(video.qualityOptions);
    if (matched) {
      setSelectedQualityId(matched.id);
    }
  }, [video.id, matchPreferredQuality]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadProgressText, setDownloadProgressText] = useState<string>('');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [isSuccessPulsing, setIsSuccessPulsing] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const platformInfo = PLATFORMS[video.platform] || PLATFORMS.unknown;
  const currentOption =
    video.qualityOptions.find((q) => q.id === selectedQualityId) || video.qualityOptions[0];
  const audioOption = video.qualityOptions.find((q) => q.format === 'mp3') || currentOption;

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTriggerFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleDownload = async (optionToDownload?: QualityOption) => {
    const opt = optionToDownload || currentOption;
    if (!opt) return;

    setDownloadProgress(0);
    setDownloadProgressText(language === 'en' ? 'Connecting to media stream...' : 'Menghubungkan ke stream...');
    setDownloadSuccessMessage(null);
    setIsSuccessPulsing(false);
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }

    const safeTitle = (video.title || 'Video')
      .replace(/[^a-zA-Z0-9_\u00C0-\u017F\s-]/g, '')
      .trim()
      .slice(0, 35)
      .replace(/\s+/g, '_');
    const ext = opt.format === 'mp3' ? 'mp3' : opt.format === 'jpg' ? 'jpg' : 'mp4';
    const filename = `Savey_${video.platform.toUpperCase()}_${safeTitle || 'Master'}.${ext}`;

    const result = await downloadAndSaveToGallery(
      opt.url,
      filename,
      opt.format === 'mp3' ? 'audio/mpeg' : opt.format === 'jpg' ? 'image/jpeg' : 'video/mp4',
      (pct, loaded, total) => {
        setDownloadProgress(pct);
        const loadedMb = (loaded / (1024 * 1024)).toFixed(1);
        const totalMb = total > 0 ? (total / (1024 * 1024)).toFixed(1) : opt.sizeEstimate || '';
        setDownloadProgressText(
          totalMb ? `${pct}% (${loadedMb}MB / ${totalMb}MB)` : `${pct}% (${loadedMb}MB)`
        );
      }
    );

    onSaveToHistory(video, opt);

    setTimeout(() => {
      setDownloadProgress(null);
      setDownloadProgressText('');
      setDownloadSuccessMessage(result.message);
      setIsSuccessPulsing(true);
      successTimerRef.current = setTimeout(() => {
        setIsSuccessPulsing(false);
      }, 3000);
    }, 600);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentOption?.url || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const [showMobilePreview, setShowMobilePreview] = useState(true);

  return (
    <section id="video-result-section" className="py-8 sm:py-12 max-w-5xl mx-auto px-3 sm:px-6">
      {/* Studio Card */}
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl transition-all">
        {/* Top Spec Bar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-[#121214] border-b border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5 text-[12px]">
          <div className="flex items-center gap-2 text-slate-600 dark:text-[#86868b] min-h-[32px]">
            <PlatformIcon platform={video.platform} size={15} colored className="shrink-0" />
            <span className="text-slate-900 dark:text-[#f5f5f7] font-semibold">{platformInfo.name}</span>
            <span>·</span>
            <span className="text-[#0071e3] dark:text-[#2997ff] font-medium">{t.result.readyBadge}</span>
            <span>·</span>
            <span className="text-slate-500 dark:text-slate-400">{t.result.noWatermarkBadge}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="text-slate-600 hover:text-slate-900 dark:text-[#86868b] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium p-1.5"
              title="Scan QR to download on mobile phone"
            >
              <QrCode className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="hidden sm:inline">{t.result.viewQrBtn}</span>
            </button>
            <span className="text-slate-300 dark:text-[#2c2c2e]">|</span>
            <button
              onClick={onOpenGalleryGuide}
              className="text-slate-600 hover:text-slate-900 dark:text-[#86868b] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium p-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.result.galleryGuideBtn}</span>
            </button>
            <span className="text-slate-300 dark:text-[#2c2c2e]">|</span>
            <button
              onClick={handleCopyLink}
              className="text-slate-600 hover:text-slate-900 dark:text-[#86868b] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium p-1.5"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? t.result.copied : t.result.shareBtn}</span>
            </button>
          </div>
        </div>

        {/* Content Section: iPhone Frame on Left, Clean Apple Spec sheet on Right */}
        <div className="p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Column: iPhone Hardware Bezel Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] aspect-[9/19.5] bg-black rounded-[40px] sm:rounded-[44px] p-2.5 sm:p-3 shadow-2xl border-[3px] sm:border-[4px] border-slate-800 dark:border-[#3a3a3c] ring-1 ring-black/10 dark:ring-white/10 group transition-all">
              {/* Dynamic Island Pill */}
              <div className="absolute top-3.5 sm:top-4 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4.5 sm:h-5 bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#161618] border border-white/10" />
              </div>

              {/* Video Screen Container */}
              <div className="relative w-full h-full bg-black rounded-[32px] sm:rounded-[36px] overflow-hidden flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={currentOption?.url || video.qualityOptions.find((q) => q.format === 'mp4')?.url || ''}
                  poster={video.cover}
                  playsInline
                  loop
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handleTogglePlay}
                />

                {/* Big Centered Play Button when paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl z-20 cursor-pointer pointer-events-auto"
                    aria-label="Play video"
                  >
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </button>
                )}

                {/* Glass Reflection Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none flex flex-col justify-between p-3 sm:p-4 pt-7 sm:pt-8">
                  {/* Top info */}
                  <div className="flex items-center justify-between text-[11px] text-white">
                    <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full font-mono">
                      {currentOption?.resolution || '1080p'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-medium">
                      Master
                    </span>
                  </div>

                  {/* Playback Controls */}
                  <div className="pointer-events-auto flex items-center justify-between text-white">
                    <button
                      onClick={handleTogglePlay}
                      className="p-2 sm:p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    </button>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={handleToggleMute}
                        className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#2997ff]" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={handleTriggerFullscreen}
                        className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Preview Button */}
            <button
              type="button"
              onClick={() => onOpenPreview ? onOpenPreview(video, currentOption) : handleTogglePlay()}
              className="mt-3 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-700 dark:text-slate-300 rounded-full text-[12px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span>{language === 'en' ? 'Live Preview Modal' : 'Buka Preview Penuh'}</span>
            </button>

            <p className="text-[11px] sm:text-[12px] text-slate-500 dark:text-[#86868b] mt-2">
              {t.result.previewHint}
            </p>
          </div>

          {/* Right Column: Metadata & Format Selector */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              {/* Creator Card */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {video.author.avatar ? (
                    <img
                      src={video.author.avatar}
                      alt={video.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-[#2c2c2e] border border-slate-300 dark:border-white/10 flex items-center justify-center text-xs font-semibold text-slate-800 dark:text-white">
                      {video.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-[14px] font-semibold text-slate-900 dark:text-white leading-tight">
                      {video.author.name}
                    </h3>
                    <p className="text-[12px] text-slate-500 dark:text-[#86868b] font-mono mt-0.5">
                      {video.author.username}
                    </p>
                  </div>
                </div>

                {/* Quick Extract Audio Studio Action */}
                <button
                  onClick={() => setIsAudioModalOpen(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#121214] dark:hover:bg-[#2c2c2e] border border-slate-200 dark:border-white/[0.08] text-[#0071e3] dark:text-[#2997ff] text-[11px] font-medium rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Music2 className="w-3.5 h-3.5" />
                  <span>{t.result.extractAudioBtn}</span>
                </button>
              </div>

              {/* Title / Caption */}
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-slate-900 dark:text-white tracking-tight mb-4 leading-snug line-clamp-3">
                {video.title}
              </h2>

              {/* Clean Stats Strip */}
              {video.stats && (
                <div className="flex flex-wrap items-center gap-5 text-[12px] text-slate-600 dark:text-[#86868b] mb-6 py-2.5 px-4 bg-slate-50 dark:bg-[#121214] rounded-2xl border border-slate-200 dark:border-white/[0.06]">
                  {video.stats.views && (
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400 dark:text-[#6e6e73]" />
                      <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">{video.stats.views}</span>
                      <span>{t.result.views}</span>
                    </div>
                  )}
                  {video.stats.likes && (
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                      <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">{video.stats.likes}</span>
                      <span>{t.result.likes}</span>
                    </div>
                  )}
                  {video.stats.comments && (
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-400 dark:text-[#6e6e73]" />
                      <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">{video.stats.comments}</span>
                      <span>{t.result.comments}</span>
                    </div>
                  )}
                  {video.stats.shares && (
                    <div className="flex items-center gap-1.5">
                      <Repeat className="w-3.5 h-3.5 text-slate-400 dark:text-[#6e6e73]" />
                      <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">{video.stats.shares}</span>
                      <span>{t.result.shares}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quality & Format Selector */}
              <div className="mb-6">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-[#86868b] uppercase tracking-wider mb-2.5">
                  {t.result.formatSectionTitle}
                </p>
                <div className="space-y-2">
                  {video.qualityOptions.map((opt) => {
                    const isSelected = selectedQualityId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedQualityId(opt.id)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-[#1d1d24] border-[#0071e3] text-slate-900 dark:text-white ring-1 ring-[#0071e3]/30 shadow-sm'
                            : 'bg-slate-50 dark:bg-[#121214] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.14] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#0071e3] bg-[#0071e3]' : 'border-slate-300 dark:border-[#48484a]'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] sm:text-[14px] font-semibold text-slate-900 dark:text-white">
                                {opt.label}
                              </span>
                              {opt.isRecommended && (
                                <span className="text-[10px] bg-[#0071e3]/10 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] px-2 py-0.5 rounded-full font-semibold">
                                  {t.result.formatRecommend}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-[#86868b] flex items-center gap-2 mt-0.5">
                              <span>Format: {opt.format.toUpperCase()}</span>
                              <span>·</span>
                              <span className="font-mono tabular-nums">{opt.resolution}</span>
                              {opt.sizeEstimate && (
                                <>
                                  <span>·</span>
                                  <span className="font-mono tabular-nums">{opt.sizeEstimate}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(opt);
                          }}
                          className="text-[12px] font-semibold text-[#0071e3] dark:text-[#2997ff] hover:text-[#0077ed] px-2.5 py-1 rounded-full hover:bg-[#0071e3]/10 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{language === 'en' ? 'Download' : 'Unduh'}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Primary Action Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-3">
              {downloadProgress !== null && (
                <div className="p-3.5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-800 dark:text-white font-medium">
                      {downloadProgressText}
                    </span>
                    <span className="font-mono tabular-nums text-[#0071e3] dark:text-[#2997ff] font-bold">
                      {downloadProgress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-[#2c2c2e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0071e3] transition-all duration-200"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {downloadSuccessMessage && (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl text-[12px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-900 dark:text-emerald-200">{t.result.downloadSuccessTitle}</p>
                    <p className="text-emerald-800 dark:text-emerald-300/80 mt-0.5">{downloadSuccessMessage}</p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400/70 mt-1">
                      {t.result.downloadSuccessTip}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownload()}
                  disabled={downloadProgress !== null}
                  className={`flex-1 w-full py-3.5 px-6 font-semibold rounded-full text-[14px] sm:text-[15px] flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                    isSuccessPulsing
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-500/30 scale-[1.01] animate-pulse'
                      : 'bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 disabled:opacity-40 text-white shadow-lg shadow-[#0071e3]/20'
                  }`}
                >
                  {isSuccessPulsing ? (
                    <>
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                      <span>{language === 'en' ? 'Downloaded & Saved to Gallery!' : 'Berhasil Disimpan ke Galeri!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{t.result.downloadBtn}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onOpenPreview ? onOpenPreview(video, currentOption) : handleTogglePlay()}
                  className="w-full sm:w-auto py-3.5 px-5 font-semibold rounded-full text-[14px] sm:text-[15px] flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.08] transition-all cursor-pointer shadow-xs active:scale-98 shrink-0"
                  title="Preview before download"
                >
                  <Play className="w-4 h-4 fill-current text-[#0071e3] dark:text-[#2997ff]" />
                  <span>{language === 'en' ? 'Preview Video' : 'Preview / Cek Video'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-[#86868b] pt-1">
                <span className="flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                  {t.result.autoSaveLabel}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                  {t.result.noWmLabel}
                </span>
                <span>·</span>
                <button
                  onClick={onOpenGalleryGuide}
                  className="text-[#0071e3] dark:text-[#2997ff] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Info className="w-3 h-3" />
                  {t.nav.galleryGuide}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Scan Modal */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        videoUrl={currentOption?.url || ''}
        videoTitle={video.title}
      />

      {/* Audio Extract Studio Modal */}
      <AudioExtractModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        audioUrl={audioOption?.url || ''}
        videoTitle={video.title}
        authorName={video.author.name}
      />

      {/* Mobile Sticky Floating Download Bar */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 bg-white/95 dark:bg-[#161618]/95 backdrop-blur-xl border border-slate-200 dark:border-white/[0.12] rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-3 animate-fadeIn">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0 relative border border-slate-200 dark:border-white/10">
            {video.cover ? (
              <img src={video.cover} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-slate-800" />
            )}
            <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[7px] font-mono text-white px-0.5 rounded">
              {currentOption?.format.toUpperCase() || 'MP4'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-slate-900 dark:text-white truncate">
              {video.title || 'Video'}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-[#86868b] flex items-center gap-1">
              <span className="text-[#0071e3] dark:text-[#2997ff] font-medium">{currentOption?.resolution || '1080p'}</span>
              <span>·</span>
              <span>{currentOption?.sizeEstimate || 'HD'}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleDownload()}
          disabled={downloadProgress !== null}
          className={`px-4 py-2 text-white text-[12px] font-bold rounded-xl shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer min-h-[38px] transition-all duration-300 ${
            isSuccessPulsing
              ? 'bg-emerald-600 ring-2 ring-emerald-500/40 animate-pulse'
              : 'bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 disabled:opacity-40'
          }`}
        >
          {downloadProgress !== null ? (
            <span className="font-mono">{downloadProgress}%</span>
          ) : isSuccessPulsing ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{language === 'en' ? 'Saved!' : 'Tersimpan!'}</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{language === 'en' ? 'Save' : 'Simpan'}</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
