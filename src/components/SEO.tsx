import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  type?: 'website' | 'profile' | 'organization';
  image?: string;
  url?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export default function SEO({
  title,
  description,
  keywords,
  type = 'website',
  image = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
  url = window.location.href,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = `${title} | AURA Model Management — Warsaw & Baku`;
    document.title = formattedTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (nameOrProperty: string, value: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 3. Set standard Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // 4. Set OpenGraph Meta Tags
    setMetaTag('og:title', formattedTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:site_name', 'AURA Model Management', true);

    // 5. Set Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', formattedTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // 6. Handle JSON-LD Structured Data Injection
    const existingScript = document.getElementById('json-ld-seo');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'json-ld-seo';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up dynamic script tag on unmount if appropriate
      const script = document.getElementById('json-ld-seo');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, type, image, url, jsonLd]);

  return null; // This component runs entirely as a side-effect, returning no visual DOM nodes.
}
