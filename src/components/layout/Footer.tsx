'use client';

const FOOTER_LINKS = [
  { label: 'Company', href: '#company' },
  { label: 'Brewery', href: '#brewery' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-800 py-20 px-[var(--section-padding-x)]">
      {/* Golden line separator */}
      <div className="golden-line w-full mb-16" />

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1600px] mx-auto">
        {/* Column 1 — Brand */}
        <div>
          <h3 className="heading-3 text-gradient-gold mb-4">MGWBL</h3>
          <p className="body-base !text-steel-300 mb-4">
            Mohan Goldwater Breweries Limited — where engineering precision meets
            brewing excellence. Crafting India&apos;s finest beverages with
            unwavering commitment to quality.
          </p>
          <p className="label !text-steel-400 mt-6">Since 1969</p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="heading-3 !text-white mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="body-base !text-steel-300 hover:!text-gold-500 transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <h3 className="heading-3 !text-white mb-6">Contact</h3>
          <div className="space-y-4">
            {/* Location */}
            <div className="flex items-start gap-3">
              <svg
                className="mt-1 shrink-0"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold-500)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="body-base !text-steel-300">
                Mohan Nagar, Ghaziabad,
                <br />
                Uttar Pradesh 201007, India
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <svg
                className="shrink-0"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold-500)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a
                href="mailto:info@mgwbl.com"
                className="body-base !text-steel-300 hover:!text-gold-500 transition-colors duration-300"
              >
                info@mgwbl.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <svg
                className="shrink-0"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold-500)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a
                href="tel:+911234567890"
                className="body-base !text-steel-300 hover:!text-gold-500 transition-colors duration-300"
              >
                +91 123 456 7890
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1600px] mx-auto"
        style={{ borderTop: '1px solid var(--glass-border)' }}
      >
        <p className="body-base !text-steel-400">
          &copy; {new Date().getFullYear()} MGWBL. All rights reserved.
        </p>

        {/* Social icon placeholders */}
        <div className="flex items-center gap-3">
          {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
            <a
              key={social}
              href={`#${social}`}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 hover:border-gold-500"
              style={{ border: '1px solid var(--glass-border)' }}
              aria-label={social}
            >
              <span className="w-4 h-4 rounded-full bg-steel-400" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
