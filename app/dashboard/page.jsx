'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '../../components/Navbar';
import Shortener from '../../components/Shortener';
import LinkList from '../../components/LinkList';
import Footer from '../../components/Footer';

import { shortenUrl } from '../../utils/api';
import { saveLinks, getUserLinks } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Initialize links from localStorage for authenticated user
  useEffect(() => {
    if (!hasInitialized && !isLoading && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLinks(getUserLinks(user.username));
      setHasInitialized(true);
    }
  }, [user, isLoading, hasInitialized]);

  // Persist to localStorage only after initialization
  useEffect(() => {
    if (hasInitialized) {
      saveLinks(links);
    }
  }, [links, hasInitialized]);

  const handleShorten = async () => {
    if (!inputUrl.trim()) {
      setError('Please add a link');
      return;
    }

    setError('');
    setLoading(true);

    const result = await shortenUrl(inputUrl.trim());

    if (result.success) {
      const newLink = {
        id: Date.now(),
        original: inputUrl.trim(),
        short: result.shortUrl,
        username: user.username,
      };
      setLinks(prev => [newLink, ...prev]);
      setInputUrl('');
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopiedUrl(shortUrl);
      setTimeout(() => setCopiedUrl(''), 2000);
    });
  };

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
            <h1 className="page__title">Welcome, {user.username}!</h1>
            <p className="page__subtitle">
              Shorten your links and track analytics all in one place.
            </p>
          </div>
        </section>

        <Shortener
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          error={error}
          setError={setError}
          loading={loading}
          onShorten={handleShorten}
        />
        <LinkList
          links={links}
          copiedUrl={copiedUrl}
          onCopy={handleCopy}
        />

        <section className="faq-section">
          <div className="page__hero">
            <h2 className="page__title">Frequently Asked Questions</h2>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
