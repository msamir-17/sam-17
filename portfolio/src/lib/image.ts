/**
 * Utility to optimize image URLs.
 * For Cloudinary assets, injects auto-format, quality, and width transforms
 * to drastically reduce bandwidth (by up to 90%) and accelerate page loads.
 */
export function getOptimizedImageUrl(url?: string, width = 800): string {
  if (!url) return '';
  if (typeof url !== 'string') return '';

  // Cloudinary optimization
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Avoid double transformation if already present
    if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto')) {
      return url;
    }
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }

  return url;
}
