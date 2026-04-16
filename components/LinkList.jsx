// components/LinkList.js
//
// Renders the list of shortened links below the shortener box.
// Returns null when there are no links yet (no empty wrapper rendered).
//
// No Next.js-specific changes needed here.

import LinkItem from './LinkItem';

export default function LinkList({ links, copiedUrl, onCopy }) {
  if (links.length === 0) return null;

  return (
    <section
      className="shortener-section"
      style={{ paddingTop: 0, paddingBottom: '2rem' }}
      aria-label="Shortened links"
    >
      <ul className="link-list">
        {links.map(link => (
          <LinkItem
            key={link.id}
            link={link}
            isCopied={copiedUrl === link.short}
            onCopy={onCopy}
          />
        ))}
      </ul>
    </section>
  );
}