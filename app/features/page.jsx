import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const features = [
  {
    title: 'Fast link shortening',
    description:
      'Create short, memorable URLs in a single click and share them across channels with ease.',
    icon: '⚡',
  },
  {
    title: 'Real-time analytics',
    description:
      'Track clicks, referrers, and geographic data so you can optimize your campaigns instantly.',
    icon: '📊',
  },
  {
    title: 'Custom branded links',
    description:
      'Use your own domain to build trust and strengthen brand recognition every time a link is shared.',
    icon: '🏷️',
  },
  {
    title: 'Link management',
    description:
      'Organize, edit, and archive all your shortened links from one clean dashboard.',
    icon: '🗂️',
  },
  {
    title: 'Advanced targeting',
    description:
      'Add UTM tags and retargeting information directly to short links for smarter marketing.',
    icon: '🎯',
  },
  {
    title: 'Secure redirects',
    description:
      'Protect every URL with HTTPS and prevent abuse with spam filtering and safe redirect handling.',
    icon: '🔒',
  },
];

const page = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="page">
          <div className="page__hero">
            <h1 className="page__title">Everything you need to shorten, share, and measure links.</h1>
            <p className="page__subtitle">
              Shortly gives teams and creators the tools to build better campaigns with
              branded short links, advanced analytics, and centralized link management.
            </p>
          </div>

          <div className="page__grid">
            {features.map((feature) => (
              <article key={feature.title} className="page-card">
                <div className="page-card__icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h2 className="page-card__title">{feature.title}</h2>
                <p className="page-card__text">{feature.description}</p>
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
