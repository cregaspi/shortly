// components/Footer.js
//
// KEY NEXT.JS DIFFERENCES:
//   - Logo and social icons use Next.js <Image> instead of <img>.
//     Width / height are required by Next/Image; they match the SVG dimensions.
//   - Internal footer links (Features, Resources, Company) use Next.js <Link>
//     for client-side navigation without full page reloads.
//   - External social links still use plain <a> with target="_blank".

import Image from 'next/image';
import Link  from 'next/link';

// ── Footer column data ─────────────────────────────────────────────────────
// Each link has a label (display text) and an href (route or anchor).
// Update href values to match your actual routes when they exist.
const COLUMNS = [
  {
    title: 'Features',
    links: [
      { label: 'Link Shortening', href: '/features#link-shortening' },
      { label: 'Branded Links',   href: '/features#branded-links'   },
      { label: 'Analytics',       href: '/features#analytics'       },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog',       href: '/resources#blog'       },
      { label: 'Developers', href: '/resources#developers' },
      { label: 'Support',    href: '/resources#support'    },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',    href: '#about'    },
      { label: 'Our Team', href: '#our-team' },
      { label: 'Careers',  href: '#careers'  },
      { label: 'Contact',  href: '#contact'  },
    ],
  },
];

// ── Social icon data ───────────────────────────────────────────────────────
// href values point to placeholder profiles — update when you have real URLs.
const SOCIAL = [
  { src: '/images/icon-facebook.svg',  alt: 'Facebook',  href: 'https://facebook.com'  },
  { src: '/images/icon-twitter.svg',   alt: 'Twitter',   href: 'https://twitter.com'   },
  { src: '/images/icon-pinterest.svg', alt: 'Pinterest', href: 'https://pinterest.com' },
  { src: '/images/icon-instagram.svg', alt: 'Instagram', href: 'https://instagram.com' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Logo — links to home page */}
        <div className="footer__logo">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Shortly"
              width={121}
              height={33}
              // CSS filter in globals.css turns the dark logo white
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
        </div>

        {/* Three link columns */}
        {COLUMNS.map(col => (
          <div className="footer__col" key={col.title}>
            <p className="footer__col-title">{col.title}</p>
            <ul>
              {col.links.map(link => (
                <li key={link.href}>
                  {/*
                    Internal routes use Next.js <Link> for client-side nav.
                    If the href starts with '#' it's an anchor — Link still
                    handles it correctly on the same page.
                  */}
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social icons — external links, plain <a> is correct here */}
        <div className="footer__social">
          {SOCIAL.map(s => (
            <a
              key={s.alt}
              href={s.href}
              aria-label={s.alt}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}