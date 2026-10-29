import React, { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  format?: 'horizontal' | 'in-article' | 'banner';
  className?: string;
  slot?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'horizontal',
  className = '',
  slot = '1234567890'
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.warn('AdSense notice:', e);
      setIsBlocked(true);
    }
  }, []);

  const formatStyles = {
    horizontal: 'min-h-[90px] max-w-4xl',
    'in-article': 'min-h-[120px] max-w-xl',
    banner: 'min-h-[60px] max-w-md'
  };

  return (
    <div
      className={`w-full mx-auto my-4 overflow-hidden rounded-2xl flex flex-col items-center justify-center transition-all ${formatStyles[format]} ${className}`}
    >
      <div className="w-full flex items-center justify-center">
        {/* Real Google AdSense Unit */}
        <ins
          ref={adRef}
          className="adsbygoogle block w-full text-center"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2314567164260959"
          data-ad-slot={slot}
          data-ad-format={format === 'in-article' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>

      {/* Graceful placeholder shown when AdSense is awaiting approval or ad is loading */}
      <div className="w-full py-2.5 px-4 rounded-xl bg-slate-50/80 dark:bg-[#161618]/70 border border-dashed border-slate-200 dark:border-white/10 text-center flex items-center justify-between gap-3 text-slate-400 dark:text-neutral-500 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-[9px] font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
            Sponsor
          </span>
          <span className="font-medium text-slate-600 dark:text-neutral-300">
            Ruang Iklan Google AdSense (pub-2314567164260959)
          </span>
        </div>
        <span className="text-[10px] hidden sm:inline">Iklan Aman &amp; Relevan</span>
      </div>
    </div>
  );
};
