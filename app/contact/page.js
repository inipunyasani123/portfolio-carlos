'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Check, ListChecks } from 'lucide-react';
import { profile } from '@/lib/data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const doneRef = useRef(null);
  useEffect(() => { if (sent) doneRef.current?.focus(); }, [sent]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    // Portfolio template: the message is not delivered anywhere (see the success copy).
    setSent(true);
  };

  const field = 'w-full rounded-xl border border-gray-700 bg-gray-800/60 px-4 py-3 text-base text-white transition focus:border-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400';
  const label = 'mb-1.5 block text-sm font-medium text-gray-300';

  return (
    <main>
      <section className="border-b border-gray-800 bg-gray-900 px-6 pb-12 pt-16 text-white md:px-12 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm uppercase tracking-wide text-gray-400">— Contact</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Let&apos;s work together.</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
            I&apos;m open for freelance opportunities and collaboration. Tell me about your project and I&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-6">
            <Info icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <Info icon={MapPin} label="Location" value={profile.location} />
            <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-yellow-400">
                <ListChecks size={18} aria-hidden="true" /> A useful first note
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">
                <li>What the product does, and for whom.</li>
                <li>The rule at its core: a price, a schedule, a limit.</li>
                <li>A rough date, if there is one.</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-2xl border border-gray-800 bg-gray-800/50 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-gray-900"><Check size={28} aria-hidden="true" /></div>
                <h2 ref={doneRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">Thanks for trying the form!</h2>
                <p className="mt-1 text-gray-400">This is a portfolio template, {form.name}, so your message wasn&apos;t actually sent. In a live version, it lands straight in the owner&apos;s inbox.</p>
                <button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="mt-6 min-h-11 rounded-full border border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-gray-800">Back to the form</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gray-800 bg-gray-800/40 p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className={label}>Name</label>
                    <input id="f-name" name="name" value={form.name} onChange={handle} autoComplete="name" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-email" className={label}>Email</label>
                    <input id="f-email" type="email" name="email" value={form.email} onChange={handle} autoComplete="email" required className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="f-message" className={label}>About the project</label>
                  <textarea id="f-message" name="message" value={form.message} onChange={handle} placeholder="What should it calculate, schedule, or limit?" rows={6} required className={`${field} resize-none placeholder-gray-500`} />
                </div>
                <button type="submit" className="min-h-12 w-full rounded-xl bg-yellow-400 py-3.5 font-semibold text-gray-900 transition hover:bg-yellow-300">Send message</button>
                <p className="text-center text-xs text-gray-400">Demo form: nothing is sent or stored.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-800 bg-gray-800/40 p-5 transition hover:border-yellow-400/40">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400"><Icon size={20} aria-hidden="true" /></span>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
        <p className="mt-0.5 font-semibold text-white">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
