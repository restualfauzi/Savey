import React from 'react';
import { PlatformType } from '../types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export function TikTokIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TikTok"
      {...props}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.891 2.896 2.896 0 0 1 2.892-2.892c.307 0 .603.048.88.136V9.414a6.34 6.34 0 0 0-.88-.061A6.337 6.337 0 0 0 3 15.688 6.337 6.337 0 0 0 9.345 22a6.337 6.337 0 0 0 6.338-6.312V9.07a8.163 8.163 0 0 0 4.806 1.556V7.181a4.814 4.814 0 0 1-.9-.495Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Instagram"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

export function XTwitterIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="X (Twitter)"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ThreadsIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Threads"
      {...props}
    >
      <path d="M12.001 2c5.523 0 10 4.477 10 10 0 4.37-2.802 8.086-6.727 9.404-.442.149-.9-.126-.9-.593v-.058c0-.342.227-.642.553-.746 3.424-1.1 5.874-4.29 5.874-8.007 0-4.852-3.948-8.8-8.8-8.8s-8.8 3.948-8.8 8.8c0 4.851 3.948 8.8 8.8 8.8 2.234 0 4.288-.838 5.86-2.23.354-.313.895-.27 1.203.09.302.355.253.886-.104 1.2-1.921 1.688-4.42 2.64-6.959 2.64-6.627 0-12-5.373-12-12s5.373-12 12-12zm.232 5.568c2.617 0 4.542 1.942 4.542 4.707 0 1.554-.606 2.87-1.688 3.666-.889.654-2.046.942-3.376.843-.377-.028-.687-.279-.769-.647-.082-.369.091-.74.423-.912.875-.452 1.642-1.077 2.05-2.023.237-.55.35-1.168.35-1.84 0-1.879-1.298-3.14-3.08-3.14-1.815 0-3.155 1.282-3.155 3.197 0 1.246.613 2.28 1.636 2.83.332.179.497.561.402.927-.095.367-.425.617-.802.61-.061 0-.124-.007-.186-.02-1.579-.333-2.73-1.634-2.73-3.414 0-2.673 2.036-4.784 4.93-4.784z" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Facebook"
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface PlatformIconProps extends IconProps {
  platform: PlatformType;
  colored?: boolean;
}

export function PlatformIcon({
  platform,
  size = 20,
  className = '',
  colored = false,
  ...props
}: PlatformIconProps) {
  switch (platform) {
    case 'tiktok':
      return (
        <TikTokIcon
          size={size}
          className={`${colored ? 'text-black dark:text-cyan-400' : ''} ${className}`}
          {...props}
        />
      );
    case 'instagram':
      return (
        <InstagramIcon
          size={size}
          className={`${colored ? 'text-[#E1306C]' : ''} ${className}`}
          {...props}
        />
      );
    case 'x':
      return (
        <XTwitterIcon
          size={size}
          className={`${colored ? 'text-[#1D9BF0]' : ''} ${className}`}
          {...props}
        />
      );
    case 'threads':
      return (
        <ThreadsIcon
          size={size}
          className={`${colored ? 'text-neutral-900 dark:text-white' : ''} ${className}`}
          {...props}
        />
      );
    case 'facebook':
      return (
        <FacebookIcon
          size={size}
          className={`${colored ? 'text-[#1877F2]' : ''} ${className}`}
          {...props}
        />
      );
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect width="14" height="14" x="1" y="5" rx="2" ry="2" />
        </svg>
      );
  }
}
