'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';

export default function FAQ() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [expandedId, setExpandedId] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const faqItems = [
    {
      id: 1,
      question: 'How does link shortening work?',
      answer: 'Our system takes your long URL and creates a shortened version that redirects to the original link. This makes sharing easier while tracking click analytics.'
    },
    {
      id: 2,
      question: 'Can I customize my shortened links?',
      answer: 'Yes! You can edit your shortened links to make them more memorable and on-brand. Custom links help with branding and are easier to remember.'
    },
    {
      id: 3,
      question: 'How long do shortened links last?',
      answer: 'Your shortened links remain active indefinitely. As long as your account is active, your links will continue to work and redirect to the original URLs.'
    },
    {
      id: 4,
      question: 'Can I track clicks on my shortened links?',
      answer: 'Absolutely! We provide detailed analytics for each shortened link, including click count, referral sources, device types, and geographic location of clicks.'
    },
    {
      id: 5,
      question: 'Is there a limit to how many links I can shorten?',
      answer: 'Free accounts can shorten unlimited links. Premium accounts have additional features like custom domains and advanced analytics.'
    },
    {
      id: 6,
      question: 'How do I delete a shortened link?',
      answer: 'You can delete any shortened link from your dashboard. Simply click the delete button next to the link you want to remove. This action cannot be undone.'
    },
    {
      id: 7,
      question: 'Are my links secure and private?',
      answer: 'Yes, we use industry-standard encryption to protect your data. Your links and analytics are private and only accessible to you.'
    },
    {
      id: 8,
      question: 'Can I share my analytics with others?',
      answer: 'You can generate shareable reports of your link analytics that others can view without accessing your full account. This is great for teams and clients.'
    },
  ];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main>
          <div className="page">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="page">
          <div className="page__hero">
            <h1 className="page__title">Frequently Asked Questions</h1>
            <p className="page__subtitle">
              Find answers to common questions about Shortly and how to make the most of your shortened links.
            </p>
          </div>

          <div className="faq-container">
            {faqItems.map((item) => (
              <div key={item.id} className="faq-item">
                <button
                  className={`faq-question ${expandedId === item.id ? 'is-open' : ''}`}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">
                    {expandedId === item.id ? '−' : '+'}
                  </span>
                </button>
                {expandedId === item.id && (
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <h2>Still have questions?</h2>
            <p>Can`t find the answer you`re looking for? Contact our support team.</p>
            <a href="mailto:support@shortly.com" className="btn-cyan btn-full" style={{ display: 'inline-block', maxWidth: '200px' }}>
              Contact Support
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
