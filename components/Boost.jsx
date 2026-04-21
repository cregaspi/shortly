'use client';
// components/Boost.js
//
// CTA banner — "Boost your links today".
// Background SVG is applied via globals.css (.boost class).
// No Next.js-specific changes needed here.

import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Boost() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="boost" aria-label="Call to action">
      <h2 className="boost__title">Boost your links today</h2>
      <button className="btn-cyan" onClick={handleGetStarted}>Get Started</button>
    </section>
  );
}