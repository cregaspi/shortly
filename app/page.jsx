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
import { useAuth } from '../context/AuthContext';

export default function Home() {

   
  const { user, isLoading } = useAuth();
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize links from localStorage on mount
  useEffect(() => {
    if (!hasInitialized && !isLoading) {
      const allLinks = loadLinks();
      // If user is logged in, show only their links. If not, show guest links.
      if (user) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLinks(allLinks.filter(link => link.username === user.username));
      } else {
        setLinks(allLinks.filter(link => !link.username));
      }
      setHasInitialized(true);
    }
  }, [user, isLoading, hasInitialized]);

  // Persist to localStorage whenever the links array changes (but only after initialization)
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
        id:       Date.now(),
        original: inputUrl.trim(),
        short:    result.shortUrl,
        username: user ? user.username : null,
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
