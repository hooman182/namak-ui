export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png';

// ----------------------------------------------------------------------

export function isAcceptedFile(file: File): boolean {
  return ACCEPTED_MIME_TYPES.includes(file.type);
}

export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} بایت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
}

export function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function isPdfMime(mimeType: string): boolean {
  return mimeType === 'application/pdf';
}
