import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Copyright,
  Mail,
  Search,
  ExternalLink,
  Check,
  Copy,
  AlertCircle,
  HelpCircle,
  Lock,
  Globe2,
  Cookie
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export type LegalTab = 'privacy' | 'terms' | 'dmca' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { language, t } = useThemeLanguage();
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery('');
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const isEn = language === 'en';
  const supportEmail = 'support@circlemesh.site';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl relative text-left transition-all pb-safe">
        {/* Mobile Drag Indicator */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0071e3]/10 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff]">
                circlemesh.site
              </span>
              <span className="text-[11px] text-slate-500 dark:text-[#86868b]">
                {isEn ? 'Official Legal Documentation' : 'Dokumentasi Hukum Resmi'}
              </span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-slate-900 dark:text-white mt-1">
              {activeTab === 'privacy' && (isEn ? 'Privacy Policy' : 'Kebijakan Privasi')}
              {activeTab === 'terms' && (isEn ? 'Terms of Service' : 'Ketentuan Layanan')}
              {activeTab === 'dmca' && (isEn ? 'DMCA & Copyright Policy' : 'Kebijakan DMCA & Hak Cipta')}
              {activeTab === 'contact' && (isEn ? 'Contact & Publisher Info' : 'Kontak & Informasi Penerbit')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="px-4 sm:px-6 pt-3 pb-2 shrink-0 space-y-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-2 px-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="truncate">{isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}</span>
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`py-2 px-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="truncate">{isEn ? 'Terms of Service' : 'Ketentuan Layanan'}</span>
            </button>
            <button
              onClick={() => setActiveTab('dmca')}
              className={`py-2 px-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'dmca'
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Copyright className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="truncate">{isEn ? 'DMCA & Copyright' : 'DMCA & Hak Cipta'}</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-2 px-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-[#86868b] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="truncate">{isEn ? 'Contact & Support' : 'Kontak & Dukungan'}</span>
            </button>
          </div>

          {/* Quick Filter Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#86868b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEn
                  ? 'Filter clauses (e.g. AdSense, cookies, DART, CCPA, GDPR, liability, email)...'
                  : 'Cari pasal (contoh: AdSense, cookie, DART, CCPA, GDPR, tanggung jawab, email)...'
              }
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-xl text-[12px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#86868b] focus:outline-none focus:ring-1 focus:ring-[#0071e3]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {isEn ? 'Clear' : 'Hapus'}
              </button>
            )}
          </div>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 text-[13px] leading-relaxed text-slate-600 dark:text-[#86868b]">
          {/* ========================================================= */}
          {/* TAB 1: PRIVACY POLICY (AdSense Compliant) */}
          {/* ========================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              {/* Highlight Banner */}
              <div className="p-4 bg-blue-50/70 dark:bg-[#0071e3]/10 border border-[#0071e3]/20 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff] shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {isEn
                      ? 'AdSense Compliant & Privacy-First Architecture'
                      : 'Kepatuhan Standar Google AdSense & Arsitektur Ramah Privasi'}
                  </p>
                  <p className="text-slate-600 dark:text-[#86868b] mt-0.5">
                    {isEn
                      ? 'Savey (circlemesh.site) complies with the Google AdSense Publisher Policies, GDPR, and CCPA/CPRA. For privacy inquiries, contact our Data Protection desk at '
                      : 'Savey (circlemesh.site) mematuhi Kebijakan Penerbit Google AdSense, GDPR, dan CCPA/CPRA. Untuk pertanyaan privasi, hubungi '}{' '}
                    <strong className="text-[#0071e3] dark:text-[#2997ff] font-mono">{supportEmail}</strong>.
                  </p>
                </div>
              </div>

              {/* Clause 1: Identity & Scope */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Scope, Publisher Identity & Commitment' : 'Ruang Lingkup, Identitas Penerbit & Komitmen'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'This Privacy Policy applies to the web utility service operated at circlemesh.site ("Savey", "we", "our", or "us"). We are committed to transparency and respect for user sovereignty. This document outlines how information is handled, our relationship with third-party advertising providers like Google AdSense, and your rights under international privacy laws.'
                    : 'Kebijakan Privasi ini berlaku untuk layanan web yang dioperasikan pada circlemesh.site ("Savey", "kami"). Kami berkomitmen terhadap transparansi dan privasi pengguna. Dokumen ini menjelaskan bagaimana informasi dikelola, kemitraan periklanan pihak ketiga seperti Google AdSense, serta hak Anda berdasarkan regulasi privasi internasional.'}
                </p>
                <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
                  {isEn ? 'Official Contact Email:' : 'Email Kontak Resmi:'}{' '}
                  <span className="font-mono text-[#0071e3] dark:text-[#2997ff] font-medium">{supportEmail}</span>
                </p>
              </div>

              {/* Clause 2: Google AdSense & DoubleClick DART Cookies */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-[#0071e3]/30 dark:border-[#2997ff]/20 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0071e3] text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
                    {isEn
                      ? 'Google AdSense & DoubleClick DART Cookie Disclosure'
                      : 'Pengungkapan Google AdSense & Cookie DoubleClick DART'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Google is a third-party vendor on our website. Google uses cookies, specifically known as DoubleClick DART cookies, to serve advertisements to visitors based on their visit to circlemesh.site and other websites across the Internet.'
                    : 'Google merupakan vendor pihak ketiga di situs kami. Google menggunakan cookie, yang secara khusus dikenal sebagai cookie DoubleClick DART, untuk menayangkan iklan kepada pengunjung berdasarkan kunjungan mereka ke circlemesh.site dan situs web lain di Internet.'}
                </p>
                <div className="p-3 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl space-y-2 text-[12px]">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {isEn ? 'How Users Can Opt-Out of DART Cookies:' : 'Cara Pengguna Menolak/Memilih Keluar dari Cookie DART:'}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-[#86868b]">
                    <li>
                      {isEn
                        ? 'Visitors may opt out of the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at: '
                        : 'Pengunjung dapat memilih keluar dari penggunaan cookie DART dengan mengunjungi Kebijakan Privasi Jaringan Iklan dan Konten Google di: '}
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071e3] dark:text-[#2997ff] hover:underline inline-flex items-center gap-0.5 font-mono"
                      >
                        policies.google.com/technologies/ads <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      {isEn
                        ? 'Users can manage personalized ad preferences via Google Ads Settings: '
                        : 'Pengguna dapat mengelola preferensi iklan yang dipersonalisasi melalui Google Ads Settings: '}
                      <a
                        href="https://adssettings.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071e3] dark:text-[#2997ff] hover:underline inline-flex items-center gap-0.5 font-mono"
                      >
                        adssettings.google.com <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      {isEn
                        ? 'You can also opt out of third-party vendor cookies for personalized advertising through the Network Advertising Initiative (NAI) or Digital Advertising Alliance: '
                        : 'Anda juga dapat memilih keluar dari cookie vendor pihak ketiga untuk iklan terpersonalisasi melalui DAA: '}
                      <a
                        href="https://optout.aboutads.info/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071e3] dark:text-[#2997ff] hover:underline inline-flex items-center gap-0.5 font-mono"
                      >
                        aboutads.info/choices <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Clause 3: Third-Party Advertising Partners & Web Beacons */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Third-Party Advertising Partners & Web Beacons' : 'Mitra Periklanan Pihak Ketiga & Web Beacon'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are sent directly to users’ browsers in their respective advertisements and links displayed on Savey. When this occurs, they automatically receive your IP address. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.'
                    : 'Server iklan atau jaringan iklan pihak ketiga menggunakan teknologi seperti cookie, JavaScript, atau Web Beacon yang dikirim langsung ke peramban pengguna dalam iklan dan tautan yang ditampilkan di Savey. Ketika hal ini terjadi, mereka secara otomatis menerima alamat IP Anda. Teknologi ini digunakan untuk mengukur efektivitas kampanye periklanan mereka dan/atau mempersonalisasi konten iklan yang Anda lihat di situs web yang Anda kunjungi.'}
                </p>
                <p className="text-[12px] bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 p-2.5 rounded-xl text-amber-900 dark:text-amber-200">
                  {isEn
                    ? 'Important Note: Savey has no access to or control over these cookies that are used by third-party advertisers. You should consult the respective privacy policies of these third-party ad servers for more detailed information.'
                    : 'Catatan Penting: Savey tidak memiliki akses ke atau kontrol terhadap cookie yang digunakan oleh pengiklan pihak ketiga tersebut. Anda disarankan untuk membaca kebijakan privasi masing-masing server iklan pihak ketiga untuk informasi lebih lengkap.'}
                </p>
              </div>

              {/* Clause 4: Log Files */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    4
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Log Files & Diagnostic Data' : 'Berkas Log (Log Files) & Data Diagnostik'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Savey follows a standard industry procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.'
                    : 'Savey mengikuti prosedur standar industri dalam menggunakan berkas log. Berkas ini mencatat pengunjung saat mengunjungi situs web. Informasi yang dikumpulkan mencakup alamat protokol internet (IP), jenis peramban, Penyedia Layanan Internet (ISP), stempel tanggal dan waktu, halaman perujuk/keluar, dan jumlah klik.'}
                </p>
                <p>
                  {isEn
                    ? 'These records are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, preventing automated denial-of-service abuse, and gathering demographic information for aggregate technical maintenance.'
                    : 'Catatan log ini tidak terhubung dengan informasi apa pun yang dapat mengidentifikasi identitas pribadi Anda. Tujuannya murni untuk menganalisis tren performa, mengelola situs, mencegah serangan bot/DDoS, serta pemeliharaan teknis server.'}
                </p>
              </div>

              {/* Clause 5: Zero Retention Media Architecture */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    5
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Zero-Retention Media Architecture & Client Processing' : 'Arsitektur Tanpa Penyimpanan Media & Pemrosesan Klien'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Savey does not maintain a media database. Downloaded video files, extracted audio MP3s, image covers, and original submitted social media URLs are streamed in volatile transit memory via secure encrypted TLS. We never store copies of your downloaded content on our servers.'
                    : 'Savey tidak mengoperasikan database penyimpanan file media. Berkas video, audio MP3, gambar sampul, dan tautan yang Anda masukkan dialirkan secara langsung melalui memori transit terenkripsi TLS. Kami tidak pernah menyimpan salinan berkas unduhan Anda di server kami.'}
                </p>
                <p>
                  {isEn
                    ? 'Your personal download history and preference toggles (quality presets, theme, and language) are stored exclusively in your local device browser storage (HTML5 LocalStorage) and can be cleared by you at any time.'
                    : 'Riwayat unduhan dan preferensi Anda (preset kualitas, tema, dan bahasa) tersimpan secara eksklusif di peramban lokal perangkat Anda (HTML5 LocalStorage) dan dapat dihapus kapan pun dengan sekali klik.'}
                </p>
              </div>

              {/* Clause 6: CCPA / CPRA Privacy Rights */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    6
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'CCPA / CPRA Privacy Rights (California Consumers)' : 'Hak Privasi CCPA / CPRA (Konsumen California)'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific statutory rights:'
                    : 'Berdasarkan California Consumer Privacy Act (CCPA) dan CPRA, pengguna berhak atas ketentuan perlindungan privasi:'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[12px]">
                  <li>
                    <strong>{isEn ? 'Right to Know:' : 'Hak untuk Mengetahui:'}</strong>{' '}
                    {isEn
                      ? 'Request disclosure of categories and specific pieces of personal data collected.'
                      : 'Meminta pengungkapan kategori dan rincian data yang dikumpulkan.'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Right to Delete:' : 'Hak Penghapusan:'}</strong>{' '}
                    {isEn
                      ? 'Request deletion of personal data collected about you.'
                      : 'Meminta penghapusan data pribadi Anda.'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Right to Opt-Out of Sale/Sharing:' : 'Hak Menolak Penjualan Data:'}</strong>{' '}
                    {isEn
                      ? 'We do not sell personal information. You retain the right to direct businesses not to sell or share your data.'
                      : 'Kami tidak menjual data pribadi. Anda berhak menolak penjualan atau pembagian data.'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Non-Discrimination:' : 'Hak Bebas Diskriminasi:'}</strong>{' '}
                    {isEn
                      ? 'We will not discriminate against you for exercising any of your CCPA rights.'
                      : 'Anda tidak akan didiskriminasi karena menggunakan hak privasi ini.'}
                  </li>
                </ul>
                <p className="text-[12px] pt-1">
                  {isEn
                    ? 'To submit a CCPA request, please email our compliance team at '
                    : 'Untuk mengajukan permohonan CCPA, silakan kirim email ke '}{' '}
                  <span className="font-mono text-[#0071e3] dark:text-[#2997ff] font-medium">{supportEmail}</span>.
                </p>
              </div>

              {/* Clause 7: GDPR Data Protection Rights */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    7
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'GDPR Data Protection Rights (EEA & UK)' : 'Hak Perlindungan Data GDPR (Uni Eropa & Inggris)'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Every user located in the European Economic Area (EEA) and United Kingdom is entitled to the following rights under Regulation (EU) 2016/679:'
                    : 'Setiap pengguna di Wilayah Ekonomi Eropa (EEA) dan Inggris Raya berhak atas perlindungan berikut berdasarkan Regulasi (EU) 2016/679:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] pt-1">
                  <div className="p-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {isEn ? 'Right to Access & Rectification' : 'Hak Akses & Perbaikan'}
                    </p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5">
                      {isEn
                        ? 'Request copies of personal records and correct any inaccurate information.'
                        : 'Meminta salinan data pribadi dan memperbaiki informasi yang tidak akurat.'}
                    </p>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {isEn ? 'Right to Erasure ("To Be Forgotten")' : 'Hak Penghapusan (Dilupakan)'}
                    </p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5">
                      {isEn
                        ? 'Request the expungement of personal data under statutory conditions.'
                        : 'Meminta penghapusan data pribadi Anda sesuai syarat hukum.'}
                    </p>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {isEn ? 'Right to Restrict & Object' : 'Hak Pembatasan & Penolakan'}
                    </p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5">
                      {isEn
                        ? 'Request restriction or object to the processing of personal data.'
                        : 'Membatasi atau menolak pemrosesan data pribadi tertentu.'}
                    </p>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {isEn ? 'Right to Data Portability' : 'Hak Portabilitas Data'}
                    </p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5">
                      {isEn
                        ? 'Request transfer of collected data to another organization or directly to you.'
                        : 'Meminta pengalihan data ke organisasi lain atau langsung ke Anda.'}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] pt-1">
                  {isEn
                    ? 'If you make a request, we have one month to respond to you. Please contact our Data Protection Officer at: '
                    : 'Permintaan GDPR akan ditanggapi selambat-lambatnya dalam 30 hari kerja. Hubungi: '}{' '}
                  <span className="font-mono text-[#0071e3] dark:text-[#2997ff] font-medium">{supportEmail}</span>.
                </p>
              </div>

              {/* Clause 8: Children's Online Privacy Protection Act (COPPA) */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    8
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Children’s Online Privacy Protection (COPPA)' : 'Perlindungan Privasi Anak Daring (COPPA)'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Savey does not knowingly collect any Personal Identifiable Information from children under the age of 13.'
                    : 'Perlindungan anak di dunia digital adalah prioritas utama kami. Kami mendorong orang tua untuk memantau aktivitas daring anak mereka. Savey tidak secara sengaja mengumpulkan informasi identitas pribadi apa pun dari anak-anak di bawah usia 13 tahun.'}
                </p>
                <p>
                  {isEn
                    ? 'If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately at support@circlemesh.site, and we will use our best efforts to promptly remove such information from our records.'
                    : 'Jika Anda meyakini bahwa anak Anda telah memberikan informasi pribadi di situs kami, mohon segera hubungi kami di support@circlemesh.site, dan kami akan segera mengambil tindakan untuk menghapus informasi tersebut.'}
                </p>
              </div>

              {/* Clause 9: Consent & Policy Changes */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    9
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'User Consent & Policy Modifications' : 'Persetujuan Pengguna & Perubahan Kebijakan'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'By using our website, you hereby consent to our Privacy Policy and agree to its terms. We may update our Privacy Policy periodically to reflect technological changes, regulatory requirements, or service improvements. Any updates will be published on this page with a revised date stamp.'
                    : 'Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami beserta persyaratannya. Kami dapat memperbarui Kebijakan Privasi ini secara berkala untuk menyesuaikan perkembangan regulasi maupun peningkatan layanan.'}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: TERMS OF SERVICE (AdSense Compliant) */}
          {/* ========================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              {/* Highlight Banner */}
              <div className="p-4 bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] rounded-2xl flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff] shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {isEn ? 'Standard Terms of Service & Service Agreement' : 'Perjanjian Layanan & Syarat Ketentuan Resmi'}
                  </p>
                  <p className="text-slate-600 dark:text-[#86868b] mt-0.5">
                    {isEn
                      ? 'Please read these Terms carefully before using Savey (circlemesh.site). By accessing our services, you agree to be bound by these provisions.'
                      : 'Harap membaca ketentuan ini secara seksama. Dengan mengakses atau menggunakan layanan Savey di circlemesh.site, Anda setuju untuk terikat oleh ketentuan ini.'}
                  </p>
                </div>
              </div>

              {/* Section 1: Agreement to Terms */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Acceptance of Terms & Publisher Identity' : 'Penerimaan Ketentuan & Identitas Pengembang'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'These Terms of Service constitute a legally binding agreement between you ("User", "you") and Savey, hosted at circlemesh.site ("Service", "we", "us"). By accessing or utilizing the website, you confirm that you are at least 13 years of age (or of legal age in your jurisdiction) and possess full legal capacity to enter into these terms.'
                    : 'Ketentuan Layanan ini merupakan perjanjian hukum yang mengikat antara Anda ("Pengguna") dan Savey di circlemesh.site ("Layanan", "kami"). Dengan mengakses situs web ini, Anda menyatakan telah berusia sekurang-kurangnya 13 tahun dan memiliki kapasitas hukum penuh.'}
                </p>
                <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
                  {isEn ? 'Contact for legal notifications:' : 'Kontak untuk pemberitahuan hukum:'}{' '}
                  <span className="font-mono text-[#0071e3] dark:text-[#2997ff] font-medium">{supportEmail}</span>
                </p>
              </div>

              {/* Section 2: Permitted Personal & Fair-Use Purpose */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Permitted Utility & Fair-Use Purpose' : 'Tujuan Utilitas & Penggunaan Wajar (Fair Use)'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Savey is provided strictly as a technical media utility tool designed for personal, educational, non-commercial archiving, and fair-use study of publicly available social media content. You may use this service solely to download media for which you possess lawful rights, express creator authorization, or where your offline storage constitutes fair use under applicable statutory copyright laws.'
                    : 'Savey disediakan murni sebagai alat utilitas teknis untuk pengarsipan pribadi non-komersial, referensi pendidikan, dan studi penggunaan wajar atas konten publik media sosial. Anda hanya diperbolehkan mengunduh konten jika memiliki izin pemilik hak cipta atau memenuhi kriteria penggunaan wajar (fair use).'}
                </p>
              </div>

              {/* Section 3: Prohibited Conduct & Activities */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Prohibited Activities & User Obligations' : 'Larangan Penggunaan & Kewajiban Pengguna'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'When accessing or utilizing Savey, you expressly agree NOT to engage in any of the following prohibited behaviors:'
                    : 'Saat mengakses Savey, Anda dilarang keras melakukan hal-hal berikut:'}
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[12px]">
                  <li>
                    {isEn
                      ? 'Infringe upon copyright, trademark, trade secret, or privacy rights of original creators or third-party platforms.'
                      : 'Melanggar hak cipta, merek dagang, rahasia dagang, atau privasi pihak ketiga maupun platform sumber.'}
                  </li>
                  <li>
                    {isEn
                      ? 'Re-distribute, re-sell, license, broadcast, or commercially exploit downloaded media without written authorization from the copyright holder.'
                      : 'Mendistribusikan ulang, menjual, melisensikan, atau mengomersialkan materi unduhan tanpa izin tertulis dari pemilik hak cipta.'}
                  </li>
                  <li>
                    {isEn
                      ? 'Deploy automated bots, scraping tools, spiders, or denial-of-service (DoS/DDoS) scripts that overload our servers or interfere with site integrity.'
                      : 'Menggunakan bot otomatis, scraper massal, atau serangan DoS/DDoS yang membebani infrastruktur server atau merusak layanan.'}
                  </li>
                  <li>
                    {isEn
                      ? 'Process, archive, or facilitate the transmission of illegal material, child sexual abuse material (CSAM), non-consensual imagery, or malware.'
                      : 'Memproses atau memfasilitasi transmisi konten ilegal, pornografi anak (CSAM), materi tanpa konsen, atau perangkat perusak (malware).'}
                  </li>
                  <li>
                    {isEn
                      ? 'Circumvent, bypass, or tamper with security protocols, rate limiters, or digital rights controls.'
                      : 'Membobol atau memanipulasi protokol keamanan, pembatas laju (rate limiting), atau kontrol hak cipta.'}
                  </li>
                </ul>
              </div>

              {/* Section 4: Third-Party Advertisements & Google AdSense */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-[#0071e3]/30 dark:border-[#2997ff]/20 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0071e3] text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    4
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn
                      ? 'Third-Party Advertisements & Google AdSense Relations'
                      : 'Iklan Pihak Ketiga & Ketentuan Google AdSense'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Savey displays third-party advertisements, including advertising provided by Google AdSense and its network partners, as well as external links. We do not manufacture, control, endorse, or verify products, services, or claims displayed in third-party advertisements.'
                    : 'Savey menampilkan iklan pihak ketiga, termasuk iklan yang disediakan oleh Google AdSense beserta jaringan mitranya, serta tautan eksternal. Kami tidak mengoperasikan, mengontrol, atau menjamin klaim, produk, maupun layanan yang diiklankan oleh pihak ketiga.'}
                </p>
                <p>
                  {isEn
                    ? 'Your interactions, communications, and transactions with advertisers found on or through Savey are solely between you and the advertiser. Savey shall not be responsible or liable for any loss, damage, or dispute of any sort incurred as the result of any such dealings.'
                    : 'Interaksi atau transaksi apa pun antara Anda dengan pengiklan yang muncul di Savey sepenuhnya merupakan tanggung jawab Anda dan pengiklan terkait. Savey tidak bertanggung jawab atas kerugian atau klaim yang timbul dari interaksi tersebut.'}
                </p>
              </div>

              {/* Section 5: Non-Affiliation & Trademark Disclaimer */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    5
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Non-Affiliation & Trademark Notice' : 'Pernyataan Independen & Hak Merek Dagang'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'Savey is an independent software utility. Savey is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with TikTok, ByteDance Ltd., Instagram, Facebook, Meta Platforms, Inc., X Corp. (formerly Twitter), Threads, or any of their subsidiaries or affiliates.'
                    : 'Savey adalah alat peranti lunak independen. Savey TIDAK berafiliasi, diotorisasi, didukung oleh, atau secara resmi terhubung dengan TikTok, ByteDance Ltd., Instagram, Facebook, Meta Platforms, Inc., X Corp. (Twitter), Threads, maupun entitas terkait.'}
                </p>
                <p className="text-[12px] text-slate-500 dark:text-[#86868b]">
                  {isEn
                    ? 'All trademarks, service marks, trade names, and logos referenced on circlemesh.site are the intellectual property of their respective holders and are used strictly under the doctrine of nominative fair use.'
                    : 'Seluruh merek dagang, logo, dan nama produk yang disebut di situs ini adalah milik dari pemilik sah masing-masing dan digunakan semata-mata untuk identifikasi nominatif yang wajar.'}
                </p>
              </div>

              {/* Section 6: Disclaimer of Warranties & Limitation of Liability */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    6
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Disclaimer of Warranties & Limitation of Liability' : 'Batasan Tanggung Jawab & Pelepasan Jaminan'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, statutory, or implied, including but not limited to merchantability, fitness for a particular purpose, non-infringement, or continuous availability.'
                    : 'Layanan disediakan berdasarkan prinsip "SEBAGAIMANA ADANYA" dan "SEBAGAIMANA TERSEDIA" tanpa jaminan apa pun, baik tersurat maupun tersirat, termasuk ketersediaan tanpa gangguan atau kelayakan untuk tujuan tertentu.'}
                </p>
                <p>
                  {isEn
                    ? 'In no event shall Savey, circlemesh.site, its operators, or affiliates be liable for any direct, indirect, incidental, special, consequential, or exemplary damages (including loss of profits, data, or media) arising from your use of or inability to use the service.'
                    : 'Savey, circlemesh.site, beserta pengelolanya tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan ini.'}
                </p>
              </div>

              {/* Section 7: Indemnification */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    7
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Indemnification' : 'Ganti Rugi (Indemnifikasi)'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'You agree to defend, indemnify, and hold harmless Savey, circlemesh.site, and its administrators from and against any claims, damages, liabilities, costs, or expenses (including legal fees) arising out of or related to your misuse of the service, infringement of third-party rights, or breach of these Terms.'
                    : 'Anda setuju untuk mengganti rugi, membela, dan membebaskan Savey, circlemesh.site, serta pengelolanya dari setiap klaim, kerugian, tanggung jawab, dan biaya hukum yang timbul akibat pelanggaran Ketentuan ini atau pelanggaran hak pihak ketiga oleh Anda.'}
                </p>
              </div>

              {/* Section 8: Governing Law & Updates */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#2c2c2e] text-slate-800 dark:text-white font-mono text-[11px] font-bold flex items-center justify-center">
                    8
                  </span>
                  <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Modifications & Inquiries' : 'Pembaruan Ketentuan & Kontak'}
                  </h4>
                </div>
                <p>
                  {isEn
                    ? 'We reserve the right to amend, update, or replace these Terms at our sole discretion. Changes become effective immediately upon posting. Your continued use of the website following amendments constitutes your binding acceptance.'
                    : 'Kami berhak memperbarui Ketentuan Layanan ini sewaktu-waktu. Perubahan berlaku efektif saat diterbitkan di halaman ini. Penggunaan berkelanjutan atas situs web ini menandakan persetujuan Anda.'}
                </p>
                <p className="text-[12px]">
                  {isEn ? 'For formal inquiries, email:' : 'Untuk pertanyaan resmi, hubungi:'}{' '}
                  <span className="font-mono text-[#0071e3] dark:text-[#2997ff] font-medium">{supportEmail}</span>
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: DMCA & COPYRIGHT */}
          {/* ========================================================= */}
          {activeTab === 'dmca' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] rounded-2xl flex items-start gap-3">
                <Copyright className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff] shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {isEn ? 'DMCA Notice & Digital Copyright Protection' : 'Pemberitahuan DMCA & Perlindungan Hak Cipta'}
                  </p>
                  <p className="text-slate-600 dark:text-[#86868b] mt-0.5">
                    {isEn
                      ? 'Savey strictly respects intellectual property laws (17 U.S.C. § 512). We provide swift URL blacklisting for content creators and copyright owners.'
                      : 'Savey sangat menghormati hak cipta kreator (17 U.S.C. § 512). Kami menyediakan pemblokiran tautan instan untuk pemilik hak cipta.'}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-2">
                <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                  {isEn ? 'Non-Hosting Intermediary Tool Architecture' : 'Arsitektur Perantara Tanpa Penyimpanan File'}
                </h4>
                <p>
                  {isEn
                    ? 'Savey operates strictly as an intermediary proxy client and does NOT host, upload, or store any video, audio, or media files on its servers. All media streamed through Savey originates directly from the respective public CDN nodes of the original hosting platforms (TikTok, Instagram, X/Twitter, Threads, Facebook).'
                    : 'Savey beroperasi murni sebagai klien perantara dan TIDAK mengunggah, menyimpan, atau meng-host file media apa pun di servernya. Seluruh media yang diunduh dialirkan langsung dari server CDN publik milik platform sumber aslinya.'}
                </p>
                <p>
                  {isEn
                    ? 'Therefore, the primary location of the content resides on the host platform. Removing the video from the host platform automatically renders it inaccessible via Savey.'
                    : 'Oleh karena itu, berkas asli berada di platform sumber. Menghapus video dari platform sumber secara otomatis membuat video tersebut tidak dapat diakses melalui Savey.'}
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-3">
                <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
                  {isEn ? 'Content Creator URL Blacklisting & Takedown Request' : 'Prosedur Pemblokiran Tautan & Penurunan Konten'}
                </h4>
                <p>
                  {isEn
                    ? 'If you are a verified copyright owner or authorized representative and wish to blacklist your content, profile handle, or channel URLs from ever being processed through Savey, please submit a notice to our Designated Copyright Agent containing:'
                    : 'Jika Anda adalah pemilik hak cipta dan ingin memblokir tautan akun atau video Anda agar tidak dapat diproses melalui Savey, silakan kirimkan permohonan yang memuat:'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[12px]">
                  <li>{isEn ? 'Identification of the copyrighted work claimed to have been infringed.' : 'Identifikasi karya berhak cipta yang diklaim.'}</li>
                  <li>{isEn ? 'Specific URL(s) or creator handle(s) to be permanently blacklisted.' : 'Tautan (URL) atau akun kreator spesifik yang ingin diblokir permanen.'}</li>
                  <li>{isEn ? 'Sufficient information allowing us to verify ownership (official creator channel, email domain).' : 'Informasi yang memadai untuk memverifikasi kepemilikan Anda.'}</li>
                  <li>{isEn ? 'A statement of good faith belief that the use is not authorized by the copyright owner.' : 'Pernyataan itikad baik bahwa materi tersebut tidak diizinkan.'}</li>
                  <li>{isEn ? 'Physical or electronic signature of the authorized representative.' : 'Tanda tangan elektronik atau fisik dari perwakilan yang berwenang.'}</li>
                </ul>

                <div className="mt-2 p-3.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[12px]">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                    <Mail className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
                    <span>{supportEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2c2e] dark:hover:bg-[#3a3a3c] text-slate-800 dark:text-white rounded-lg flex items-center gap-1.5 text-[11px] font-sans font-medium transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{isEn ? 'Copied' : 'Tersalin'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Copy Email' : 'Salin Email'}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${supportEmail}?subject=Savey%20DMCA%20Takedown%20Request`}
                      className="px-3 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg text-[11px] font-sans font-semibold transition-colors inline-flex items-center gap-1 shadow-sm"
                    >
                      <span>{isEn ? 'Send Notice' : 'Kirim Laporan'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#6e6e73]">
                  {isEn
                    ? 'Verified takedown notices are processed and URLs blacklisted within 24–48 business hours.'
                    : 'Permintaan pemblokiran terverifikasi diproses dalam waktu 24–48 jam kerja.'}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: CONTACT & PUBLISHER (circlemesh.site) */}
          {/* ========================================================= */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-100 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] rounded-2xl flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff] shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {isEn ? 'Publisher Information & Official Support' : 'Informasi Penerbit & Dukungan Resmi'}
                  </p>
                  <p className="text-slate-600 dark:text-[#86868b] mt-0.5">
                    {isEn
                      ? 'Savey is operated and maintained under circlemesh.site. For technical support, partnerships, privacy inquiries, and AdSense compliance, please reach out via our primary channel below.'
                      : 'Savey dioperasikan dan dikembangkan di bawah domain circlemesh.site. Untuk bantuan teknis, kemitraan, pertanyaan privasi, dan kepatuhan AdSense, silakan hubungi kontak resmi kami.'}
                  </p>
                </div>
              </div>

              {/* Direct Card */}
              <div className="p-5 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/[0.06] rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-[#86868b] uppercase tracking-wider">
                      {isEn ? 'Official Support & Inquiries Desk' : 'Pusat Bantuan & Layanan Resmi'}
                    </p>
                    <p className="text-[16px] font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                      {supportEmail}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2 bg-white dark:bg-[#2c2c2e] border border-slate-200 dark:border-white/10 hover:border-slate-300 rounded-xl text-[12px] font-medium text-slate-800 dark:text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>{isEn ? 'Copied to Clipboard' : 'Berhasil Disalin'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>{isEn ? 'Copy Email' : 'Salin Email'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
                  <div className="p-3 bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">{isEn ? 'Response SLA' : 'Waktu Tanggap'}</p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5">
                      {isEn ? '24–48 Business Hours' : '24–48 Jam Kerja'}
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">{isEn ? 'Domain' : 'Domain Situs'}</p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5 font-mono">
                      circlemesh.site
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl">
                    <p className="font-semibold text-slate-900 dark:text-white">{isEn ? 'Subject Categories' : 'Kategori Layanan'}</p>
                    <p className="text-slate-500 dark:text-[#86868b] text-[11px] mt-0.5">
                      {isEn ? 'Privacy, DMCA, AdSense, Bugs' : 'Privasi, DMCA, AdSense, Bantuan'}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${supportEmail}?subject=Savey%20Inquiry%20-%20circlemesh.site`}
                    className="w-full py-3 px-4 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-xl text-[13px] flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0071e3]/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isEn ? 'Launch Email Client' : 'Kirim Email Sekarang'}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-[#121214]/50">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#6e6e73]">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {isEn
                ? 'Effective Date: October 2026 · Hosted on circlemesh.site'
                : 'Tanggal Berlaku: Oktober 2026 · circlemesh.site'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="text-[12px] font-mono text-[#0071e3] dark:text-[#2997ff] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>{supportEmail}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white active:scale-98 text-[12px] sm:text-[13px] font-semibold rounded-full transition-all cursor-pointer shadow-md shadow-[#0071e3]/20"
            >
              {t.legal.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
