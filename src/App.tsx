/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { ThemeLanguageProvider, useThemeLanguage } from './context/ThemeLanguageContext';
import { Navbar } from './components/Navbar';
import { HeroDownloader } from './components/HeroDownloader';
import { VideoResultCard } from './components/VideoResultCard';
import { BatchSummaryTable } from './components/BatchSummaryTable';
import { PlatformFeatures } from './components/PlatformFeatures';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GalleryGuideModal } from './components/GalleryGuideModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { PwaInstallGuideModal } from './components/PwaInstallGuideModal';
import { SettingsModal } from './components/SettingsModal';
import {
  VideoMetadata,
  DownloadHistoryItem,
  QualityOption,
  PlatformType,
  BatchItem,
  PreferredQuality
} from './types';
import { identifyPlatform } from './utils/platforms';
import { downloadAndSaveToGallery } from './utils/downloader';

const HISTORY_STORAGE_KEY = 'savey_download_history_v1';
const BATCH_STORAGE_KEY = 'savey_batch_queue_v1';

function AppContent() {
  const { matchPreferredQuality, isSettingsOpen, setIsSettingsOpen } = useThemeLanguage();
  const [parsedVideo, setParsedVideo] = useState<VideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingBatch, setIsProcessingBatch] = useState<boolean>(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isGalleryGuideOpen, setIsGalleryGuideOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [isPwaOpen, setIsPwaOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);

  const isDownloadingAllRef = useRef(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load history:', e);
    }
  }, []);

  // Listen to URL hash for direct links (e.g. #privacy, #terms, #dmca, #contact)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#privacy' || hash === '#kebijakan-privasi' || hash === '#privacypolicy') {
        setLegalTab('privacy');
        setIsLegalOpen(true);
      } else if (
        hash === '#terms' ||
        hash === '#tos' ||
        hash === '#termsofservice' ||
        hash === '#syarat-ketentuan'
      ) {
        setLegalTab('terms');
        setIsLegalOpen(true);
      } else if (hash === '#dmca' || hash === '#copyright' || hash === '#hak-cipta') {
        setLegalTab('dmca');
        setIsLegalOpen(true);
      } else if (hash === '#contact' || hash === '#support' || hash === '#kontak') {
        setLegalTab('contact');
        setIsLegalOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Save history item
  const handleSaveToHistory = (video: VideoMetadata, selectedOption: QualityOption) => {
    const newItem: DownloadHistoryItem = {
      id: `${video.id}_${selectedOption.id}_${Date.now()}`,
      platform: video.platform,
      title: video.title,
      authorName: video.author.name,
      authorUsername: video.author.username,
      cover: video.cover,
      downloadUrl: selectedOption.url,
      format: selectedOption.format,
      resolution: selectedOption.resolution,
      savedAt: Date.now(),
    };

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.downloadUrl !== selectedOption.url);
      const updated = [newItem, ...filtered].slice(0, 30);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save history:', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear history:', e);
    }
  };

  const handleDeleteItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save history update:', e);
      }
      return updated;
    });
  };

  const handleReDownload = async (item: DownloadHistoryItem) => {
    const safeTitle = (item.title || 'Video')
      .replace(/[^a-zA-Z0-9_\u00C0-\u017F\s-]/g, '')
      .trim()
      .slice(0, 35)
      .replace(/\s+/g, '_');
    const ext = item.format === 'mp3' ? 'mp3' : item.format === 'jpg' ? 'jpg' : 'mp4';
    const filename = `Savey_${item.platform.toUpperCase()}_${safeTitle}.${ext}`;

    await downloadAndSaveToGallery(
      item.downloadUrl,
      filename,
      item.format === 'mp3' ? 'audio/mpeg' : item.format === 'jpg' ? 'image/jpeg' : 'video/mp4'
    );
  };

  // ==========================================
  // BATCH PROCESSING HANDLERS
  // ==========================================

  // Process a single batch item by calling /api/parse
  const parseSingleBatchItem = async (itemId: string, targetUrl: string) => {
    // Set to analyzing
    setBatchItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status: 'analyzing', error: undefined } : i))
    );

    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to parse video URL');
      }

      const parsed: VideoMetadata = data;
      const defaultOption = matchPreferredQuality(parsed.qualityOptions);

      setBatchItems((prev) =>
        prev.map((i) =>
          i.id === itemId
            ? {
                ...i,
                status: 'ready',
                metadata: parsed,
                selectedOption: defaultOption,
                platform: parsed.platform || identifyPlatform(targetUrl),
              }
            : i
        )
      );
    } catch (err: any) {
      console.warn(`Failed to parse batch item ${targetUrl}:`, err);
      setBatchItems((prev) =>
        prev.map((i) =>
          i.id === itemId
            ? {
                ...i,
                status: 'failed',
                error: err.message || 'Unable to fetch video',
              }
            : i
        )
      );
    }
  };

  // When user pastes and submits batch URLs
  const handleBatchSubmit = async (urls: string[]) => {
    if (urls.length === 0) return;

    setIsProcessingBatch(true);

    const newItems: BatchItem[] = urls.map((u, index) => ({
      id: `batch_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 7)}`,
      originalUrl: u,
      platform: identifyPlatform(u),
      status: 'queued',
      progress: 0,
    }));

    setBatchItems((prev) => [...prev, ...newItems]);

    // Process items sequentially with slight spacing to avoid rate limiting
    for (const item of newItems) {
      await parseSingleBatchItem(item.id, item.originalUrl);
    }

    setIsProcessingBatch(false);
  };

  // Retry an individual failed batch item
  const handleRetryBatchItem = async (item: BatchItem) => {
    await parseSingleBatchItem(item.id, item.originalUrl);
  };

  // Remove a batch item
  const handleRemoveBatchItem = (id: string) => {
    setBatchItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear completed batch items
  const handleClearCompletedBatch = () => {
    setBatchItems((prev) => prev.filter((i) => i.status !== 'completed'));
  };

  // Clear all batch items
  const handleClearAllBatch = () => {
    setBatchItems([]);
  };

  // Change format/resolution selection for a specific batch item
  const handleChangeFormat = (itemId: string, option: QualityOption) => {
    setBatchItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, selectedOption: option } : i))
    );
  };

  // Apply a preferred quality preset to all ready items in batch
  const handleApplyQualityToAll = (quality: PreferredQuality) => {
    setBatchItems((prev) =>
      prev.map((item) => {
        if (!item.metadata) return item;
        const matched = matchPreferredQuality(item.metadata.qualityOptions);
        return { ...item, selectedOption: matched };
      })
    );
  };

  // Download a single batch item and save to device gallery
  const handleDownloadBatchItem = async (item: BatchItem): Promise<boolean> => {
    const video = item.metadata;
    const option = item.selectedOption || video?.qualityOptions[0];

    if (!video || !option) return false;

    // Set to downloading
    setBatchItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: 'downloading', progress: 5 } : i))
    );

    const safeTitle = (video.title || 'Video')
      .replace(/[^a-zA-Z0-9_\u00C0-\u017F\s-]/g, '')
      .trim()
      .slice(0, 35)
      .replace(/\s+/g, '_');
    const ext = option.format === 'mp3' ? 'mp3' : option.format === 'jpg' ? 'jpg' : 'mp4';
    const filename = `Savey_${video.platform.toUpperCase()}_${safeTitle}.${ext}`;
    const mimeType = option.format === 'mp3' ? 'audio/mpeg' : option.format === 'jpg' ? 'image/jpeg' : 'video/mp4';

    try {
      const result = await downloadAndSaveToGallery(
        option.url,
        filename,
        mimeType,
        (pct) => {
          setBatchItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, progress: pct } : i))
          );
        }
      );

      if (result.success) {
        setBatchItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: 'completed', progress: 100 } : i))
        );
        handleSaveToHistory(video, option);
        return true;
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      console.error('Batch item download failed:', err);
      setBatchItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: 'failed', error: err.message || 'Download failed' }
            : i
        )
      );
      return false;
    }
  };

  // Download all ready videos in sequence
  const handleDownloadAllBatch = async () => {
    const readyItems = batchItems.filter((i) => i.status === 'ready' && i.metadata);
    if (readyItems.length === 0 || isDownloadingAll) return;

    setIsDownloadingAll(true);
    isDownloadingAllRef.current = true;

    for (const item of readyItems) {
      if (!isDownloadingAllRef.current) break;
      await handleDownloadBatchItem(item);
      // Brief breathing pause between downloads so browser doesn't block parallel dialogs
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setIsDownloadingAll(false);
    isDownloadingAllRef.current = false;
  };

  // Preview an item in the main player card
  const handlePreviewBatchItem = (item: BatchItem) => {
    if (item.metadata) {
      setParsedVideo(item.metadata);
      setTimeout(() => {
        const el = document.getElementById('video-result-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleScrollToDownloader = () => {
    const el = document.getElementById('downloader');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPlatform = (_platform: PlatformType) => {
    handleScrollToDownloader();
  };

  const handleOpenLegalWithTab = (tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-white text-slate-900 dark:bg-[#000000] dark:text-[#f5f5f7]">
      {/* Navigation Top Bar strictly adhering to 3-zone contract */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onScrollToDownloader={handleScrollToDownloader}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with URL Input, Batch Newlines, and Auto-detection */}
        <HeroDownloader
          onVideoParsed={(video) => setParsedVideo(video)}
          onBatchSubmitted={handleBatchSubmit}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isProcessingBatch={isProcessingBatch}
        />

        {/* Batch Summary Queue Table */}
        {batchItems.length > 0 && (
          <BatchSummaryTable
            items={batchItems}
            isProcessingBatch={isProcessingBatch}
            isDownloadingAll={isDownloadingAll}
            onDownloadItem={handleDownloadBatchItem}
            onDownloadAll={handleDownloadAllBatch}
            onRetryItem={handleRetryBatchItem}
            onRemoveItem={handleRemoveBatchItem}
            onClearCompleted={handleClearCompletedBatch}
            onClearAll={handleClearAllBatch}
            onChangeFormat={handleChangeFormat}
            onApplyQualityToAll={handleApplyQualityToAll}
            onPreviewItem={handlePreviewBatchItem}
          />
        )}

        {/* Video Result Card & Player (when link is parsed) */}
        {parsedVideo && (
          <VideoResultCard
            video={parsedVideo}
            onSaveToHistory={handleSaveToHistory}
            onOpenGalleryGuide={() => setIsGalleryGuideOpen(true)}
          />
        )}

        {/* Platform Capabilities, 3-Step Guide, Pro Tips, and Comparison Table */}
        <PlatformFeatures
          onSelectPlatform={handleSelectPlatform}
          onOpenLegal={() => handleOpenLegalWithTab('privacy')}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Site Footer */}
      <Footer
        onOpenLegal={handleOpenLegalWithTab}
        onOpenPwaGuide={() => setIsPwaOpen(true)}
      />

      {/* Modals & Drawers */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <GalleryGuideModal
        isOpen={isGalleryGuideOpen}
        onClose={() => setIsGalleryGuideOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteItem}
        onReDownload={handleReDownload}
      />

      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
      />

      <PwaInstallGuideModal
        isOpen={isPwaOpen}
        onClose={() => setIsPwaOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeLanguageProvider>
      <AppContent />
    </ThemeLanguageProvider>
  );
}
