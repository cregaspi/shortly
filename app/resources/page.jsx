// app/resources/page.jsx
// Resource page for Shortly, modeled after the existing features/pricing layout.

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const resources = [
  {
    title: 'Shortly setup guide',
    description:
      'Get started fast with URL shortening, custom domains, and organization-level settings.',
    link: '#',
  },
  {
    title: 'Analytics explained',
    description:
      'Understand every metric in your dashboard so you can turn clicks into better decisions.',
    link: '#',
  },
  {
    title: 'Custom domain workflow',
    description:
      'Learn how to connect your brand domain and create trustworthy links across campaigns.',
    link: '#',
  },
  {
    title: 'API reference',
    description:
      'Automate link generation, tracking, and redirects with the Shortly developer API.',
    link: '#',
  },
  {
    title: 'Security best practices',
    description:
      'Keep your links safe with HTTPS, spam protection, and secure redirect handling.',
    link: '#',
  },
  {
    title: 'Growth case studies',
    description:
      'See how teams use Shortly to boost engagement, simplify sharing, and measure results.',
    link: '#',
  },
];

const page = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="page">
          <div className="page__hero">
            <h1 className="page__title">Learn how Shortly makes link management simple.</h1>
            <p className="page__subtitle">
              Browse practical guides, tips, and reference material for short links, analytics,
              and branded campaigns. Everything you need to run your links with confidence.
            </p>
          </div>

          <div className="page__grid">
            {resources.map((resource) => (
              <article key={resource.title} className="page-card">
                <h2 className="page-card__title">{resource.title}</h2>
                <p className="page-card__text">{resource.description}</p>
                <a href={resource.link} className="btn-cyan" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                  Read more
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
