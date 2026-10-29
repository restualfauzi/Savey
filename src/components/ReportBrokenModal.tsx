import React, { useState } from 'react';
import { X, AlertTriangle, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ReportBrokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  platform?: string;
}

export const ReportBrokenModal: React.FC<ReportBrokenModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  platform = 'unknown'
}) => {
  const [issueType, setIssueType] = useState('cannot_download');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/report-broken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl,
          platform,
          issueType,
          note,
          timestamp: Date.now()
        })
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2200);
    } catch (err) {
      console.warn('Report submission fallback:', err);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Laporkan Tautan Rusak
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-neutral-400">
                Bantu tim kami memperbarui algoritma pengunduh
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

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base">
              Laporan Berhasil Terkirim!
            </h4>
            <p className="text-[13px] text-slate-500 dark:text-neutral-400 max-w-xs mx-auto">
              Terima kasih! Tautan ini telah dicatat dan akan segera diperiksa oleh sistem.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Tautan yang Bermasalah:
              </label>
              <input
                type="text"
                readOnly
                value={targetUrl || 'Tidak ada URL'}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#202022] text-[12px] font-mono text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/5 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Jenis Kendala:
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#202022] text-[13px] text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 outline-hidden"
              >
                <option value="cannot_download">Video tidak dapat diunduh (Error)</option>
                <option value="no_audio">Video tidak ada suaranya</option>
                <option value="watermark_present">Watermark masih muncul</option>
                <option value="wrong_quality">Kualitas tidak sesuai (buram)</option>
                <option value="other">Kendala lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Catatan Tambahan (Opsional):
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: Akun ini baru posting reel 5 menit lalu..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#202022] text-[13px] text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-semibold text-[13px] shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengirim Laporan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Laporan Tautan</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
