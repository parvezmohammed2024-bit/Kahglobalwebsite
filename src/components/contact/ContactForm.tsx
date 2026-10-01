'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Send } from 'lucide-react';
import { contact } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { buttonClasses } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const TOPICS = ['Quotation', 'Ready-made uniforms', 'Custom-made uniforms', 'Printing / embroidery', 'Existing order', 'Other'];

type Form = { name: string; company: string; phone: string; email: string; topic: string; message: string };

const inputClass =
  'h-12 w-full rounded-control border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none';

function buildMessage(f: Form) {
  return [
    `Hi Kah Global, I have an enquiry (${f.topic}).`,
    '',
    f.message.trim(),
    '',
    `Name: ${f.name}`,
    f.company ? `Company: ${f.company}` : null,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : null,
  ]
    .filter((l): l is string => l !== null)
    .join('\n');
}

/** Simple enquiry form — hands off to WhatsApp (or email) with the message pre-filled. */
export function ContactForm() {
  const [form, setForm] = useState<Form>({ name: '', company: '', phone: '', email: '', topic: TOPICS[0], message: '' });
  const [error, setError] = useState('');

  const set = (key: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate(): boolean {
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please fill in your name, phone number and message.');
      return false;
    }
    setError('');
    return true;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappUrl(buildMessage(form)), '_blank', 'noopener,noreferrer');
  }

  function onEmail() {
    if (!validate()) return;
    const subject = `Website enquiry — ${form.topic}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(form))}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
          Your name *
          <input className={inputClass} value={form.name} onChange={set('name')} autoComplete="name" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
          Company
          <input className={inputClass} value={form.company} onChange={set('company')} autoComplete="organization" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
          Phone / WhatsApp *
          <input
            className={inputClass}
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
            placeholder="e.g. 012-345 6789"
            required
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
          Email
          <input className={inputClass} type="email" value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
        Topic
        <select className={inputClass} value={form.topic} onChange={set('topic')}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
        Message *
        <textarea
          className={`${inputClass} h-32 py-3`}
          value={form.message}
          onChange={set('message')}
          placeholder="Tell us what you need — garment, quantity, logo and when you need it."
          required
        />
      </label>
      {error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className={buttonClasses('whatsapp', 'lg')}>
          <WhatsAppIcon /> Send via WhatsApp <Send aria-hidden className="size-4" />
        </button>
        <button type="button" onClick={onEmail} className={buttonClasses('outline', 'lg')}>
          <Mail aria-hidden className="size-4" /> Send by email
        </button>
      </div>
      <p className="text-xs text-muted">
        Submitting opens WhatsApp (or your email app) with your message ready to send. We do not store your details on
        this website.
      </p>
    </form>
  );
}
