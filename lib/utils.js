import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const JSONStringify = (data) => {
  return JSON.stringify(data)
}

export const JSONParse = (data) => {
  return JSON.parse(data)
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getFileIcon(fileName) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'ri-file-pdf-line';
    case 'doc':
    case 'docx':
      return 'ri-file-word-line';
    case 'xls':
    case 'xlsx':
      return 'ri-file-excel-line';
    case 'ppt':
    case 'pptx':
      return 'ri-file-ppt-line';
    case 'txt':
      return 'ri-file-text-line';
    case 'zip':
    case 'rar':
      return 'ri-file-zip-line';
    default:
      return 'ri-file-line';
  }
}

export function extractYouTubeVideoId(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {
      return parsed.searchParams.get("v");
    }

    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/embed/")[1].split("?")[0];
    }

    return null;
  } catch {
    return null;
  }
}

export function toYouTubeEmbedUrl(inputUrl) {
  const id = extractYouTubeVideoId(inputUrl);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

