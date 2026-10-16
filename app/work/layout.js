import { pageMeta, SITE_NAME } from '@/lib/seo';

// Judul pakai { default, template } supaya halaman di bawahnya tetap berakhiran " — Carlos Mendoza".
const meta = pageMeta({ title: 'Work', description: "Six case studies by Carlos Mendoza: a property marketplace, booking tools, and landing pages, each with the rule behind it and a live demo.", path: '/work' });
export const metadata = { ...meta, title: { default: 'Work', template: `%s — ${SITE_NAME}` } };

export default function Layout({ children }) {
  return children;
}
