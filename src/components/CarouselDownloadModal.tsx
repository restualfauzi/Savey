import React, { useState } from 'react';
import { X, Download, Archive, CheckCircle2, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import JSZip from 'jszip';
import { CarouselSlide } from '../types';

interface CarouselDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: CarouselSlide[];
  postTitle: string;
}

export const CarouselDownloadModal: React.FC<CarouselDownloadModalProps> = ({
  isOpen,
  onClose,
  slides,
  postTitle
}) => {
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleDownloadSingle = async (slide: CarouselSlide) => {
    try {
      const filename = `savey_slide_${slide.index}.${slide.type === 'video' ? 'mp4' : 'jpg'}`;
      const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(slide.url)}&filename=${encodeURIComponent(filename)}&type=${slide.type === 'video' ? 'video/mp4' : 'image/jpeg'}`;
      
      const link = document.createElement('a');
      link.href = proxyUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  const handleDownloadAllZip = async () => {
    if (isZipping || slides.length === 0) return;
    setIsZipping(true);
    setZipProgress(5);
    setCurrentStatus('Mempersiapkan berkas ZIP...');
    setCompleted(false);

    try {
      const zip = new JSZip();
      const folder = zip.folder('savey_photos') || zip;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        setCurrentStatus(`Mengunduh slide ${i + 1} dari ${slides.length}...`);
        
        // Fetch via proxy download
        const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(slide.url)}&type=${slide.type === 'video' ? 'video/mp4' : 'image/jpeg'}`;
        const res = await fetch(proxyUrl);
        const blob = await res.blob();
        
        const ext = slide.type === 'video' ? 'mp4' : 'jpg';
        folder.file(`slide_${slide.index}_HD.${ext}`, blob);

        const currentPct = Math.round(((i + 1) / slides.length) * 75);
        setZipProgress(Math.max(currentPct, 15));
      }

      setCurrentStatus('Mengompresi seluruh berkas menjadi file .ZIP...');
      const zipBlob = await zip.generateAsync(
        { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
        (metadata) => {
          setZipProgress(75 + Math.round(metadata.percent * 0.25));
        }
      );

      setCurrentStatus('Selesai! Mengunduh berkas ZIP...');
      setZipProgress(100);

      // Trigger download
      const cleanTitle = (postTitle || 'instagram_carousel').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `savey_${cleanTitle}_all_photos.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setCompleted(true);
    } catch (err: any) {
      console.error('ZIP Error:', err);
      setCurrentStatus('Gagal membuat ZIP. Menggunakan cadangan...');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Archive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Unduh Carousel / Multi-Foto
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {slides.length} Slide
                </span>
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-neutral-400">
                Pilih foto satuan atau unduh semuanya langsung dalam 1 file ZIP
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

        {/* Progress Bar (when zipping) */}
        {isZipping && (
          <div className="my-4 p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30">
            <div className="flex items-center justify-between text-[12px] font-medium mb-1.5 text-purple-900 dark:text-purple-200">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {currentStatus}
              </span>
              <span className="font-mono font-bold">{zipProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-purple-200/50 dark:bg-purple-900/40 overflow-hidden">
              <div
                className="h-full bg-purple-600 dark:bg-purple-400 rounded-full transition-all duration-300"
                style={{ width: `${zipProgress}%` }}
              />
            </div>
          </div>
        )}

        {completed && (
          <div className="my-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-[12px] font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Semua file telah berhasil dikemas dan diunduh ke perangkat Anda!</span>
          </div>
        )}

        {/* Action Button: Download All as ZIP */}
        <div className="my-4">
          <button
            type="button"
            onClick={handleDownloadAllZip}
            disabled={isZipping}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-[13px] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sedang Mengemas ZIP ({zipProgress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Download Semua Foto Sekaligus (File .ZIP)</span>
              </>
            )}
          </button>
        </div>

        {/* Slides Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#202022] flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-slate-200 dark:bg-neutral-800">
                  <img
                    src={slide.thumbnail || slide.url}
                    alt={`Slide ${slide.index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono font-medium backdrop-blur-xs">
                    #{slide.index}
                  </span>
                  {slide.type === 'video' && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-blue-600/90 text-white text-[9px] font-semibold uppercase">
                      Video
                    </span>
                  )}
                </div>

                <div className="p-2.5 flex items-center justify-between gap-1 bg-white dark:bg-[#161618]">
                  <span className="text-[11px] font-medium text-slate-700 dark:text-neutral-300 truncate">
                    Slide {slide.index}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(slide)}
                    className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="Unduh slide ini"
                  >
                    <Download className="w-3 h-3" />
                    <span>Unduh</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
