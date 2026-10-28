import React, { useState, useRef } from 'react';
import { X, Music2, Download, Play, Pause, Check } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { downloadAndSaveToGallery } from '../utils/downloader';

interface AudioExtractModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioUrl: string;
  videoTitle: string;
  authorName: string;
}

export const AudioExtractModal: React.FC<AudioExtractModalProps> = ({
  isOpen,
  onClose,
  audioUrl,
  videoTitle,
  authorName,
}) => {
  const { language } = useThemeLanguage();
  const [selectedBitrate, setSelectedBitrate] = useState<'320' | '256' | '128'>('320');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!isOpen) return null;

  const isEn = language === 'en';

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleDownloadAudio = async () => {
    setIsDownloading(true);
    const cleanTitle = (videoTitle || 'Audio_Track')
      .replace(/[^a-zA-Z0-9_\u00C0-\u017F\s-]/g, '')
      .trim()
      .slice(0, 30)
      .replace(/\s+/g, '_');
    const filename = `Savey_${cleanTitle}_${selectedBitrate}kbps.mp3`;

    await downloadAndSaveToGallery(audioUrl, filename, 'audio/mpeg');

    setIsDownloading(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center">
            <Music2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">
              {isEn ? 'Master Audio Studio' : 'Studio Ekstraksi Audio'}
            </h3>
            <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
              {isEn ? 'Lossless MP3 Soundtrack Extraction' : 'Ekstraksi Trek Audio MP3 Definisi Tinggi'}
            </p>
          </div>
        </div>

        {/* Audio Player Card with Waveform bars */}
        <div className="p-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl mb-6">
          <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white flex items-center justify-center transition-all shadow-md shadow-[#0071e3]/20 cursor-pointer shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white truncate">
                {videoTitle}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-[#86868b] truncate mt-0.5">
                {authorName} · MP3 Audio Track
              </p>
              {/* Waveform Indicator */}
              <div className="flex items-end gap-1 h-3 mt-2">
                {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-[#0071e3] dark:bg-[#2997ff] transition-all duration-200 ${
                      isPlaying ? 'animate-pulse' : 'opacity-30'
                    }`}
                    style={{ height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : '20%' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bitrate Selector */}
        <div className="mb-6">
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#86868b] uppercase tracking-wider mb-2.5">
            {isEn ? 'Select Bitrate Quality' : 'Pilih Kualitas Bitrate'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '320', label: '320 kbps', desc: isEn ? 'Master HQ' : 'Kualitas Master' },
              { id: '256', label: '256 kbps', desc: isEn ? 'High Def' : 'Definisi Tinggi' },
              { id: '128', label: '128 kbps', desc: isEn ? 'Standard' : 'Standar Ringan' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBitrate(b.id as any)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedBitrate === b.id
                    ? 'bg-blue-50/80 dark:bg-[#1d1d24] border-[#0071e3] text-slate-900 dark:text-white ring-1 ring-[#0071e3]/30 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#121214] border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <p className="text-[13px] font-bold">{b.label}</p>
                <p className="text-[10px] text-slate-500 dark:text-[#86868b] mt-0.5">{b.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Success message */}
        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl text-[12px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-4">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
            <span>{isEn ? 'Audio saved successfully to your device!' : 'Audio berhasil tersimpan ke perangkat Anda!'}</span>
          </div>
        )}

        {/* Primary Download Action */}
        <button
          onClick={handleDownloadAudio}
          disabled={isDownloading}
          className="w-full py-3.5 px-6 bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 disabled:opacity-40 text-white font-semibold rounded-full text-[14px] shadow-lg shadow-[#0071e3]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>
            {isDownloading
              ? (isEn ? 'Extracting & Downloading...' : 'Mengekstrak & Mengunduh...')
              : `${isEn ? 'Download MP3 Audio' : 'Unduh Audio MP3'} (${selectedBitrate} kbps)`}
          </span>
        </button>
      </div>
    </div>
  );
};
