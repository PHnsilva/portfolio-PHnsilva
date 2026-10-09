import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile';

export default function Seo({ title, description }: { title: string; description: string }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const values = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': `${profile.site}${pathname}`,
    };
    Object.entries(values).forEach(([selector, value]) =>
      document.querySelector(selector)?.setAttribute('content', value),
    );
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `${profile.site}${pathname}`);
  }, [title, description, pathname]);
  return null;
}
