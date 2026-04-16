'use client';

import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Shortener from '../components/Shortener';
import LinkList from '../components/LinkList';
import Stats from '../components/Stats';
import Boost from '../components/Boost';
import Footer from '../components/Footer';

import { shortenUrl } from '../utils/api';
import { saveLinks, loadLinks } from '../utils/storage';

export default function Home() {

  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');
  const [links, setLinks] = useState([]);  // always [] on first render (server + client)

  useEffect(() => {
    // Runs only in the browser, after hydration — safe to access localStorage
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLinks(loadLinks());
  }, []); // empty deps = run once on mount

  // Persist to localStorage whenever the links array changes
  useEffect(() => {
    saveLinks(links);
  }, [links]);

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
        id:       Date.now(),
        original: inputUrl.trim(),
        short:    result.shortUrl,
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

  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
        <Stats />
        <Boost />
      </main>
      <Footer />
    </>
  );
}
