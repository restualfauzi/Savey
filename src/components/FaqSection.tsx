import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export const FaqSection: React.FC = () => {
  const { t } = useThemeLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-[13px] font-semibold text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-2">
          {t.faq.kicker}
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
          {t.faq.title}
        </h2>
        <p className="text-[15px] sm:text-[17px] text-slate-600 dark:text-[#86868b] mt-3">
          {t.faq.subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {t.faq.items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-100/60 dark:hover:bg-white/[0.02] cursor-pointer"
              >
                <span className="text-[15px] sm:text-[16px] font-semibold text-slate-900 dark:text-white">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-[#86868b] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#0071e3] dark:text-[#2997ff]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-[13px] sm:text-[14px] text-slate-600 dark:text-[#86868b] leading-relaxed border-t border-slate-200 dark:border-white/[0.06]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
