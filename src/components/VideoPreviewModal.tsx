import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Maximize2,
  Check,
  ExternalLink,
  Film
} from 'lucide-react';
import { VideoMetadata, QualityOption } from '../types';
import { PLATFORMS } from '../utils/platforms';
import { PlatformIcon } from './SocialIcons';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { downloadAndSaveToGallery } from '../utils/downloader';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoMetadata | null;
  selectedOption?: QualityOption;
  onDownload?: (option: QualityOption) => void;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  video,
  selectedOption,
  onDownload,
}) => {
  const { t, language } = useThemeLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setIsDownloading(false);
      setDownloadSuccess(false);
      // Auto-play preview when modal opens
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
            // Autoplay with sound might be blocked, retry muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
            }
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  const platformInfo = PLATFORMS[video.platform] || PLATFORMS.unknown;
  const currentOpt =
    selectedOption ||
    video.qualityOptions.find((q) => q.format === 'mp4') ||
    video.qualityOptions[0];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleDirectDownload = async () => {
    if (!currentOpt || isDownloading) return;
    if (onDownload) {
      onDownload(currentOpt);
      onClose();
      return;
    }

    setIsDownloading(true);
    const safeTitle = (video.title || 'Video')
      .replace(/[^a-zA-Z0-9_\u00C0-\u017F\s-]/g, '')
      .trim()
      .slice(0, 35)
      .replace(/\s+/g, '_');
    const ext = currentOpt.format === 'mp3' ? 'mp3' : currentOpt.format === 'jpg' ? 'jpg' : 'mp4';
    const filename = `Savey_${video.platform.toUpperCase()}_${safeTitle}.${ext}`;
    const mimeType = currentOpt.format === 'mp3' ? 'audio/mpeg' : currentOpt.format === 'jpg' ? 'image/jpeg' : 'video/mp4';

    try {
      const res = await downloadAndSaveToGallery(currentOpt.url, filename, mimeType);
      if (res.success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (e) {
      console.warn('Preview download error:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const isVideo = currentOpt.format === 'mp4' || (!currentOpt.format.includes('mp3') && !currentOpt.format.includes('jpg'));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-white/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs bg-slate-800 border border-white/10">
              <PlatformIcon platform={video.platform} className="w-4 h-4" colored />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-white leading-none">
                  {language === 'en' ? 'Live Video Preview' : 'Preview Video Siap Unduh'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-[#2997ff] border border-blue-500/30">
                  {currentOpt.resolution || '1080p'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[240px] sm:max-w-[320px]">
                {video.author?.name ? `${video.author.name} (${video.author.username || ''})` : video.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="relative w-full aspect-[9/16] max-h-[55vh] sm:max-h-[60vh] bg-black flex items-center justify-center overflow-hidden group">
          {isVideo ? (
            <>
              <video
                ref={videoRef}
                src={currentOpt.url}
                poster={video.cover}
                playsInline
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain cursor-pointer"
                onClick={handleTogglePlay}
              />

              {/* Play overlay when paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl cursor-pointer z-20"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>
              )}

              {/* Player Overlay Controls */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePlay}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md cursor-pointer transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={handleToggleMute}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md cursor-pointer transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-300 bg-black/50 px-2 py-0.5 rounded-full">
                    {currentOpt.sizeEstimate || 'Original'}
                  </span>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md cursor-pointer transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              {video.cover ? (
                <img src={video.cover} alt={video.title} className="max-h-full max-w-full object-contain rounded-xl" />
              ) : (
                <Film className="w-16 h-16 text-slate-500 mb-3" />
              )}
              <p className="text-sm text-slate-300 mt-2 font-medium">
                {currentOpt.format === 'mp3' ? 'Format Audio HQ' : 'Foto / Carousel HD'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left w-full sm:w-auto">
            <h4 className="text-[13px] font-semibold text-white line-clamp-1">
              {video.title || 'Video Tanpa Watermark'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {language === 'en'
                ? `Direct MP4 · Clean Master · ${currentOpt.resolution || '1080p'}`
                : `Langsung tersimpan ke galeri HP · Kualitas Master 1080p`}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handleDirectDownload}
              disabled={isDownloading}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                downloadSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#0071e3] hover:bg-[#0077ed] text-white active:scale-95'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'en' ? 'Downloaded!' : 'Tersimpan!'}</span>
                </>
              ) : isDownloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{language === 'en' ? 'Downloading...' : 'Mengunduh...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{language === 'en' ? 'Download to Gallery' : 'Unduh ke Galeri'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
