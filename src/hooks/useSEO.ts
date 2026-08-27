import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = 'https://www.tanganika.uy';

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function useSEO({ title, description, path }: SEOOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="title"]', 'content', title);
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [title, description, path]);
}
