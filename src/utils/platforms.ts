import { PlatformType } from '../types';

export interface PlatformInfo {
  id: PlatformType;
  name: string;
  tagline: string;
  badge: string;
  placeholder: string;
  sampleUrl: string;
  accentColor: string;
  gradient: string;
  description: string;
  supportedTypes: string[];
}

export const PLATFORMS: Record<PlatformType, PlatformInfo> = {
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'Unduh Video & Audio Tanpa Watermark',
    badge: 'No Watermark HD',
    placeholder: 'Tempel tautan TikTok (cth: https://vt.tiktok.com/... atau https://tiktok.com/@user/video/...)',
    sampleUrl: 'https://vt.tiktok.com/ZS6eABCD/',
    accentColor: '#00f2fe',
    gradient: 'from-cyan-400 via-rose-500 to-pink-500',
    description: 'Hapus logo watermark TikTok secara bersih dengan resolusi video asli 1080p dan opsi ekstrak MP3.',
    supportedTypes: ['VT Shortlinks', 'Web Videos', 'TikTok Audio (MP3)', 'Foto Sampul HD']
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Reels, Stories, Feed & Carousel',
    badge: 'Full 1080p 60fps',
    placeholder: 'Tempel tautan Instagram (cth: https://www.instagram.com/reel/C8xyz... atau /p/)',
    sampleUrl: 'https://www.instagram.com/reel/C8XYZ123abc/',
    accentColor: '#E1306C',
    gradient: 'from-amber-500 via-rose-500 to-purple-600',
    description: 'Unduh video Reels, Postingan Video, dan Stories Instagram langsung dengan kualitas tertinggi.',
    supportedTypes: ['Instagram Reels', 'Video Post Feed', 'Audio Original', 'Sampul Profil/Thumbnail']
  },
  x: {
    id: 'x',
    name: 'X (Twitter)',
    tagline: 'Video Post & GIF HD Bitrate Tinggi',
    badge: 'Ultra Crisp MP4',
    placeholder: 'Tempel tautan X atau Twitter (cth: https://x.com/username/status/123456...)',
    sampleUrl: 'https://x.com/techfuture/status/184920491029384',
    accentColor: '#1D9BF0',
    gradient: 'from-sky-400 to-blue-600',
    description: 'Dapatkan resolusi tertinggi dari video di X/Twitter tanpa penurunan bitrate dan kompresi.',
    supportedTypes: ['Video Postingan', 'Thread Video', 'Kualitas 1080p/720p', 'Audio Suara']
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    tagline: 'Video & Media Threads Meta',
    badge: 'Clean MP4 Audio',
    placeholder: 'Tempel tautan Threads (cth: https://www.threads.net/@user/post/C8abc...)',
    sampleUrl: 'https://www.threads.net/@devmindset/post/C9xyz456',
    accentColor: '#10B981',
    gradient: 'from-emerald-400 to-teal-600',
    description: 'Unduh video dari platform Threads Instagram dengan audio jernih dan frame rate stabil.',
    supportedTypes: ['Video Threads', 'Carousel Video', 'Audio MP3', 'Cover Image']
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'FB Reels & Video Publik HD',
    badge: '1080p HD & SD',
    placeholder: 'Tempel tautan Facebook (cth: https://www.facebook.com/watch/?v=... atau fb.watch/...)',
    sampleUrl: 'https://fb.watch/rXYZ890abc/',
    accentColor: '#1877F2',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Simpan video Facebook Watch, video grup publik, dan Facebook Reels langsung ke galeri.',
    supportedTypes: ['Facebook Reels', 'Watch Public Video', 'Video Feed HD', 'Audio Track']
  },
  unknown: {
    id: 'unknown',
    name: 'Multi-Platform',
    tagline: 'Otomatis Deteksi Platform',
    badge: 'Auto Detect',
    placeholder: 'Tempel tautan video dari TikTok, Instagram, X, Threads, atau Facebook di sini...',
    sampleUrl: 'https://vt.tiktok.com/ZS6eABCD/',
    accentColor: '#6366F1',
    gradient: 'from-indigo-500 to-rose-500',
    description: 'Sistem cerdas Savey mendeteksi sumber video secara otomatis saat Anda menempelkan tautan.',
    supportedTypes: ['TikTok', 'Instagram', 'X (Twitter)', 'Threads', 'Facebook']
  }
};

export function identifyPlatform(url: string): PlatformType {
  const clean = url.trim().toLowerCase();
  if (clean.includes('tiktok.com')) return 'tiktok';
  if (clean.includes('instagram.com')) return 'instagram';
  if (clean.includes('twitter.com') || clean.includes('x.com')) return 'x';
  if (clean.includes('threads.net')) return 'threads';
  if (clean.includes('facebook.com') || clean.includes('fb.watch') || clean.includes('fb.com')) return 'facebook';
  return 'unknown';
}
