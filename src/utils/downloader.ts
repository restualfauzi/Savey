/**
 * Helper to download video files and trigger native device gallery save
 */

export interface DownloadProgressCallback {
  (percentage: number, loadedBytes: number, totalBytes: number): void;
}

export async function downloadAndSaveToGallery(
  downloadUrl: string,
  filename: string,
  mimeType: string = 'video/mp4',
  onProgress?: DownloadProgressCallback
): Promise<{ success: boolean; sharedToGallerySheet: boolean; message: string }> {
  try {
    // If the download URL is already internal or needs proxying:
    const proxyUrl = downloadUrl.startsWith('http')
      ? `/api/proxy-download?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}&type=${encodeURIComponent(mimeType)}`
      : downloadUrl;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Gagal menghubungi server download (${response.status})`);
    }

    const contentLength = Number(response.headers.get('content-length')) || 0;
    const reader = response.body?.getReader();

    let receivedLength = 0;
    const chunks: BlobPart[] = [];

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedLength += value.length;
          if (contentLength > 0 && onProgress) {
            const pct = Math.min(Math.round((receivedLength / contentLength) * 100), 99);
            onProgress(pct, receivedLength, contentLength);
          } else if (onProgress) {
            onProgress(50, receivedLength, receivedLength * 2);
          }
        }
      }
    } else {
      const blobData = await response.blob();
      chunks.push(new Uint8Array(await blobData.arrayBuffer()));
      receivedLength = blobData.size;
    }

    if (onProgress) {
      onProgress(100, receivedLength, receivedLength);
    }

    const blob = new Blob(chunks, { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    let sharedToGallery = false;

    // Try Web Share API with file support (Supported on iOS 15+ and Android Chrome)
    // This allows users on iPhone and Android to tap "Save Video" directly to Camera Roll
    try {
      const file = new File([blob], filename, { type: mimeType });
      if (
        navigator.canShare &&
        navigator.canShare({ files: [file] }) &&
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
      ) {
        await navigator.share({
          files: [file],
          title: filename,
          text: 'Video HD diunduh via Savey',
        });
        sharedToGallery = true;
      }
    } catch (shareErr) {
      // User cancelled share dialog or not allowed in current context, fallback to standard anchor download
      console.log('Native share bypassed, executing automatic browser download save:', shareErr);
    }

    // Always trigger standard browser automatic file save
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up blob URL after delay
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 30000);

    return {
      success: true,
      sharedToGallerySheet: sharedToGallery,
      message: sharedToGallery
        ? 'Menu simpan ke Galeri Foto terbuka!'
        : 'Video berhasil diunduh dan tersimpan ke perangkat Anda!'
    };
  } catch (error: any) {
    console.error('Download error:', error);
    // If proxy download fails for any reason, trigger direct URL fallback
    try {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return {
        success: true,
        sharedToGallerySheet: false,
        message: 'Tautan unduhan langsung dibuka di tab baru.'
      };
    } catch {
      return {
        success: false,
        sharedToGallerySheet: false,
        message: error?.message || 'Gagal mengunduh video. Silakan coba kembali.'
      };
    }
  }
}
