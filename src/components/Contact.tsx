'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contact as defaultContact, contactSection } from '@/config/site.config';

interface ContactProps {
  settings?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    hours?: string;
    mapUrl?: string;
  } | null;
}

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Contact({ settings }: ContactProps) {
  const contact = {
    phone:        settings?.phone        ?? defaultContact.phone,
    whatsapp:     settings?.whatsapp     ?? defaultContact.whatsapp,
    email:        settings?.email        ?? defaultContact.email,
    address:      settings?.address      ?? defaultContact.address,
    addressShort: defaultContact.addressShort,
    hours:        settings?.hours        ?? defaultContact.hours,
    mapUrl:       settings?.mapUrl       ?? defaultContact.mapUrl,
  };

  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      '*New Uniform Inquiry — Kah Global Website*', '',
      `*Name:* ${form.name}`,
      form.company  ? `*Company:* ${form.company}`  : null,
      `*Phone:* ${form.phone}`,
      form.email    ? `*Email:* ${form.email}`    : null,
      `*Uniform Type:* ${form.type}`,
      form.message  ? `*Message:* ${form.message}` : null,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines)}`, '_blank');
  };

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-navy placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 bg-white text-sm';

  const contactInfo = [
    { Icon: MapPin, label: 'Address',          value: contact.address },
    { Icon: Phone, label: 'Phone / WhatsApp',  value: contact.phone   },
    { Icon: Mail,  label: 'Email',             value: contact.email   },
    { Icon: Clock, label: 'Hours',             value: contact.hours   },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block bg-navy/5 text-navy font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
            {contactSection.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">{contactSection.heading}</h2>
          <p className="text-gray-600 max-w-xl mx-auto">{contactSection.subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-7" data-aos="fade-right">
            <h3 className="text-xl font-bold text-navy">Contact &amp; Location</h3>
            {contactInfo.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy uppercase tracking-wide">{label}</p>
                  <p className="text-gray-600 text-sm mt-0.5">{value}</p>
                </div>
              </div>
            ))}
            <div className="w-full h-48 bg-navy rounded-2xl flex items-center justify-center overflow-hidden relative mt-2">
              <div aria-hidden="true" className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(201,168,76,0.5) 20px, rgba(201,168,76,0.5) 21px)' }} />
              <div className="text-center relative">
                <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-white font-semibold text-sm">{contact.addressShort}</p>
                <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="text-gold text-xs mt-1 hover:underline block">View on Google Maps →</a>
              </div>
            </div>
          </div>

          <form data-aos="fade-left" onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Full Name <span className="text-gold">*</span></label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Ahmad Razali" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Company</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Syarikat ABC Sdn Bhd" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Phone <span className="text-gold">*</span></label>
                <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+60 12-345 6789" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ahmad@company.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Uniform Type <span className="text-gold">*</span></label>
              <select name="type" required value={form.type} onChange={handleChange} className={inputClass}>
                <option value="">Select a category...</option>
                {contactSection.uniformTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Message</label>
              <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                placeholder="Tell us about your requirements — quantity, style, colours, timeline..."
                className={inputClass} />
            </div>
            <button type="submit"
              className="w-full bg-gold text-white font-bold py-3.5 rounded-xl hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2.5 text-base shadow-md shadow-gold/20">
              <WhatsAppIcon /> Send via WhatsApp
            </button>
            <p className="text-center text-xs text-gray-400">We respond within 24 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
