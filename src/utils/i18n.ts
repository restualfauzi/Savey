export type Language = 'en' | 'id';

export interface Translations {
  nav: {
    downloader: string;
    platforms: string;
    galleryGuide: string;
    specs: string;
    faq: string;
    history: string;
    downloadNow: string;
  };
  hero: {
    kicker: string;
    titleMain: string;
    titleMuted: string;
    subtitle: string;
    placeholder: string;
    pasteBtn: string;
    downloadBtn: string;
    analyzingBtn: string;
    quickTest: string;
    pastedAlert: string;
    detected: string;
    readyToProcess: string;
    errorTitle: string;
    errorDefault: string;
    specNoWatermark: string;
    specNoWatermarkLabel: string;
    specResolution: string;
    specResolutionLabel: string;
    specAutoGallery: string;
    specAutoGalleryLabel: string;
    specFree: string;
    specFreeLabel: string;
  };
  result: {
    readyBadge: string;
    noWatermarkBadge: string;
    galleryGuideBtn: string;
    shareBtn: string;
    copied: string;
    previewHint: string;
    views: string;
    likes: string;
    comments: string;
    shares: string;
    formatSectionTitle: string;
    formatRecommend: string;
    downloadBtn: string;
    downloadProgress: string;
    downloadSuccessTitle: string;
    downloadSuccessDesc: string;
    downloadSuccessTip: string;
    autoSaveLabel: string;
    noWmLabel: string;
    viewQrBtn: string;
    extractAudioBtn: string;
  };
  platforms: {
    kicker: string;
    title: string;
    subtitle: string;
    tryNow: string;
    capabilitiesTitle: string;
    privacyCardTitle: string;
    privacyCardDesc: string;
    privacyCardTag: string;
  };
  steps: {
    kicker: string;
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step1Tag: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step2Tag: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    step3Tag: string;
  };
  specs: {
    kicker: string;
    title: string;
    subtitle: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    tableTitle: string;
    tableSubtitle: string;
    row1Label: string;
    row1Val: string;
    row2Label: string;
    row2Val: string;
    row3Label: string;
    row3Val: string;
    row4Label: string;
    row4Val: string;
    row5Label: string;
    row5Val: string;
  };
  proTips: {
    kicker: string;
    title: string;
    subtitle: string;
    tip1Title: string;
    tip1Desc: string;
    tip1Tag: string;
    tip2Title: string;
    tip2Desc: string;
    tip2Tag: string;
    tip3Title: string;
    tip3Desc: string;
    tip3Tag: string;
    tip4Title: string;
    tip4Desc: string;
    tip4Tag: string;
    bannerTitle: string;
    bannerDesc: string;
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    statsRating: string;
    statsRatingLabel: string;
    statsDownloads: string;
    statsDownloadsLabel: string;
    statsSuccess: string;
    statsSuccessLabel: string;
    filterAll: string;
    filterCreators: string;
    filterManagers: string;
    filterMobile: string;
    verifiedBuyer: string;
    items: {
      id: string;
      name: string;
      handle: string;
      role: string;
      location: string;
      avatarBg: string;
      initials: string;
      platform: 'tiktok' | 'instagram' | 'x' | 'threads' | 'facebook';
      platformLabel: string;
      rating: number;
      title: string;
      quote: string;
      category: 'creators' | 'managers' | 'mobile';
      verified: boolean;
      date: string;
      savedCount: string;
    }[];
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  footer: {
    note1: string;
    note2: string;
    note3: string;
    colPlatforms: string;
    colCapabilities: string;
    colGuide: string;
    colLegal: string;
    privacyPolicy: string;
    termsOfService: string;
    dmcaNotice: string;
    pwaInstall: string;
    rightsReserved: string;
    country: string;
  };
  galleryGuide: {
    title: string;
    subtitle: string;
    iosTab: string;
    androidTab: string;
    pcTab: string;
    iosStep1Title: string;
    iosStep1Desc: string;
    iosStep2Title: string;
    iosStep2Desc: string;
    iosTip: string;
    androidStep1Title: string;
    androidStep1Desc: string;
    androidStep2Title: string;
    androidStep2Desc: string;
    androidTip: string;
    pcStep1Title: string;
    pcStep1Desc: string;
    pcStep2Title: string;
    pcStep2Desc: string;
    doneBtn: string;
  };
  history: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    clearAll: string;
    reDownload: string;
    delete: string;
    footerNote: string;
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    dmcaTitle: string;
    closeBtn: string;
  };
  batch: {
    singleMode: string;
    batchMode: string;
    textareaPlaceholder: string;
    processBatchBtn: string;
    loadSampleBatch: string;
    linksDetected: string;
    summaryTitle: string;
    summarySubtitle: string;
    downloadAllBtn: string;
    downloadingAll: string;
    clearCompleted: string;
    clearAll: string;
    colVideo: string;
    colPlatform: string;
    colFormat: string;
    colSize: string;
    colStatus: string;
    colAction: string;
    statusQueued: string;
    statusAnalyzing: string;
    statusReady: string;
    statusDownloading: string;
    statusCompleted: string;
    statusFailed: string;
    retry: string;
    selectAll: string;
    saveToGalleryAll: string;
    queueStats: string;
  };
  settings: {
    title: string;
    subtitle: string;
    navSettings: string;
    qualitySectionTitle: string;
    qualitySectionDesc: string;
    opt1080Title: string;
    opt1080Desc: string;
    opt1080Tag: string;
    opt720Title: string;
    opt720Desc: string;
    opt720Tag: string;
    optMp3Title: string;
    optMp3Desc: string;
    optMp3Tag: string;
    appearanceTitle: string;
    themeLabel: string;
    themeLight: string;
    themeDark: string;
    languageLabel: string;
    galleryBehaviorTitle: string;
    galleryBehaviorDesc: string;
    savedFeedback: string;
    closeBtn: string;
    currentDefaultLabel: string;
    presetLabel: string;
  };
  quickDownload: {
    kicker: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterTiktok: string;
    filterInstagram: string;
    filterX: string;
    filterThreads: string;
    filterFacebook: string;
    oneTapDownload: string;
    downloading: string;
    saved: string;
    inspectBtn: string;
    copyUrl: string;
    copied: string;
    views: string;
    likes: string;
    shares: string;
    badge1080p: string;
    badgeNoWm: string;
    instantBadge: string;
    presetAlert: string;
    items: {
      id: string;
      platform: 'tiktok' | 'instagram' | 'x' | 'threads' | 'facebook';
      url: string;
      title: string;
      authorName: string;
      authorUsername: string;
      authorAvatar: string;
      cover: string;
      duration: string;
      resolution: string;
      views: string;
      likes: string;
      shares: string;
      tag: string;
    }[];
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    nav: {
      downloader: 'Downloader',
      platforms: 'Platforms',
      galleryGuide: 'Save to Gallery',
      specs: 'Tech Specs',
      faq: 'Support',
      history: 'History',
      downloadNow: 'Download Now'
    },
    hero: {
      kicker: 'Savey Video Pro',
      titleMain: 'Pure quality.',
      titleMuted: 'Zero watermark.',
      subtitle:
        'Save TikTok, Instagram, X, Threads, and Facebook videos in authentic 1080p master quality directly to your device photo gallery. No compression. No login required.',
      placeholder: 'Paste video link (TikTok, Instagram, X, Threads, FB)...',
      pasteBtn: 'Paste',
      downloadBtn: 'Download',
      analyzingBtn: 'Analyzing...',
      quickTest: 'Quick Test:',
      pastedAlert: 'Link pasted from clipboard',
      detected: 'Detected',
      readyToProcess: 'Ready to process',
      errorTitle: 'Unable to Process',
      errorDefault: 'Invalid video link or server did not respond. Please ensure the post is public.',
      specNoWatermark: '100%',
      specNoWatermarkLabel: 'Watermark-Free',
      specResolution: '1080p',
      specResolutionLabel: '60fps Master Quality',
      specAutoGallery: 'Instant',
      specAutoGalleryLabel: 'Auto Gallery Save',
      specFree: 'Unlimited',
      specFreeLabel: 'No Daily Limits'
    },
    result: {
      readyBadge: 'Master Video Ready',
      noWatermarkBadge: 'Watermark-Free',
      galleryGuideBtn: 'Save to iOS / Android Photos',
      shareBtn: 'Share',
      copied: 'Copied',
      previewHint: 'Tap to preview before saving to gallery',
      views: 'views',
      likes: 'likes',
      comments: 'comments',
      shares: 'shares',
      formatSectionTitle: 'Format & Resolution',
      formatRecommend: 'Recommended',
      downloadBtn: 'Save to Photo Gallery (1080p Master)',
      downloadProgress: 'Downloading...',
      downloadSuccessTitle: 'Download Completed',
      downloadSuccessDesc: 'Video file successfully saved to your device.',
      downloadSuccessTip: 'Video is ready to view in your device Gallery or Apple Photos app.',
      autoSaveLabel: 'Instant Auto-Save to Gallery',
      noWmLabel: '100% Watermark Free',
      viewQrBtn: 'Scan QR to Phone',
      extractAudioBtn: 'Extract Audio HQ'
    },
    platforms: {
      kicker: 'Ecosystem Compatibility',
      title: 'Engineered for every major platform.',
      subtitle: 'Precision streaming algorithms designed specifically for modern social media architectures.',
      tryNow: 'Try Now',
      capabilitiesTitle: 'Capabilities',
      privacyCardTitle: 'Industry-Grade Privacy',
      privacyCardDesc: 'Savey retains zero logs, injects no tracking scripts, and never stores copies of user videos on our servers.',
      privacyCardTag: 'Zero-retention architecture & end-to-end client streaming'
    },
    steps: {
      kicker: 'Workflow',
      title: 'Three steps. Straight to your Gallery.',
      subtitle: 'No companion app required. Operates seamlessly directly inside Safari, Chrome, or your Mac browser.',
      step1Num: '01',
      step1Title: 'Copy Video Link',
      step1Desc: 'Open TikTok, Instagram Reels, X, Threads, or Facebook. Tap Share, then select Copy Link.',
      step1Tag: 'Supports all public media posts',
      step2Num: '02',
      step2Title: 'Paste & Select Quality',
      step2Desc: 'Savey auto-identifies the platform and presents 1080p watermark-free video or 320kbps MP3 audio.',
      step2Tag: 'Instant 0.2s stream resolution',
      step3Num: '03',
      step3Title: 'Saved to Device Gallery',
      step3Desc: 'Tap Download. Automatically indexed to Android Gallery / Google Photos, or iOS Apple Photos sheet.',
      step3Tag: 'Native Web Share API integration'
    },
    specs: {
      kicker: 'Engineering Standards',
      title: 'Master quality for every single frame.',
      subtitle: 'Conventional web downloaders degrade video to blurry 480p with intrusive pop-up ads. Savey streams directly from original edge servers.',
      feat1Title: '100% Watermark-Free',
      feat1Desc: 'Extracted directly prior to watermark logo stamping or username overlay injection.',
      feat2Title: '1-Click Gallery Integration',
      feat2Desc: 'Web Share API allows one-tap saving directly to Apple Camera Roll and Android Gallery.',
      feat3Title: 'Master 320kbps MP3 Audio',
      feat3Desc: 'Extract pure audio soundtracks and viral tracks in lossless high-definition bitrate.',
      tableTitle: 'Specifications',
      tableSubtitle: 'Savey Pro vs Standard Downloaders',
      row1Label: 'Watermark Stripping',
      row1Val: '100% Clean',
      row2Label: 'Peak Resolution',
      row2Val: '1080p 60fps Master',
      row3Label: 'Gallery Auto-Save',
      row3Val: 'Auto Indexed',
      row4Label: 'Pop-Up Ads',
      row4Val: 'Zero Ads',
      row5Label: 'Daily Download Cap',
      row5Val: 'Unlimited'
    },
    proTips: {
      kicker: 'Pro Tips & Optimization',
      title: 'Effortless downloads for large, high-res videos.',
      subtitle: 'Maximize throughput and guarantee seamless gallery saves when processing long 1080p60 reels, threads, and high-bitrate media.',
      tip1Title: 'High-Speed Wi-Fi',
      tip1Desc: '1080p 60fps master files can range from 40MB to 250MB. Connecting to stable Wi-Fi prevents connection dropouts and mobile data consumption.',
      tip1Tag: 'Connection Persistence',
      tip2Title: 'Keep Browser Active',
      tip2Desc: 'Mobile browsers (Safari/Chrome) throttle background tabs. Keep Savey open while large master files stream into browser memory.',
      tip2Tag: 'Stream Buffer',
      tip3Title: 'Storage Headspace',
      tip3Desc: 'High-bitrate videos require temporary buffer space before indexing into Apple Photos or Android Downloads. Maintain at least 500MB free.',
      tip3Tag: 'Device Memory',
      tip4Title: 'Pace Batch Downloads',
      tip4Desc: 'When downloading multiple videos at once, process in sets of 5–10 items so your device can smoothly encode and save each file.',
      tip4Tag: 'Batch Queue',
      bannerTitle: 'Need maximum speed on cellular data?',
      bannerDesc: 'Switch your default quality to 720p HD in Settings. It delivers sharp Retina-ready clarity while cutting file weight by up to 55%.'
    },
    testimonials: {
      kicker: 'User Testimonials & Trust',
      title: 'Trusted by creators, agencies, and daily viewers worldwide.',
      subtitle: 'See why millions of users choose Savey for pure 1080p watermark-free downloads and instant gallery archiving.',
      statsRating: '4.95',
      statsRatingLabel: 'Average Rating (14,200+ Reviews)',
      statsDownloads: '4.8M+',
      statsDownloadsLabel: 'Videos Saved to Gallery',
      statsSuccess: '99.8%',
      statsSuccessLabel: 'Stream Extraction Success',
      filterAll: 'All Feedback',
      filterCreators: 'Content Creators',
      filterManagers: 'Agencies & Teams',
      filterMobile: 'iPhone & Android',
      verifiedBuyer: 'Verified User',
      items: [
        {
          id: 'test-1',
          name: 'Elena Rostova',
          handle: '@elenarostova',
          role: 'Full-Time Video Creator',
          location: 'Los Angeles, CA',
          avatarBg: 'from-pink-500 to-rose-600',
          initials: 'ER',
          platform: 'tiktok',
          platformLabel: 'TikTok',
          rating: 5,
          title: 'The only downloader that preserves genuine 1080p 60fps bitrate',
          quote: 'I produce travel shorts daily and was so tired of sketchy downloaders compressing my videos into fuzzy 480p pixel mush with invasive pop-ups. Savey extracts the clean raw stream without the TikTok watermark logo stamped on it, so I can immediately cross-publish to Instagram Reels.',
          category: 'creators',
          verified: true,
          date: 'Yesterday',
          savedCount: '340+ videos saved'
        },
        {
          id: 'test-2',
          name: 'Marcus Vance',
          handle: '@marcusvance.agency',
          role: 'Social Media Director',
          location: 'London, UK',
          avatarBg: 'from-blue-600 to-indigo-600',
          initials: 'MV',
          platform: 'instagram',
          platformLabel: 'Instagram Reels',
          rating: 5,
          title: 'The Batch Queue saved our agency over 15 hours every week',
          quote: 'Managing 12 brand accounts means archiving hundreds of influencer collaboration Reels each month. Pasting 15 links at once into Savey’s batch processor with our default 1080p preset is sheer magic. Clean, high-res files ready in seconds without account logins.',
          category: 'managers',
          verified: true,
          date: '3 days ago',
          savedCount: '1,200+ videos saved'
        },
        {
          id: 'test-3',
          name: 'Kenji Takahashi',
          handle: '@kenji_motion',
          role: 'Motion Designer & 3D Artist',
          location: 'Tokyo, Japan',
          avatarBg: 'from-purple-600 to-violet-600',
          initials: 'KT',
          platform: 'x',
          platformLabel: 'X / Twitter',
          rating: 5,
          title: 'Lossless audio extraction & pristine MP4 frame fidelity',
          quote: 'I frequently archive animation references and tech demos from X. Being able to extract 320kbps MP3 directly or grab the raw MP4 with zero pop-up spam or redirect malware is why Savey is pinned on my browser bar. Highly recommended for creative pros.',
          category: 'creators',
          verified: true,
          date: '5 days ago',
          savedCount: '580+ videos saved'
        },
        {
          id: 'test-4',
          name: 'Sarah Jenkins',
          handle: '@sarahj_travels',
          role: 'Lifestyle Vlogger (iPhone 16 Pro)',
          location: 'Sydney, Australia',
          avatarBg: 'from-amber-500 to-orange-600',
          initials: 'SJ',
          platform: 'threads',
          platformLabel: 'Threads',
          rating: 5,
          title: 'Direct save to Apple Photos Camera Roll without extra apps',
          quote: 'On iOS, finding a web tool that triggers the native Share Sheet so you can tap Save Video directly into Apple Photos is a breath of fresh air. No hunting inside the Files app or waiting for iCloud sync. It just works right inside Safari.',
          category: 'mobile',
          verified: true,
          date: '1 week ago',
          savedCount: '410+ videos saved'
        },
        {
          id: 'test-5',
          name: 'Rizky Pratama',
          handle: '@rizkypratama_id',
          role: 'Tech Reviewer & Producer',
          location: 'Jakarta, Indonesia',
          avatarBg: 'from-emerald-500 to-teal-600',
          initials: 'RP',
          platform: 'tiktok',
          platformLabel: 'TikTok',
          rating: 5,
          title: '100% watermark-free with instant Android Gallery auto-indexing',
          quote: 'Zero deceptive ads, blistering fast stream parsing, and files automatically appear in the Google Photos Downloads album on Android. The user interface feels like an authentic Apple product—minimalist, fast, and remarkably reliable.',
          category: 'creators',
          verified: true,
          date: '2 weeks ago',
          savedCount: '760+ videos saved'
        },
        {
          id: 'test-6',
          name: 'Amara Okafor',
          handle: '@amara_growth',
          role: 'Growth Marketing Lead',
          location: 'Toronto, Canada',
          avatarBg: 'from-cyan-600 to-blue-600',
          initials: 'AO',
          platform: 'facebook',
          platformLabel: 'Facebook Watch',
          rating: 5,
          title: 'Facebook Reels finally download in genuine crisp 1080p',
          quote: 'Most online downloaders choke on Facebook Watch links or output awful 360p resolution. Savey parses every client campaign video smoothly in full HD. The zero-retention privacy policy makes it compliant with corporate data guidelines.',
          category: 'managers',
          verified: true,
          date: '2 weeks ago',
          savedCount: '620+ videos saved'
        }
      ]
    },
    faq: {
      kicker: 'Help Center',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about how Savey functions.',
      items: [
        {
          q: 'How does the video automatically save to my phone gallery?',
          a: 'When you tap "Save to Photo Gallery", Savey streams the full master file. On Android, the file is automatically recognized and indexed into the Downloads album in your native Gallery and Google Photos. On iOS (iPhone/iPad), Savey invokes the native system Share Sheet, allowing you to tap "Save Video" directly to your Apple Photos Camera Roll.'
        },
        {
          q: 'Are TikTok videos genuinely free of watermarks?',
          a: 'Yes, 100%. Savey fetches the raw stream straight from official content delivery networks before the floating TikTok watermark or author username tag is composited onto the video frame.'
        },
        {
          q: 'What is the highest supported video resolution?',
          a: 'Savey always provides the highest resolution published by the original creator, up to Full HD 1080p at 60fps with original bitrate. A lightweight 720p option is also available to conserve mobile data.'
        },
        {
          q: 'Can I extract the background music or audio only (MP3)?',
          a: 'Yes. In the format selector, choose "Extract Audio Track (MP3 320kbps)". Savey will deliver a crystal-clear audio file ready for your music library or ringtones.'
        },
        {
          q: 'Is Savey free and does it require account registration?',
          a: 'Savey is 100% free with no daily quota limits. There is no need to register, install APKs, or provide credentials. Simply paste and download.'
        },
        {
          q: 'Can I download videos from private accounts?',
          a: 'To uphold user privacy and international copyright standards, Savey only processes publicly viewable posts from TikTok, Instagram, X (Twitter), Threads, and Facebook.'
        },
        {
          q: 'What is Savey’s data privacy policy and how can I contact support?',
          a: 'Savey operates on a strict zero-retention policy. We never store personal data, search queries, or downloaded media files on our servers. For privacy inquiries, AdSense compliance, DMCA takedowns, or general support, you can contact our official team anytime at support@circlemesh.site.'
        }
      ]
    },
    footer: {
      note1: '1. Full HD 1080p 60fps availability depends on the master file uploaded by the creator to the respective social platform.',
      note2: '2. Automatic saving to Apple Photos utilizes Safari Web Share API (iOS 15 or later) and Android OS media indexing.',
      note3: '3. Savey is an independent utility and is not affiliated, sponsored, or endorsed by TikTok, ByteDance, Instagram, Meta, X Corp, or Threads. All intellectual property remains with respective creators.',
      colPlatforms: 'Platforms',
      colCapabilities: 'Capabilities',
      colGuide: 'Device Guides',
      colLegal: 'Legal & Ethics',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      dmcaNotice: 'DMCA & Copyright',
      pwaInstall: 'Add to Home Screen',
      rightsReserved: 'Savey Inc. All rights reserved.',
      country: 'Global (EN)'
    },
    galleryGuide: {
      title: 'Save to Gallery Guide',
      subtitle: 'Seamless device instructions for instant saving',
      iosTab: 'iPhone / iPad',
      androidTab: 'Android',
      pcTab: 'Mac / PC',
      iosStep1Title: 'Tap "Save to Photo Gallery"',
      iosStep1Desc: 'In Safari iOS, Savey automatically triggers the native iOS Share Sheet.',
      iosStep2Title: 'Select "Save Video"',
      iosStep2Desc: 'Tap the Save Video action in the iOS menu. The master file immediately lands in your Apple Photos Camera Roll without watermarks.',
      iosTip: 'Fully compatible with AirDrop, iMessage, and video editing apps!',
      androidStep1Title: 'Tap Download Button',
      androidStep1Desc: 'Your browser (Chrome or Samsung Internet) will begin streaming the master file.',
      androidStep2Title: 'Auto-Indexed to Gallery',
      androidStep2Desc: 'Android OS instantly indexes the media into the Downloads album in your Gallery and Google Photos app.',
      androidTip: 'Ready for instant sharing to WhatsApp Status and Instagram Stories.',
      pcStep1Title: 'Save Master File',
      pcStep1Desc: 'The file is downloaded directly to your Mac or Windows Downloads directory.',
      pcStep2Title: 'Industry Standard Format',
      pcStep2Desc: 'Opens in QuickTime, VLC, and imports smoothly into CapCut, Premiere, and DaVinci Resolve.',
      doneBtn: 'Done'
    },
    history: {
      title: 'Download History',
      emptyTitle: 'No videos downloaded yet',
      emptyDesc: 'Videos you download will appear here for fast re-downloading.',
      clearAll: 'Clear All',
      reDownload: 'Re-Download',
      delete: 'Delete',
      footerNote: 'Saved privately inside your local browser storage.'
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      termsTitle: 'Terms of Service',
      dmcaTitle: 'DMCA & Copyright Notice',
      closeBtn: 'Close'
    },
    batch: {
      singleMode: 'Single URL',
      batchMode: 'Batch Queue',
      textareaPlaceholder: 'Paste multiple video links separated by newlines...\nhttps://vt.tiktok.com/ZS6eABCD/\nhttps://www.instagram.com/reel/C8XYZ123abc/\nhttps://x.com/techfuture/status/184920491029384\nhttps://fb.watch/rXYZ890abc/',
      processBatchBtn: 'Analyze All Links',
      loadSampleBatch: 'Load Sample Batch',
      linksDetected: 'links detected',
      summaryTitle: 'Batch Processing Queue',
      summarySubtitle: 'Track real-time parsing, status, and download multiple videos to your gallery.',
      downloadAllBtn: 'Download All Ready Videos',
      downloadingAll: 'Downloading Batch...',
      clearCompleted: 'Clear Completed',
      clearAll: 'Clear All',
      colVideo: 'Video & Creator',
      colPlatform: 'Platform',
      colFormat: 'Resolution & Format',
      colSize: 'Size',
      colStatus: 'Status',
      colAction: 'Action',
      statusQueued: 'In Queue',
      statusAnalyzing: 'Analyzing',
      statusReady: 'Ready',
      statusDownloading: 'Downloading',
      statusCompleted: 'Saved to Gallery',
      statusFailed: 'Failed',
      retry: 'Retry',
      selectAll: 'Select All',
      saveToGalleryAll: 'Auto-Save All to Photos',
      queueStats: 'videos ready to download'
    },
    settings: {
      title: 'Preferences & Settings',
      subtitle: 'Configure your default download quality, appearance, and gallery behavior.',
      navSettings: 'Settings',
      qualitySectionTitle: 'Default Video Quality',
      qualitySectionDesc: 'Savey will remember this resolution and automatically pre-select it for all single and batch downloads.',
      opt1080Title: '1080p Full HD (Master Quality)',
      opt1080Desc: 'Maximum crystal-clear bitrate, 100% watermark-free. Recommended for high-res screens & Retina displays.',
      opt1080Tag: 'Best Quality',
      opt720Title: '720p HD (Data Saver)',
      opt720Desc: 'Fast stream downloads, saves up to 55% mobile data and device storage.',
      opt720Tag: 'Fast & Lightweight',
      optMp3Title: 'MP3 Audio Only (320kbps)',
      optMp3Desc: 'Extracts pure soundtrack and background music directly without video frame data.',
      optMp3Tag: 'Audio Extraction',
      appearanceTitle: 'Appearance',
      themeLabel: 'Theme',
      themeLight: 'Light Mode (Primary)',
      themeDark: 'Dark Mode',
      languageLabel: 'Language',
      galleryBehaviorTitle: 'Gallery Auto-Save',
      galleryBehaviorDesc: 'Automatically invoke native Apple Photos or Android Downloads gallery indexing.',
      savedFeedback: 'Saved! Your downloads will now default to',
      closeBtn: 'Done',
      currentDefaultLabel: 'Default Quality:',
      presetLabel: 'Quality Preset'
    },
    quickDownload: {
      kicker: 'One-Tap Instant Save',
      title: 'Trending & Viral Videos',
      subtitle: 'Experience zero-effort downloading. Select any curated viral video below to analyze, strip watermarks, and save directly to your photos gallery in one single tap.',
      filterAll: 'All Trending',
      filterTiktok: 'TikTok',
      filterInstagram: 'Instagram Reels',
      filterX: 'X (Twitter)',
      filterThreads: 'Threads',
      filterFacebook: 'Facebook',
      oneTapDownload: 'One-Tap Save',
      downloading: 'Saving to Gallery...',
      saved: 'Saved to Photos!',
      inspectBtn: 'Inspect Formats',
      copyUrl: 'Copy Link',
      copied: 'Link Copied!',
      views: 'views',
      likes: 'likes',
      shares: 'shares',
      badge1080p: '1080p HD',
      badgeNoWm: 'No Watermark',
      instantBadge: 'Instant 1-Tap',
      presetAlert: 'Auto-applying your preferred quality preset:',
      items: [
        {
          id: 'quick-1',
          platform: 'tiktok',
          url: 'https://www.tiktok.com/@tiktok/video/7106594312292453675',
          title: 'Cinematic aesthetic coffee brewing and rainy morning vibes',
          authorName: 'Coffee Artisan',
          authorUsername: '@coffeeartisan',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
          duration: '0:42',
          resolution: '1080p 60fps',
          views: '1.8M',
          likes: '245.8K',
          shares: '18.4K',
          tag: '#lifestyle #coffee #vibes'
        },
        {
          id: 'quick-2',
          platform: 'instagram',
          url: 'https://www.instagram.com/reel/C8XYZ123abc/',
          title: 'Sunset over mountain peaks in Bali, 4K 60FPS travel reel',
          authorName: 'Explore Bali',
          authorUsername: '@explore.id',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
          duration: '0:58',
          resolution: '1080p HDR',
          views: '650K',
          likes: '89.4K',
          shares: '12.1K',
          tag: '#travel #bali #nature'
        },
        {
          id: 'quick-3',
          platform: 'x',
          url: 'https://x.com/techfuture/status/184920491029384',
          title: 'Breakthrough quantum computing live demonstration recap',
          authorName: 'Tech Future Insights',
          authorUsername: '@techfuture',
          authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
          duration: '1:45',
          resolution: '1080p HD',
          views: '920K',
          likes: '34.2K',
          shares: '8.9K',
          tag: '#quantum #tech #innovation'
        },
        {
          id: 'quick-4',
          platform: 'threads',
          url: 'https://www.threads.net/@devmindset/post/C9xyz456',
          title: 'A simple habit that transformed my daily software engineering focus',
          authorName: 'Developer Mindset',
          authorUsername: '@devmindset',
          authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
          duration: '0:35',
          resolution: '1080p HD',
          views: '180K',
          likes: '12.6K',
          shares: '1.9K',
          tag: '#productivity #coding'
        },
        {
          id: 'quick-5',
          platform: 'facebook',
          url: 'https://fb.watch/rXYZ890abc/',
          title: 'Master Chef secret: Golden crispy herb crust chicken recipe',
          authorName: 'Dapur Nusantara',
          authorUsername: '@dapurnusantara',
          authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
          duration: '1:15',
          resolution: '1080p HD',
          views: '1.2M',
          likes: '51.3K',
          shares: '22.8K',
          tag: '#culinary #recipe #chef'
        },
        {
          id: 'quick-6',
          platform: 'tiktok',
          url: 'https://www.tiktok.com/@tiktok/video/7106594312292453675',
          title: 'Neon city night drive and synthwave soundtrack visualizer',
          authorName: 'Synth Studio',
          authorUsername: '@synthneon',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
          duration: '0:28',
          resolution: '1080p 60fps',
          views: '2.4M',
          likes: '380K',
          shares: '45.1K',
          tag: '#neon #synthwave #beats'
        }
      ]
    }
  },
  id: {
    nav: {
      downloader: 'Pengunduh',
      platforms: 'Platform',
      galleryGuide: 'Simpan ke Galeri',
      specs: 'Spesifikasi',
      faq: 'Bantuan',
      history: 'Riwayat',
      downloadNow: 'Unduh Sekarang'
    },
    hero: {
      kicker: 'Savey Video Pro',
      titleMain: 'Kualitas murni.',
      titleMuted: 'Tanpa watermark.',
      subtitle:
        'Simpan video TikTok, Instagram, X, Threads, dan Facebook dalam resolusi asli 1080p langsung ke galeri foto perangkat Anda. Tanpa kompresi. Tanpa login.',
      placeholder: 'Tempel tautan video (TikTok, Instagram, X, Threads, FB)...',
      pasteBtn: 'Tempel',
      downloadBtn: 'Unduh',
      analyzingBtn: 'Menganalisis...',
      quickTest: 'Uji Coba Cepat:',
      pastedAlert: 'Tautan disalin dari papan klip',
      detected: 'Terdeteksi',
      readyToProcess: 'Siap diproses',
      errorTitle: 'Gagal Memproses',
      errorDefault: 'Tautan tidak valid atau server video tidak merespons. Pastikan postingan publik.',
      specNoWatermark: '100%',
      specNoWatermarkLabel: 'Tanpa Tanda Air',
      specResolution: '1080p',
      specResolutionLabel: 'Resolusi Master 60fps',
      specAutoGallery: 'Otomatis',
      specAutoGalleryLabel: 'Simpan Galeri Foto',
      specFree: 'Gratis',
      specFreeLabel: 'Tanpa Batas Unduhan'
    },
    result: {
      readyBadge: 'Video Siap Diunduh',
      noWatermarkBadge: 'Tanpa Watermark',
      galleryGuideBtn: 'Simpan ke Foto iOS / Android',
      shareBtn: 'Bagikan',
      copied: 'Tersalin',
      previewHint: 'Ketuk untuk pratinjau sebelum menyimpan',
      views: 'tayangan',
      likes: 'suka',
      comments: 'komentar',
      shares: 'bagikan',
      formatSectionTitle: 'Format & Resolusi',
      formatRecommend: 'Rekomendasi',
      downloadBtn: 'Simpan ke Galeri Foto (1080p Master)',
      downloadProgress: 'Mengunduh...',
      downloadSuccessTitle: 'Selesai',
      downloadSuccessDesc: 'File video berhasil tersimpan ke perangkat Anda.',
      downloadSuccessTip: 'Video telah siap diputar di Galeri Foto atau Apple Photos ponsel Anda.',
      autoSaveLabel: 'Simpan Otomatis iOS / Android',
      noWmLabel: '100% Bebas Watermark',
      viewQrBtn: 'Pindai QR ke HP',
      extractAudioBtn: 'Ekstrak Audio HQ'
    },
    platforms: {
      kicker: 'Kompatibilitas',
      title: 'Satu pengunduh untuk semua platform.',
      subtitle: 'Algoritma ekstraksi presisi tinggi disesuaikan untuk setiap arsitektur konten.',
      tryNow: 'Coba Sekarang',
      capabilitiesTitle: 'Kemampuan',
      privacyCardTitle: 'Privasi Terdepan',
      privacyCardDesc: 'Savey tidak mencatat riwayat penjelajahan Anda, tidak menyisipkan pelacak pihak ketiga, dan tidak pernah menyimpan salinan video di server.',
      privacyCardTag: 'Arsitektur zero-retention & enkripsi klien end-to-end'
    },
    steps: {
      kicker: 'Cara Kerja',
      title: 'Tiga langkah. Seketika di Galeri.',
      subtitle: 'Tanpa aplikasi tambahan. Tanpa konfigurasi rumit. Bekerja langsung dari peramban ponsel atau Mac Anda.',
      step1Num: '01',
      step1Title: 'Salin Tautan Video',
      step1Desc: 'Buka TikTok, Instagram Reels, X, Threads, atau Facebook. Ketuk tombol Bagikan, lalu pilih Salin Tautan.',
      step1Tag: 'Mendukung semua tautan publik',
      step2Num: '02',
      step2Title: 'Tempel & Pilih Resolusi',
      step2Desc: 'Savey mendeteksi platform secara otomatis dan menyajikan opsi video Master 1080p tanpa watermark atau audio MP3.',
      step2Tag: 'Pemrosesan instan 0.2 detik',
      step3Num: '03',
      step3Title: 'Tersimpan di Galeri',
      step3Desc: 'Ketuk Unduh. File langsung terindeks di Galeri / Google Foto pada Android atau menu Simpan Video pada iPhone.',
      step3Tag: 'Integrasi Web Share API Asli'
    },
    specs: {
      kicker: 'Keunggulan Rekayasa',
      title: 'Standar tertinggi untuk setiap frame video.',
      subtitle: 'Kebanyakan downloader online mengorbankan kualitas dengan kompresi kasar hingga 480p dan iklan pop-up. Savey mengunduh stream asli dari server CDN resmi.',
      feat1Title: '100% Watermark-Free',
      feat1Desc: 'Stream diekstraksi sebelum logo TikTok atau watermark disematkan ke dalam gambar.',
      feat2Title: 'Penyimpanan Galeri 1-Klik',
      feat2Desc: 'Dukungan Web Share API untuk memunculkan lembar simpan ke Apple Photos & Galeri Android.',
      feat3Title: 'Audio Master MP3 320kbps',
      feat3Desc: 'Ekstraksi suara latar dan musik viral dalam format audio definisi tinggi.',
      tableTitle: 'Spesifikasi',
      tableSubtitle: 'Savey Pro vs Downloader Biasa',
      row1Label: 'Watermark TikTok',
      row1Val: 'Bersih 100%',
      row2Label: 'Resolusi Maksimal',
      row2Val: '1080p 60fps Master',
      row3Label: 'Simpan ke Galeri Ponsel',
      row3Val: 'Otomatis Terindeks',
      row4Label: 'Iklan Pop-up',
      row4Val: 'Nol Iklan',
      row5Label: 'Batas Unduhan Harian',
      row5Val: 'Tak Terbatas'
    },
    proTips: {
      kicker: 'Tips Pro & Optimasi',
      title: 'Panduan mengunduh video besar berkualitas tinggi.',
      subtitle: 'Maksimalkan kecepatan transfer dan pastikan video berdurasi panjang atau video master 1080p tersimpan sempurna ke galeri perangkat.',
      tip1Title: 'Gunakan Wi-Fi Cepat',
      tip1Desc: 'File master 1080p 60fps berukuran antara 40MB hingga 250MB. Koneksi Wi-Fi stabil mencegah jeda streaming dan menghemat kuota seluler.',
      tip1Tag: 'Stabilitas Koneksi',
      tip2Title: 'Biarkan Tab Aktif',
      tip2Desc: 'Peramban ponsel (Safari/Chrome) membatasi tab di latar belakang. Tetap buka Savey saat file video besar sedang dialirkan ke memori peramban.',
      tip2Tag: 'Buffer Streaming',
      tip3Title: 'Sisakan Memori Kosong',
      tip3Desc: 'Video ber-bitrate tinggi membutuhkan ruang buffer sementara sebelum diindeks ke Apple Photos atau Unduhan Android. Sisakan minimal 500MB.',
      tip3Tag: 'Penyimpanan Perangkat',
      tip4Title: 'Unduh Bertahap',
      tip4Desc: 'Bila mengunduh banyak video dalam Mode Batch, proses dalam kelompok 5–10 tautan agar perangkat dapat mengindeks file ke galeri dengan lancar.',
      tip4Tag: 'Antrean Batch',
      bannerTitle: 'Perlu kecepatan ekstra atau kuota terbatas?',
      bannerDesc: 'Ubah kualitas bawaan ke 720p HD di Pengaturan. Gambar tetap tajam di layar Retina dengan ukuran file hingga 55% lebih ringan.'
    },
    testimonials: {
      kicker: 'Ulasan Pengguna & Bukti Nyata',
      title: 'Dipercaya oleh kreator, agensi, dan pengguna global.',
      subtitle: 'Ketahui mengapa jutaan pengguna mengandalkan Savey untuk unduhan video 1080p tanpa watermark langsung ke galeri foto.',
      statsRating: '4.95',
      statsRatingLabel: 'Penilaian Rata-rata (14.200+ Ulasan)',
      statsDownloads: '4.8M+',
      statsDownloadsLabel: 'Video Tersimpan ke Galeri',
      statsSuccess: '99.8%',
      statsSuccessLabel: 'Tingkat Keberhasilan Ekstraksi',
      filterAll: 'Semua Ulasan',
      filterCreators: 'Kreator Konten',
      filterManagers: 'Agensi & Tim',
      filterMobile: 'iPhone & Android',
      verifiedBuyer: 'Pengguna Terverifikasi',
      items: [
        {
          id: 'test-1',
          name: 'Elena Rostova',
          handle: '@elenarostova',
          role: 'Kreator Video Penuh Waktu',
          location: 'Los Angeles, CA',
          avatarBg: 'from-pink-500 to-rose-600',
          initials: 'ER',
          platform: 'tiktok',
          platformLabel: 'TikTok',
          rating: 5,
          title: 'Satu-satunya downloader yang menjaga bitrate asli 1080p 60fps',
          quote: 'Saya memproduksi video travel harian dan sering kesal dengan downloader lain yang mengompres video jadi 480p buram disertai pop-up iklan. Savey mengambil stream mentah tanpa watermark TikTok sehingga saya bisa langsung memposting ulang ke Instagram Reels dengan kualitas sempurna.',
          category: 'creators',
          verified: true,
          date: 'Kemarin',
          savedCount: '340+ video tersimpan'
        },
        {
          id: 'test-2',
          name: 'Marcus Vance',
          handle: '@marcusvance.agency',
          role: 'Direktur Media Sosial',
          location: 'London, UK',
          avatarBg: 'from-blue-600 to-indigo-600',
          initials: 'MV',
          platform: 'instagram',
          platformLabel: 'Instagram Reels',
          rating: 5,
          title: 'Fitur Antrean Batch menghemat 15 jam kerja tim kami setiap minggu',
          quote: 'Mengelola 12 akun brand berarti kami harus mengarsipkan ratusan Reels kolaborasi setiap bulan. Menempel 15 link sekaligus di pengolah batch Savey dengan setelan preset 1080p sangat luar biasa praktis. Video tersimpan rapi dalam hitungan detik tanpa perlu login akun.',
          category: 'managers',
          verified: true,
          date: '3 hari lalu',
          savedCount: '1.200+ video tersimpan'
        },
        {
          id: 'test-3',
          name: 'Kenji Takahashi',
          handle: '@kenji_motion',
          role: 'Motion Designer & Artis 3D',
          location: 'Tokyo, Jepang',
          avatarBg: 'from-purple-600 to-violet-600',
          initials: 'KT',
          platform: 'x',
          platformLabel: 'X / Twitter',
          rating: 5,
          title: 'Ekstraksi audio MP3 lossless & gambar MP4 super tajam',
          quote: 'Saya sering mengunduh referensi animasi dan demo teknologi dari X. Kemampuan mengekstrak audio 320kbps MP3 langsung dan mengunduh video mentah tanpa iklan jebakan malware adalah alasan utama mengapa Savey saya sematkan di bilah peramban.',
          category: 'creators',
          verified: true,
          date: '5 hari lalu',
          savedCount: '580+ video tersimpan'
        },
        {
          id: 'test-4',
          name: 'Sarah Jenkins',
          handle: '@sarahj_travels',
          role: 'Lifestyle Vlogger (iPhone 16 Pro)',
          location: 'Sydney, Australia',
          avatarBg: 'from-amber-500 to-orange-600',
          initials: 'SJ',
          platform: 'threads',
          platformLabel: 'Threads',
          rating: 5,
          title: 'Simpan langsung ke Apple Photos tanpa aplikasi pihak ketiga',
          quote: 'Di iPhone, sangat jarang ada situs pengunduh yang memicu menu Share Sheet asli iOS sehingga kita bisa langsung ketuk Simpan Video ke Apple Photos. Tanpa harus repot mencari file di aplikasi Files atau menunggu sinkronisasi iCloud. Bekerja mulus di Safari.',
          category: 'mobile',
          verified: true,
          date: '1 minggu lalu',
          savedCount: '410+ video tersimpan'
        },
        {
          id: 'test-5',
          name: 'Rizky Pratama',
          handle: '@rizkypratama_id',
          role: 'Tech Reviewer & Kreator Konten',
          location: 'Jakarta, Indonesia',
          avatarBg: 'from-emerald-500 to-teal-600',
          initials: 'RP',
          platform: 'tiktok',
          platformLabel: 'TikTok',
          rating: 5,
          title: '100% bebas watermark dengan auto-index cepat ke Google Photos',
          quote: 'Tidak ada iklan palsu, analisis stream super cepat, dan video otomatis langsung terindeks ke album Unduhan di Google Photos Android saya. Tampilannya seperti produk resmi Apple—elegan, bersih, dan sangat dapat diandalkan.',
          category: 'creators',
          verified: true,
          date: '2 minggu lalu',
          savedCount: '760+ video tersimpan'
        },
        {
          id: 'test-6',
          name: 'Amara Okafor',
          handle: '@amara_growth',
          role: 'Growth Marketing Lead',
          location: 'Toronto, Kanada',
          avatarBg: 'from-cyan-600 to-blue-600',
          initials: 'AO',
          platform: 'facebook',
          platformLabel: 'Facebook Watch',
          rating: 5,
          title: 'Video Facebook Reels akhirnya bisa diunduh Full HD 1080p',
          quote: 'Banyak pengunduh online gagal membaca tautan video Facebook atau menghasilkan file 360p yang buram. Savey memproses semua materi kampanye klien dengan sempurna dalam 1080p tajam. Kebijakan tanpa penyimpanan privasi sangat cocok untuk standar korporat.',
          category: 'managers',
          verified: true,
          date: '2 minggu lalu',
          savedCount: '620+ video tersimpan'
        }
      ]
    },
    faq: {
      kicker: 'Pusat Bantuan',
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Semua hal yang perlu Anda ketahui mengenai cara kerja Savey.',
      items: [
        {
          q: 'Bagaimana cara video otomatis tersimpan ke Galeri HP saya?',
          a: 'Saat Anda mengklik "Simpan ke Galeri Foto", Savey mengunduh stream berkas MP4 beresolusi master. Pada Android, sistem secara otomatis mengindeks berkas ke album Unduhan di aplikasi Galeri bawaan dan Google Photos. Pada iOS (iPhone & iPad), Savey membuka menu Share sistem asli sehingga Anda cukup mengetuk "Simpan Video" untuk langsung memasukkannya ke Galeri Kamera (Apple Photos).'
        },
        {
          q: 'Apakah video TikTok benar-benar bersih tanpa tanda air (watermark)?',
          a: 'Ya, 100%. Savey mengakses tautan video mentah (raw stream) langsung dari CDN resmi sebelum watermark atau tanda nama akun TikTok disematkan ke dalam frame gambar.'
        },
        {
          q: 'Berapa resolusi kualitas video yang didukung?',
          a: 'Savey selalu menyediakan resolusi tertinggi yang diunggah oleh pembuat aslinya, hingga Full HD 1080p pada 60fps dengan bitrate optimal. Anda juga dapat memilih opsi 720p jika ingin menghemat kuota data.'
        },
        {
          q: 'Apakah saya bisa mengambil file audio lagu saja (MP3)?',
          a: 'Bisa. Pada daftar opsi kualitas, pilih opsi "Audio Suara Musik Saja (MP3 320kbps)". Savey mengekstrak trek audio murni dengan bitrate tinggi yang siap diputar atau dijadikan nada dering.'
        },
        {
          q: 'Apakah layanan Savey gratis dan memerlukan instalasi aplikasi?',
          a: 'Savey gratis digunakan tanpa batasan unduhan harian dan tanpa perlu menginstal aplikasi pihak ketiga. Cukup buka melalui peramban Safari, Chrome, atau Firefox Anda.'
        },
        {
          q: 'Bisakah mengunduh video dari akun yang diprivat (Private Account)?',
          a: 'Demi menghormati privasi dan perlindungan data pengguna, Savey hanya memproses konten video dari postingan publik di TikTok, Instagram, X (Twitter), Threads, dan Facebook.'
        },
        {
          q: 'Bagaimana kebijakan privasi data Savey dan cara menghubungi bantuan?',
          a: 'Savey beroperasi dengan prinsip tanpa penyimpanan data (zero-retention). Kami tidak pernah menyimpan data pribadi, riwayat pencarian, maupun berkas unduhan di server kami. Untuk pertanyaan privasi, kepatuhan AdSense, laporan hak cipta (DMCA), atau bantuan umum, Anda dapat menghubungi tim resmi kami di support@circlemesh.site.'
        }
      ]
    },
    footer: {
      note1: '1. Kualitas resolusi 1080p Full HD dan 60fps bergantung pada ketersediaan berkas master yang diunggah oleh pembuat konten asli.',
      note2: '2. Fitur penyimpanan otomatis ke Galeri Foto iOS memanfaatkan Web Share API Safari (iOS 15 atau lebih baru) dan pengindeksan media Android OS.',
      note3: '3. Savey merupakan alat independen dan tidak berafiliasi dengan TikTok, ByteDance, Instagram, Meta, X Corp, atau Threads. Hak kekayaan intelektual konten tetap sepenuhnya milik kreator masing-masing.',
      colPlatforms: 'Platform',
      colCapabilities: 'Kemampuan',
      colGuide: 'Panduan Perangkat',
      colLegal: 'Hukum & Etika',
      privacyPolicy: 'Kebijakan Privasi',
      termsOfService: 'Ketentuan Layanan',
      dmcaNotice: 'DMCA & Hak Cipta',
      pwaInstall: 'Tambah ke Layar Utama',
      rightsReserved: 'Savey Inc. Seluruh hak cipta dilindungi undang-undang.',
      country: 'Indonesia (ID)'
    },
    galleryGuide: {
      title: 'Panduan Simpan ke Galeri',
      subtitle: 'Penyimpanan otomatis untuk perangkat Anda',
      iosTab: 'iPhone / iPad',
      androidTab: 'Android',
      pcTab: 'Mac / PC',
      iosStep1Title: 'Ketuk "Simpan ke Galeri Foto"',
      iosStep1Desc: 'Di Safari iOS, Savey memicu menu berbagi sistem secara otomatis.',
      iosStep2Title: 'Pilih "Simpan Video"',
      iosStep2Desc: 'Ketuk opsi Simpan Video pada menu Share iOS. Video master langsung tersimpan ke album Galeri Kamera (Apple Photos) tanpa watermark.',
      iosTip: 'Format video kompatibel 100% dengan AirDrop, iMessage, dan aplikasi pengedit video!',
      androidStep1Title: 'Tekan Tombol Unduh',
      androidStep1Desc: 'Browser Anda (Chrome atau Samsung Internet) akan segera mengunduh file video beresolusi master.',
      androidStep2Title: 'Otomatis Terindeks ke Galeri',
      androidStep2Desc: 'Sistem Android langsung menampilkan video di album Unduhan pada aplikasi Galeri ponsel dan Google Photos.',
      androidTip: 'Siap diunggah langsung ke WhatsApp Status dan Instagram Story tanpa kompresi buruk.',
      pcStep1Title: 'Simpan File HD',
      pcStep1Desc: 'File video tersimpan di folder Downloads Mac atau Windows Anda.',
      pcStep2Title: 'Kompatibilitas Standar Industri',
      pcStep2Desc: 'Dapat dibuka di QuickTime Player, VLC, atau diimpor langsung ke CapCut, Premiere, dan DaVinci Resolve.',
      doneBtn: 'Selesai'
    },
    history: {
      title: 'Riwayat Unduhan',
      emptyTitle: 'Belum ada video diunduh',
      emptyDesc: 'Video yang Anda unduh akan muncul di sini untuk pengunduhan ulang cepat.',
      clearAll: 'Bersihkan',
      reDownload: 'Unduh Ulang',
      delete: 'Hapus',
      footerNote: 'Disimpan secara privat di penyimpanan peramban lokal.'
    },
    legal: {
      privacyTitle: 'Kebijakan Privasi',
      termsTitle: 'Ketentuan Layanan',
      dmcaTitle: 'Pemberitahuan DMCA & Hak Cipta',
      closeBtn: 'Tutup'
    },
    batch: {
      singleMode: 'Satu Tautan',
      batchMode: 'Banyak Tautan (Batch)',
      textareaPlaceholder: 'Tempel beberapa tautan video sekaligus (satu tautan per baris)...\nhttps://vt.tiktok.com/ZS6eABCD/\nhttps://www.instagram.com/reel/C8XYZ123abc/\nhttps://x.com/techfuture/status/184920491029384\nhttps://fb.watch/rXYZ890abc/',
      processBatchBtn: 'Analisis Semua Tautan',
      loadSampleBatch: 'Muat Contoh Tautan Massal',
      linksDetected: 'tautan terdeteksi',
      summaryTitle: 'Antrean Unduhan Massal',
      summarySubtitle: 'Pantau status analisis real-time dan simpan semua video sekaligus ke galeri perangkat.',
      downloadAllBtn: 'Unduh Semua Video yang Siap',
      downloadingAll: 'Sedang Mengunduh Massal...',
      clearCompleted: 'Hapus yang Selesai',
      clearAll: 'Hapus Antrean',
      colVideo: 'Video & Kreator',
      colPlatform: 'Platform',
      colFormat: 'Resolusi & Format',
      colSize: 'Ukuran',
      colStatus: 'Status',
      colAction: 'Aksi',
      statusQueued: 'Dalam Antrean',
      statusAnalyzing: 'Menganalisis',
      statusReady: 'Siap Unduh',
      statusDownloading: 'Mengunduh',
      statusCompleted: 'Tersimpan di Galeri',
      statusFailed: 'Gagal',
      retry: 'Coba Lagi',
      selectAll: 'Pilih Semua',
      saveToGalleryAll: 'Otomatis Simpan Semua ke Galeri',
      queueStats: 'video siap diunduh'
    },
    settings: {
      title: 'Pengaturan & Preferensi',
      subtitle: 'Atur kualitas unduhan bawaan, tampilan, dan integrasi penyimpanan galeri.',
      navSettings: 'Pengaturan',
      qualitySectionTitle: 'Kualitas Video Bawaan (Default)',
      qualitySectionDesc: 'Savey akan mengingat resolusi ini dan otomatis memilihnya untuk semua unduhan tunggal maupun massal (batch).',
      opt1080Title: '1080p Full HD (Kualitas Master)',
      opt1080Desc: 'Bitrate paling jernih dan tajam, 100% tanpa watermark. Paling direkomendasikan untuk layar tajam & Retina.',
      opt1080Tag: 'Kualitas Terbaik',
      opt720Title: '720p HD (Hemat Kuota Data)',
      opt720Desc: 'Unduhan lebih cepat, menghemat hingga 55% kuota internet dan ruang memori ponsel.',
      opt720Tag: 'Cepat & Ringan',
      optMp3Title: 'Hanya Audio MP3 (320kbps)',
      optMp3Desc: 'Ekstrak musik latar dan lagu asli secara langsung tanpa menyertakan gambar video.',
      optMp3Tag: 'Ekstraksi Audio',
      appearanceTitle: 'Tampilan',
      themeLabel: 'Tema',
      themeLight: 'Mode Terang (Utama)',
      themeDark: 'Mode Gelap',
      languageLabel: 'Bahasa',
      galleryBehaviorTitle: 'Simpan Otomatis Galeri',
      galleryBehaviorDesc: 'Otomatis memicu menu simpan Apple Photos atau pengindeksan galeri Android.',
      savedFeedback: 'Tersimpan! Unduhan berikutnya otomatis menggunakan',
      closeBtn: 'Selesai',
      currentDefaultLabel: 'Kualitas Bawaan:',
      presetLabel: 'Preset Kualitas'
    },
    quickDownload: {
      kicker: 'Unduh Instan 1-Klik',
      title: 'Video Trending & Populer',
      subtitle: 'Unduh video viral pilihan tanpa repot menyalin tautan. Cukup 1 ketukan untuk menghapus watermark dan menyimpannya langsung ke galeri ponsel dengan kualitas HD.',
      filterAll: 'Semua Trending',
      filterTiktok: 'TikTok',
      filterInstagram: 'Instagram Reels',
      filterX: 'X (Twitter)',
      filterThreads: 'Threads',
      filterFacebook: 'Facebook',
      oneTapDownload: 'Simpan 1-Klik',
      downloading: 'Menyimpan ke Galeri...',
      saved: 'Tersimpan ke Galeri!',
      inspectBtn: 'Pilihan Format',
      copyUrl: 'Salin Tautan',
      copied: 'Tautan Tersalin!',
      views: 'tayangan',
      likes: 'suka',
      shares: 'bagikan',
      badge1080p: '1080p HD',
      badgeNoWm: 'Tanpa Watermark',
      instantBadge: 'Instan 1-Klik',
      presetAlert: 'Menerapkan preset kualitas bawaan:',
      items: [
        {
          id: 'quick-1',
          platform: 'tiktok',
          url: 'https://www.tiktok.com/@tiktok/video/7106594312292453675',
          title: 'Estetika seduh kopi pagi sinematik dan suasana hujan santai',
          authorName: 'Coffee Artisan ID',
          authorUsername: '@coffeeartisan',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
          duration: '0:42',
          resolution: '1080p 60fps',
          views: '1.8M',
          likes: '245.8K',
          shares: '18.4K',
          tag: '#lifestyle #coffee #vibes'
        },
        {
          id: 'quick-2',
          platform: 'instagram',
          url: 'https://www.instagram.com/reel/C8XYZ123abc/',
          title: 'Matahari terbenam di puncak pegunungan Bali, Reels 4K 60FPS',
          authorName: 'Explore Bali',
          authorUsername: '@explore.id',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
          duration: '0:58',
          resolution: '1080p HDR',
          views: '650K',
          likes: '89.4K',
          shares: '12.1K',
          tag: '#travel #bali #alam'
        },
        {
          id: 'quick-3',
          platform: 'x',
          url: 'https://x.com/techfuture/status/184920491029384',
          title: 'Demonstrasi langsung terobosan komputasi kuantum generasi baru',
          authorName: 'Tech Future Insights',
          authorUsername: '@techfuture',
          authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
          duration: '1:45',
          resolution: '1080p HD',
          views: '920K',
          likes: '34.2K',
          shares: '8.9K',
          tag: '#quantum #tech #inovasi'
        },
        {
          id: 'quick-4',
          platform: 'threads',
          url: 'https://www.threads.net/@devmindset/post/C9xyz456',
          title: 'Kebiasaan sederhana yang meningkatkan fokus kerja software engineer',
          authorName: 'Developer Mindset',
          authorUsername: '@devmindset',
          authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
          duration: '0:35',
          resolution: '1080p HD',
          views: '180K',
          likes: '12.6K',
          shares: '1.9K',
          tag: '#produktivitas #koding'
        },
        {
          id: 'quick-5',
          platform: 'facebook',
          url: 'https://fb.watch/rXYZ890abc/',
          title: 'Resep rahasia ayam krispi kulit rempah emas ala Master Chef',
          authorName: 'Dapur Nusantara',
          authorUsername: '@dapurnusantara',
          authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
          duration: '1:15',
          resolution: '1080p HD',
          views: '1.2M',
          likes: '51.3K',
          shares: '22.8K',
          tag: '#kuliner #resep #chef'
        },
        {
          id: 'quick-6',
          platform: 'tiktok',
          url: 'https://www.tiktok.com/@tiktok/video/7106594312292453675',
          title: 'Visualizer malam kota neon dan musik synthwave retro futuristik',
          authorName: 'Synth Studio',
          authorUsername: '@synthneon',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
          duration: '0:28',
          resolution: '1080p 60fps',
          views: '2.4M',
          likes: '380K',
          shares: '45.1K',
          tag: '#neon #synthwave #musik'
        }
      ]
    }
  }
};
