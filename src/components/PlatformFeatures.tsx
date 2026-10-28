import React from 'react';
import {
  Check,
  Zap,
  ShieldCheck,
  Layers,
  ArrowRight,
  Wifi,
  HardDrive,
  Gauge,
  Sparkles,
  Sliders
} from 'lucide-react';
import { PLATFORMS } from '../utils/platforms';
import { PlatformType } from '../types';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { PlatformIcon } from './SocialIcons';

interface PlatformFeaturesProps {
  onSelectPlatform: (platform: PlatformType) => void;
  onOpenLegal: () => void;
  onOpenSettings?: () => void;
}

export const PlatformFeatures: React.FC<PlatformFeaturesProps> = ({
  onSelectPlatform,
  onOpenLegal,
  onOpenSettings,
}) => {
  const { t, language } = useThemeLanguage();
  const platformKeys: PlatformType[] = ['tiktok', 'instagram', 'x', 'threads', 'facebook'];

  return (
    <div className="space-y-16 sm:space-y-28 py-10 sm:py-16">
      {/* 3 Step Visual Guide: Apple Step Progression */}
      <section id="gallery-guide" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-[13px] font-semibold text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-2">
            {t.steps.kicker}
          </p>
          <h2 className="text-2xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
            {t.steps.title}
          </h2>
          <p className="text-[14px] sm:text-[17px] text-slate-600 dark:text-[#86868b] mt-3">
            {t.steps.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-white/[0.18] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[12px] font-mono text-slate-400 dark:text-[#86868b] mb-4 block font-bold">
                {t.steps.step1Num}
              </span>
              <h3 className="text-[18px] font-semibold text-slate-900 dark:text-white mb-2">
                {t.steps.step1Title}
              </h3>
              <p className="text-[14px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.steps.step1Desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-[12px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              {t.steps.step1Tag}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-white/[0.18] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[12px] font-mono text-slate-400 dark:text-[#86868b] mb-4 block font-bold">
                {t.steps.step2Num}
              </span>
              <h3 className="text-[18px] font-semibold text-slate-900 dark:text-white mb-2">
                {t.steps.step2Title}
              </h3>
              <p className="text-[14px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.steps.step2Desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-[12px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              {t.steps.step2Tag}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-white/[0.18] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[12px] font-mono text-slate-400 dark:text-[#86868b] mb-4 block font-bold">
                {t.steps.step3Num}
              </span>
              <h3 className="text-[18px] font-semibold text-slate-900 dark:text-white mb-2">
                {t.steps.step3Title}
              </h3>
              <p className="text-[14px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.steps.step3Desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-[12px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              {t.steps.step3Tag}
            </div>
          </div>
        </div>
      </section>

      {/* Apple Bento Grid: Platform Ecosystem */}
      <section id="platforms" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[13px] font-semibold text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-2">
            {t.platforms.kicker}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
            {t.platforms.title}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-600 dark:text-[#86868b] mt-3">
            {t.platforms.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformKeys.map((key) => {
            const p = PLATFORMS[key];
            return (
              <div
                key={key}
                className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-7 hover:border-slate-300 dark:hover:border-white/[0.18] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[17px] font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-white/10 shadow-xs border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                        <PlatformIcon platform={key} size={18} colored />
                      </div>
                      <span>{p.name}</span>
                    </span>
                    <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-[#86868b] bg-slate-200 dark:bg-[#2c2c2e] px-2.5 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  </div>

                  <p className="text-[13px] text-slate-600 dark:text-[#86868b] leading-relaxed mb-5">
                    {p.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-200 dark:border-white/[0.06] pt-4">
                    {p.supportedTypes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[12px] text-slate-800 dark:text-white">
                        <Check className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff] shrink-0 font-bold" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-[#6e6e73]">
                    Format: MP4 &amp; MP3
                  </span>
                  <button
                    onClick={() => onSelectPlatform(key)}
                    className="text-[12px] font-semibold text-[#0071e3] dark:text-[#2997ff] hover:text-[#0077ed] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.platforms.tryNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Privacy & Security Highlight Card */}
          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">
                {t.platforms.privacyCardTitle}
              </h3>
              <p className="text-[13px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.platforms.privacyCardDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-[#6e6e73]">
                {t.platforms.privacyCardTag}
              </span>
              <button
                onClick={onOpenLegal}
                className="text-[12px] font-semibold text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer"
              >
                {language === 'en' ? 'Details' : 'Selengkapnya'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section: Downloading Large High-Resolution Videos */}
      <section id="pro-tips" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[13px] font-semibold text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>{t.proTips.kicker}</span>
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
            {t.proTips.title}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-600 dark:text-[#86868b] mt-3">
            {t.proTips.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Tip 1: Wi-Fi */}
          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/[0.18] transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-[#2997ff]/15 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Wifi className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-[#86868b] bg-slate-200/80 dark:bg-[#2c2c2e] px-2.5 py-0.5 rounded-full">
                  {t.proTips.tip1Tag}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">
                {t.proTips.tip1Title}
              </h3>
              <p className="text-[13px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.proTips.tip1Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Fast 60fps throughput' : 'Kecepatan stream 60fps'}</span>
            </div>
          </div>

          {/* Tip 2: Keep Browser Active */}
          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/[0.18] transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-[#2997ff]/15 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Gauge className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-[#86868b] bg-slate-200/80 dark:bg-[#2c2c2e] px-2.5 py-0.5 rounded-full">
                  {t.proTips.tip2Tag}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">
                {t.proTips.tip2Title}
              </h3>
              <p className="text-[13px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.proTips.tip2Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Prevents mobile tab sleep' : 'Cegah tab tertidur'}</span>
            </div>
          </div>

          {/* Tip 3: Device Storage Headspace */}
          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/[0.18] transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-[#2997ff]/15 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center transition-transform group-hover:scale-105">
                  <HardDrive className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-[#86868b] bg-slate-200/80 dark:bg-[#2c2c2e] px-2.5 py-0.5 rounded-full">
                  {t.proTips.tip3Tag}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">
                {t.proTips.tip3Title}
              </h3>
              <p className="text-[13px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.proTips.tip3Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Buffer before gallery write' : 'Buffer sebelum rekam galeri'}</span>
            </div>
          </div>

          {/* Tip 4: Batch Downloads */}
          <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/[0.18] transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-[#2997ff]/15 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-[#86868b] bg-slate-200/80 dark:bg-[#2c2c2e] px-2.5 py-0.5 rounded-full">
                  {t.proTips.tip4Tag}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">
                {t.proTips.tip4Title}
              </h3>
              <p className="text-[13px] text-slate-600 dark:text-[#86868b] leading-relaxed">
                {t.proTips.tip4Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#0071e3] dark:text-[#2997ff] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Optimal queue: 5-10 items' : 'Antrean optimal: 5-10 item'}</span>
            </div>
          </div>
        </div>

        {/* Pro Tip Banner / Action Strip */}
        <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/50 dark:from-[#161618] dark:via-[#1c1c1e] dark:to-[#161618] border border-blue-200/60 dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#0071e3] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-slate-900 dark:text-white">
                {t.proTips.bannerTitle}
              </h4>
              <p className="text-[13px] text-slate-600 dark:text-[#86868b] mt-0.5">
                {t.proTips.bannerDesc}
              </p>
            </div>
          </div>
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-[#0071e3] dark:text-[#2997ff] bg-white dark:bg-[#2c2c2e] hover:bg-slate-100 dark:hover:bg-[#3a3a3c] border border-slate-200 dark:border-white/[0.1] rounded-full transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <span>{language === 'en' ? 'Open Settings' : 'Buka Pengaturan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Apple-style Tech Specs Comparison */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[13px] font-semibold text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-2">
                {t.specs.kicker}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 [text-wrap:balance]">
                {t.specs.title}
              </h2>
              <p className="text-[15px] text-slate-600 dark:text-[#86868b] leading-relaxed mb-8">
                {t.specs.subtitle}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 font-bold" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-slate-900 dark:text-white">{t.specs.feat1Title}</h4>
                    <p className="text-[13px] text-slate-600 dark:text-[#86868b] mt-0.5">{t.specs.feat1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 font-bold" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-slate-900 dark:text-white">{t.specs.feat2Title}</h4>
                    <p className="text-[13px] text-slate-600 dark:text-[#86868b] mt-0.5">{t.specs.feat2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-3 h-3 font-bold" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-slate-900 dark:text-white">{t.specs.feat3Title}</h4>
                    <p className="text-[13px] text-slate-600 dark:text-[#86868b] mt-0.5">{t.specs.feat3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Sheet Table */}
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                <span className="text-[14px] font-bold text-slate-900 dark:text-white">{t.specs.tableTitle}</span>
                <span className="text-[12px] font-mono font-semibold text-[#0071e3] dark:text-[#2997ff]">{t.specs.tableSubtitle}</span>
              </div>

              <div className="space-y-3.5 text-[13px]">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-600 dark:text-[#86868b] font-medium">{t.specs.row1Label}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{t.specs.row1Val}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-600 dark:text-[#86868b] font-medium">{t.specs.row2Label}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{t.specs.row2Val}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-600 dark:text-[#86868b] font-medium">{t.specs.row3Label}</span>
                  <span className="text-[#0071e3] dark:text-[#2997ff] font-semibold">{t.specs.row3Val}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-600 dark:text-[#86868b] font-medium">{t.specs.row4Label}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{t.specs.row4Val}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600 dark:text-[#86868b] font-medium">{t.specs.row5Label}</span>
                  <span className="text-[#0071e3] dark:text-[#2997ff] font-semibold">{t.specs.row5Val}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
