// app/pricing/page.jsx
// Pricing page with dummy plan data for the URL shortener.

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const pricingPlans = [
  {
    plan: 'Free',
    price: '$0',
    period: 'per month',
    features: [
      'Up to 1,000 shortened links',
      'Basic click tracking',
      'Standard link customization',
      'Email support',
    ],
    cta: 'Start for free',
  },
  {
    plan: 'Pro',
    price: '$13',
    period: 'per month',
    features: [
      'Unlimited shortened links',
      'Advanced analytics dashboard',
      'Custom branded domains',
      'Link retargeting tags',
      'Priority support',
    ],
    cta: 'Choose Pro',
    featured: true,
  },
  {
    plan: 'Enterprise',
    price: 'Custom',
    period: 'Custom Pricing and range',
    features: [
      'Dedicated account manager',
      'SAML / SSO support',
      'Custom onboarding',
      'Service-level agreements',
      'Volume link migration',
    ],
    cta: 'Talk to sales',
  },
];

const page = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="page">
          <div className="page__hero">
            <h1 className="page__title">Pricing for every link and every team.</h1>
            <p className="page__subtitle">
              Scale your campaigns with smarter short links, advanced analytics, and
              custom domains. Pick the plan that fits your goals and grow from free
              to enterprise ready link management.
            </p>
          </div>

          <div className="pricing__grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.plan}
                className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
              >
                <p className="pricing-card__plan">{plan.plan}</p>
                <p className="pricing-card__price">{plan.price === '0' ? '0' : plan.price}</p>
                <p className="pricing-card__period">{plan.period}</p>
                <ul className="pricing-card__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button className="btn-cyan">{plan.cta}</button>
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

