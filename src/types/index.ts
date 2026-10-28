export type PlatformType = 'tiktok' | 'instagram' | 'x' | 'threads' | 'facebook' | 'unknown';

export type PreferredQuality = '1080p' | '720p' | 'mp3';

export interface QualityOption {
  id: string;
  label: string;
  resolution: string;
  format: 'mp4' | 'mp3' | 'jpg';
  sizeEstimate?: string;
  url: string;
  isRecommended?: boolean;
}

export interface VideoMetadata {
  id: string;
  platform: PlatformType;
  title: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  duration?: number;
  cover: string;
  qualityOptions: QualityOption[];
  stats?: {
    likes?: string;
    comments?: string;
    shares?: string;
    views?: string;
  };
  timestamp?: number;
}

export interface DownloadHistoryItem {
  id: string;
  platform: PlatformType;
  title: string;
  authorName: string;
  authorUsername: string;
  cover: string;
  downloadUrl: string;
  format: string;
  resolution: string;
  savedAt: number;
}

export type BatchItemStatus =
  | 'queued'
  | 'analyzing'
  | 'ready'
  | 'downloading'
  | 'completed'
  | 'failed';

export interface BatchItem {
  id: string;
  originalUrl: string;
  platform: PlatformType;
  status: BatchItemStatus;
  progress: number;
  metadata?: VideoMetadata;
  selectedOption?: QualityOption;
  error?: string;
}


