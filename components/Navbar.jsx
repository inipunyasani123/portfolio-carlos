'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { nav } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Esc menutup menu ponsel; pindah halaman juga menutupnya.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between py-2 pl-6 pr-3 md:px-12 md:py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Carlos<span className="text-yellow-400">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.slice(0, -1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`text-sm font-medium transition-colors ${isActive(l.href) ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-yellow-300">
            Contact
          </Link>
        </div>

        <button type="button" className="grid h-11 w-11 place-items-center rounded-lg text-white md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} aria-controls="menu-ponsel">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div id="menu-ponsel" className="border-t border-gray-800 bg-gray-900 px-6 py-3 md:hidden">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`block rounded-lg px-3 py-3 text-base font-medium ${isActive(l.href) ? 'text-yellow-400' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
