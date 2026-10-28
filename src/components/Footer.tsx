import React from 'react';
import { ArrowDownToLine, ShieldCheck, Globe, Mail } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { LegalTab } from './LegalModal';
import { PlatformIcon } from './SocialIcons';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenPwaGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenPwaGuide }) => {
  const { t, language, setIsLanguageModalOpen } = useThemeLanguage();
  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#000000] text-slate-600 dark:text-[#86868b] text-[11px] pt-10 pb-24 sm:pb-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Footnotes */}
        <div className="space-y-2 pb-6 sm:pb-8 border-b border-slate-200 dark:border-white/[0.08] leading-relaxed text-slate-500 dark:text-[#6e6e73]">
          <p>{t.footer.note1}</p>
          <p>{t.footer.note2}</p>
          <p>{t.footer.note3}</p>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-10">
          <div>
            <h4 className="text-[12px] font-bold text-slate-900 dark:text-[#f5f5f7] mb-3">
              {t.footer.colPlatforms}
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-[#86868b]">
              <li><a href="#downloader" className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"><PlatformIcon platform="tiktok" size={13} colored /><span>TikTok No Watermark</span></a></li>
              <li><a href="#downloader" className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"><PlatformIcon platform="instagram" size={13} colored /><span>Instagram Reels &amp; Stories</span></a></li>
              <li><a href="#downloader" className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"><PlatformIcon platform="x" size={13} colored /><span>X (Twitter) HD Video</span></a></li>
              <li><a href="#downloader" className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"><PlatformIcon platform="threads" size={13} colored /><span>Threads Media Meta</span></a></li>
              <li><a href="#downloader" className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"><PlatformIcon platform="facebook" size={13} colored /><span>Facebook Watch &amp; Reels</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-slate-900 dark:text-[#f5f5f7] mb-3">
              {t.footer.colCapabilities}
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-[#86868b]">
              <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">1080p 60fps Master</a></li>
              <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Audio MP3 320kbps</a></li>
              <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cover Poster HD (JPG)</a></li>
              <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Zero-Loss Bitrate Stream</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-slate-900 dark:text-[#f5f5f7] mb-3">
              {t.footer.colGuide}
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-[#86868b]">
              <li><a href="#gallery-guide" className="hover:text-slate-900 dark:hover:text-white transition-colors">iPhone &amp; iPad Photos</a></li>
              <li><a href="#gallery-guide" className="hover:text-slate-900 dark:hover:text-white transition-colors">Android Gallery &amp; Photos</a></li>
              <li><a href="#gallery-guide" className="hover:text-slate-900 dark:hover:text-white transition-colors">Mac &amp; PC Downloads</a></li>
              <li>
                <button
                  onClick={onOpenPwaGuide}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.footer.pwaInstall}
                </button>
              </li>
              <li><a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ &amp; Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-slate-900 dark:text-[#f5f5f7] mb-3">
              {t.footer.colLegal}
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-[#86868b]">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.footer.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.footer.termsOfService}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('dmca')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.footer.dmcaNotice}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                  <span>{language === 'en' ? 'Contact & Support' : 'Kontak & Dukungan'}</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-[#0071e3] dark:text-[#2997ff] pt-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Data Retention</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[12px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center text-[8px]">
                <ArrowDownToLine className="w-2.5 h-2.5" />
              </span>
              Savey
            </span>
            <span>·</span>
            <p>Copyright © {new Date().getFullYear()} {t.footer.rightsReserved}</p>
            <span>·</span>
            <a
              href="mailto:support@circlemesh.site"
              className="text-[#0071e3] dark:text-[#2997ff] hover:underline font-mono inline-flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              support@circlemesh.site
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 dark:text-[#86868b]">
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.termsOfService}
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.privacyPolicy}
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('contact')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Support' : 'Bantuan'}
            </button>
            <span>·</span>
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              title="Change region / language"
            >
              <Globe className="w-3 h-3 text-[#0071e3] dark:text-[#2997ff]" />
              <span className="text-[13px] leading-none">{currentLangMeta.flag}</span>
              <span className="text-slate-900 dark:text-white">{currentLangMeta.nativeName}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
