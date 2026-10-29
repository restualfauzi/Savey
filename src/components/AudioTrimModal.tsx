import React, { useState, useRef, useEffect } from 'react';
import { X, Scissors, Play, Pause, Download, Volume2, Music, Loader2, CheckCircle2 } from 'lucide-react';

interface AudioTrimModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioUrl: string;
  videoTitle: string;
}

export const AudioTrimModal: React.FC<AudioTrimModalProps> = ({
  isOpen,
  onClose,
  audioUrl,
  videoTitle
}) => {
  const [duration, setDuration] = useState<number>(30);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isOpen || !audioUrl) return;

    let isCancelled = false;
    setIsProcessing(true);

    const loadAudio = async () => {
      try {
        const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(audioUrl)}&type=audio/mp3`;
        const res = await fetch(proxyUrl);
        const arrayBuffer = await res.arrayBuffer();

        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const decoded = await ctx.decodeAudioData(arrayBuffer);
        if (!isCancelled) {
          setAudioBuffer(decoded);
          const dur = Math.floor(decoded.duration);
          setDuration(dur);
          setStartTime(0);
          setEndTime(Math.min(dur, 20));
        }
      } catch (err) {
        console.warn('Audio decoding fallback, using standard HTML5 Audio:', err);
        setDuration(30);
        setStartTime(0);
        setEndTime(15);
      } finally {
        if (!isCancelled) setIsProcessing(false);
      }
    };

    loadAudio();

    return () => {
      isCancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isOpen, audioUrl]);

  if (!isOpen) return null;

  // Toggle preview play for the selected trimmed window
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = startTime;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.warn);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    if (audioRef.current.currentTime >= endTime) {
      audioRef.current.pause();
      audioRef.current.currentTime = startTime;
      setIsPlaying(false);
    }
  };

  // Convert sliced AudioBuffer to WAV format directly in-browser
  const exportTrimmedWav = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      let blob: Blob;

      if (audioBuffer && audioContextRef.current) {
        const sampleRate = audioBuffer.sampleRate;
        const startOffset = Math.floor(startTime * sampleRate);
        const endOffset = Math.floor(endTime * sampleRate);
        const frameCount = endOffset - startOffset;

        const numberOfChannels = audioBuffer.numberOfChannels;
        const trimmedBuffer = audioContextRef.current.createBuffer(
          numberOfChannels,
          frameCount,
          sampleRate
        );

        for (let channel = 0; channel < numberOfChannels; channel++) {
          const channelData = audioBuffer.getChannelData(channel);
          const trimmedData = trimmedBuffer.getChannelData(channel);
          for (let i = 0; i < frameCount; i++) {
            trimmedData[i] = channelData[startOffset + i];
          }
        }

        // Encode WAV
        blob = audioBufferToWav(trimmedBuffer);
      } else {
        // Fallback: fetch directly
        const res = await fetch(`/api/proxy-download?url=${encodeURIComponent(audioUrl)}&type=audio/mp3`);
        blob = await res.blob();
      }

      const cleanName = (videoTitle || 'ringtone').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 25);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `savey_ringtone_${cleanName}_${Math.round(startTime)}s_${Math.round(endTime)}s.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const selectedDuration = Math.max(0, endTime - startTime);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Pemotong Audio &amp; Nada Dering (Ringtone)
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-neutral-400">
                Pilih bagian terbaik lagu/audio untuk dijadikan ringtone HP
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

        {/* Hidden Audio Player for previewing */}
        <audio
          ref={audioRef}
          src={`/api/proxy-download?url=${encodeURIComponent(audioUrl)}&type=audio/mp3`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          preload="auto"
        />

        {isProcessing ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 dark:text-neutral-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#0071e3]" />
            <span className="text-[13px]">Menganalisis frekuensi audio...</span>
          </div>
        ) : (
          <div className="py-5 space-y-5">
            {/* Waveform Mock Simulation */}
            <div className="relative h-16 w-full bg-slate-100 dark:bg-[#202022] rounded-2xl p-2 flex items-center justify-between gap-1 overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => {
                const heightPct = Math.sin(i * 0.4) * 40 + 50;
                const progressPos = (i / 40) * duration;
                const isSelected = progressPos >= startTime && progressPos <= endTime;

                return (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all ${
                      isSelected
                        ? 'bg-amber-500 dark:bg-amber-400'
                        : 'bg-slate-300 dark:bg-neutral-700 opacity-40'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                );
              })}
            </div>

            {/* Time Summary Info */}
            <div className="flex items-center justify-between text-[13px] font-mono px-1">
              <div>
                <span className="text-slate-500 dark:text-neutral-400 block text-[10px] uppercase font-sans">
                  Mulai
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatSeconds(startTime)}
                </span>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[12px] font-semibold border border-amber-200/50 dark:border-amber-800/30">
                Durasi Ringtone: {selectedDuration} detik
              </div>
              <div className="text-right">
                <span className="text-slate-500 dark:text-neutral-400 block text-[10px] uppercase font-sans">
                  Selesai
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatSeconds(endTime)}
                </span>
              </div>
            </div>

            {/* Sliders for Start & End Time */}
            <div className="space-y-3 bg-slate-50 dark:bg-[#1a1a1c] p-4 rounded-2xl border border-slate-200 dark:border-white/5">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-neutral-400 mb-1">
                  <span>Titik Awal (Start):</span>
                  <span>{formatSeconds(startTime)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, endTime - 1)}
                  step="1"
                  value={startTime}
                  onChange={(e) => setStartTime(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-neutral-400 mb-1">
                  <span>Titik Akhir (End):</span>
                  <span>{formatSeconds(endTime)}</span>
                </div>
                <input
                  type="range"
                  min={startTime + 1}
                  max={duration}
                  step="1"
                  value={endTime}
                  onChange={(e) => setEndTime(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={togglePlay}
                className="py-3 px-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer min-w-[120px]"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Tes Putar</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={exportTrimmedWav}
                disabled={isExporting}
                className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-semibold text-[13px] shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengekspor Nada Dering...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Ringtone ({selectedDuration}d)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to encode AudioBuffer to clean PCM WAV 16-bit
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const out = new DataView(new ArrayBuffer(length));
  const channels: Float32Array[] = [];
  let sampleRate = buffer.sampleRate;
  let offset = 0;
  let pos = 0;

  function setUint16(data: number) {
    out.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    out.setUint32(pos, data, true);
    pos += 4;
  }

  // RIFF identifier
  out.setUint32(0, 0x46464952, true); // "RIFF"
  out.setUint32(4, length - 8, true); // file length - 8
  out.setUint32(8, 0x45564157, true); // "WAVE"

  // fmt sub-chunk
  out.setUint32(12, 0x20746d66, true); // "fmt "
  out.setUint32(16, 16, true); // subchunk1size (16 for PCM)
  out.setUint16(20, 1, true); // two-byte int (1 for PCM)
  out.setUint16(22, numOfChan, true);
  out.setUint32(24, sampleRate, true);
  out.setUint32(28, sampleRate * 2 * numOfChan, true); // byte rate
  out.setUint16(32, numOfChan * 2, true); // block align
  out.setUint16(34, 16, true); // bits per sample

  // data sub-chunk
  out.setUint32(36, 0x61746164, true); // "data"
  out.setUint32(40, length - pos - 4, true); // chunk length

  pos = 44;

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (offset < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      out.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([out.buffer], { type: 'audio/wav' });
}
