// components/Stats.js
//
// "Advanced Statistics" section with three feature cards.
//
// KEY NEXT.JS DIFFERENCE:
//   Icon <img> tags are replaced with Next.js <Image> for optimisation.
//   Width and height match the icon SVG dimensions (40×40 per the original).

import Image from 'next/image';

const CARDS = [
  {
    id:    1,
    icon:  '/images/icon-brand-recognition.svg',
    alt:   'Bar chart icon',
    title: 'Brand Recognition',
    text:  "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
  },
  {
    id:    2,
    icon:  '/images/icon-detailed-records.svg',
    alt:   'Speedometer icon',
    title: 'Detailed Records',
    text:  'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
  },
  {
    id:    3,
    icon:  '/images/icon-fully-customizable.svg',
    alt:   'Paintbrush icon',
    title: 'Fully Customizable',
    text:  'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
  },
];

export default function Stats() {
  return (
    <section className="stats" aria-labelledby="stats-heading">
      <h2 className="stats__heading" id="stats-heading">
        Advanced Statistics
      </h2>
      <p className="stats__subheading">
        Track how your links are performing across the web with our advanced
        statistics dashboard.
      </p>

      <div className="stats__cards">
        {CARDS.map(card => (
          <article className="stat-card" key={card.id}>
            <div className="stat-card__icon">
              <Image
                src={card.icon}
                alt={card.alt}
                width={40}
                height={40}
              />
            </div>
            <h3 className="stat-card__title">{card.title}</h3>
            <p className="stat-card__text">{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}