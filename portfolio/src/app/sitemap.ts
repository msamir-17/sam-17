import { MetadataRoute } from 'next';

const siteUrl = 'https://sam-17-f42l.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '#projects',
    '#skills',
    '#experience',
    '#certifications',
    '#contact',
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
