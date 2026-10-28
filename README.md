# Savey - HD Video Downloader Without Watermarks

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?logo=pwa&logoColor=white)

A modern, fast, and responsive web application for downloading videos and audio from various social media platforms in high definition, with watermark-free downloads where supported.

[Features](#features) | [Supported Platforms](#supported-platforms) | [Installation Guide](#installation-and-local-development) | [API Documentation](#api-documentation) | [Disclaimer](#disclaimer-and-legal-notice)

</div>

## Features

- **Watermark-Free Downloads:** Download videos from TikTok, Instagram Reels, and other supported platforms without watermarks where the source and downloader support it.
- **Interactive Media Preview:** Preview videos and audio directly within the application before downloading.
- **Multiple Quality Options:**
  - 1080p Full HD and 720p HD video in MP4 format.
  - MP3 and M4A audio extraction, where supported by the source.
  - HD cover image and thumbnail downloads.
- **Batch Downloader:** Paste multiple URLs, separated by new lines, and process them sequentially with a summary table displaying download statuses.
- **Automatic Gallery Saving:** Download video and audio files through a blob-streaming pipeline so supported browsers can save them to the device and make them available in the gallery or media library.
- **Progressive Web App (PWA):** Install the application on Android and iOS devices through supported browser installation features, with step-by-step installation guides.
- **Privacy-Focused Download History:** Store download history locally in the browser using `localStorage`, rather than storing it in the application database on the server.
- **Multilingual Interface:** Switch between English and Indonesian through the built-in language settings.
- **Resilient Scraper Engine:** Use multiple fallback strategies and metadata recovery mechanisms to improve parsing reliability and handle unexpected responses.
- **QR Code Generator:** Share download links with other devices through QR code scanning.

## Supported Platforms

| Platform | Supported Content | Target Quality | Watermark Handling |
|---|---|---|---|
| TikTok | Videos, photo slideshows, audio | Up to 1080p / MP3 | Depends on source and available download method |
| Instagram | Reels, posts, carousels, stories | Up to 1080p HD | Depends on source and available download method |
| X (Twitter) | Video posts, GIFs | Full HD MP4 where available | Depends on source |
| Threads | Video and photo posts | HD where available | Depends on source |
| Facebook | Reels, public videos, Watch videos | Up to 1080p / 720p | Depends on source and available download method |

Platform availability, supported media types, and maximum quality may change depending on platform restrictions, source media, and third-party downloader services.

## Tech Stack and Architecture

### Frontend

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Motion

### Backend and Scraper Engine

- **Runtime:** Node.js with TSX
- **Server:** Express 4
- **Multi-Engine Downloader:**
  - `@jerrycoder/instagram-api`
  - `btch-downloader`
  - `nayan-media-downloaders`
  - `cakkatrok-instagram-downloader`
  - `@mrnima/instagram-downloader`
- **Streaming Pipeline:** Express proxy streaming through `/api/proxy-download` to handle browser CORS restrictions and certain CDN hotlink limitations.

## Installation and Local Development

### Prerequisites

- Node.js version 18 or later, subject to the requirements of the installed dependencies.
- npm, Yarn, or pnpm.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/savey-downloader.git
cd savey-downloader
```

Replace `your-username` with your GitHub username or the appropriate repository owner.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

The application uses an Express backend integrated with Vite development middleware.

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

Make sure the development server configuration uses port `3000`.

### 4. Build for Production

Build the frontend assets into the `dist` directory:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Ensure that the corresponding scripts are configured in `package.json`.

## API Documentation

Savey provides internal backend endpoints for parsing social media URLs and streaming downloadable media.

### 1. Parse a Video URL

Analyze a social media URL and return available media download options.

**Endpoint:** `/api/parse`

**Method:** `POST`

**Headers:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{
  "url": "https://www.instagram.com/reel/Cxxxxxx/"
}
```

**Example Successful Response (200 OK):**

```json
{
  "status": "success",
  "title": "Instagram Reel Video",
  "thumbnail": "https://...",
  "platform": "instagram",
  "sourceUrl": "https://www.instagram.com/reel/Cxxxxxx/",
  "options": [
    {
      "id": "hd-video",
      "label": "1080p Full HD",
      "resolution": "1080p",
      "format": "MP4",
      "url": "/api/proxy-download?url=...",
      "quality": "HD",
      "downloadType": "video"
    },
    {
      "id": "audio-mp3",
      "label": "Original Audio",
      "resolution": "320kbps",
      "format": "MP3",
      "url": "/api/proxy-download?url=...",
      "quality": "Audio Only",
      "downloadType": "audio"
    }
  ]
}
```

The response above is an example. Actual response fields and available download options depend on the backend implementation and the source platform.

### 2. Proxy Download Stream

Stream media content to the browser while handling supported cross-origin restrictions and providing a downloadable file with a specified filename.

**Endpoint:** `/api/proxy-download`

**Method:** `GET`

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `url` | String | Yes | URL of the original media resource |
| `filename` | String | No | Desired filename for the downloaded file, such as `savey_video_1080p.mp4` |

**Example:**

```text
/api/proxy-download?url=ENCODED_MEDIA_URL&filename=savey_video_1080p.mp4
```

The backend should validate media URLs, restrict unsafe destinations, and sanitize filenames before processing requests.

## Project Structure

```text
├── public/
│   ├── ads.txt                      # Google AdSense verification
│   ├── robots.txt                   # Search engine crawler configuration
│   └── sitemap.xml                  # SEO sitemap
├── src/
│   ├── components/                  # Modular UI components
│   │   ├── HeroDownloader.tsx       # Single input bar and action button
│   │   ├── VideoResultCard.tsx      # Resolution options and download button
│   │   ├── VideoPreviewModal.tsx    # Video preview player modal
│   │   ├── BatchSummaryTable.tsx    # Batch download interface
│   │   ├── HistoryDrawer.tsx        # Local download history panel
│   │   ├── AudioExtractModal.tsx    # MP3 audio extraction modal
│   │   ├── PwaInstallGuideModal.tsx # PWA installation guide for iOS and Android
│   │   ├── GalleryGuideModal.tsx    # Automatic gallery saving guide
│   │   └── FaqSection.tsx           # Frequently asked questions section
│   ├── context/                     # Language and theme state context
│   ├── types/                       # TypeScript interface definitions
│   ├── utils/                       # Platform parsing and storage utilities
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # React application entry point
│   └── index.css                    # Global Tailwind CSS configuration
├── server.ts                        # Express server and multi-scraper API
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # Project documentation
```

## Disclaimer and Legal Notice

### Educational and Personal Use

This project is intended for educational purposes and personal use.

### Copyright

All copyrights and intellectual property rights associated with videos, music, images, and other media belong to their respective creators, copyright holders, and social media platforms.

### User Responsibility

Users are responsible for ensuring that their downloads comply with applicable laws, copyright requirements, and the terms of service of the relevant platforms.

Only download content that you own, have permission to download, or are otherwise legally entitled to access and save.

### No Affiliation

Savey is an independent project and is not affiliated with, endorsed by, or officially connected to TikTok, ByteDance, Instagram, Meta, Facebook, X (Twitter), Threads, or any of their subsidiaries or related entities.

### Third-Party Services

This project may rely on third-party libraries and services to retrieve media metadata and download links. Their availability, functionality, and compatibility may change without notice.

Users must respect third-party service restrictions and applicable platform policies.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/new-feature
   ```

5. Open a Pull Request.

Please provide a clear description of your changes and ensure that your contribution follows the project's existing coding conventions.

## License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

<div align="center">

Developed by **Savey Team**

</div>
