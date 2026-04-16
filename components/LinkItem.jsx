// components/LinkItem.js
//
// Renders a single row in the shortened links list.
//
// Props:
//   link     — { id, original, short }
//   isCopied — true when THIS link's copy button was just clicked
//   onCopy   — callback(shortUrl) called when Copy is clicked
//
// No Next.js-specific changes needed here.
// 1. Define the interface


export default function LinkItem({ link, isCopied, onCopy }) {
  return (
    <li className="link-item">

      {/* Original long URL — truncated with ellipsis if it overflows */}
      <span className="link-item__original" title={link.original}>
        {link.original}
      </span>

      {/* Shortened URL — opens in a new tab */}
      <a
        className="link-item__short"
        href={link.short}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Shortened link: ${link.short}`}
      >
        {link.short}
      </a>

      {/* Copy button — turns purple + shows "Copied!" for 2 seconds */}
      <button
        className={`link-item__copy-btn ${isCopied ? 'is-copied' : ''}`}
        onClick={() => onCopy(link.short)}
        aria-label={isCopied ? 'Copied!' : `Copy ${link.short}`}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>

    </li>
  );
}