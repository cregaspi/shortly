'use client';
// components/Hero.jsx

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
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
    <section className="hero">

      <div className="hero__content">
        <h1 className="hero__title">More than just shorter links</h1>
        <p className="hero__subtitle">
          Build your brand&apos;s recognition and get detailed insights on how
          your links are performing.
        </p>
        <button className="btn-cyan hero__cta" onClick={handleGetStarted}>Get Started</button>
      </div>

      <div className="hero__image">
        <div className="hero__image-wrap">
          <Image
            src="/images/illustration-working.svg"
            alt="Person working at a computer"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

    </section>
  );
}
