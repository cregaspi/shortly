// components/Boost.js
//
// CTA banner — "Boost your links today".
// Background SVG is applied via globals.css (.boost class).
// No Next.js-specific changes needed here.

export default function Boost() {
  return (
    <section className="boost" aria-label="Call to action">
      <h2 className="boost__title">Boost your links today</h2>
      <button className="btn-cyan">Get Started</button>
    </section>
  );
}