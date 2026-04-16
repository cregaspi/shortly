'use client';
// components/Navbar.js

import { useState } from 'react';
import Link         from 'next/link';
import Image        from 'next/image';

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="navbar">

      <div className="navbar__logo">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Shortly"
            width={121}
            height={33}
            priority         
          />
        </Link>
      </div>

      {/* Desktop nav links */}
      <nav className="navbar__links" aria-label="Main navigation">
        <Link href="/features"  className="navbar__link">Features</Link>
        <Link href="/pricing"   className="navbar__link">Pricing</Link>
        <Link href="/resources" className="navbar__link">Resources</Link>
      </nav>

      {/* Desktop auth buttons */}
      <div className="navbar__auth">
        <button className="btn-login">Login</button>
        <button className="btn-cyan btn-signup">Sign Up</button>
      </div>

      {/* Hamburger — visible only on mobile via CSS */}
      <button
        className="navbar__hamburger"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <Image
          src="/images/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
        />
      </button>

      {/* Mobile dropdown — toggled by is-open class */}
      <nav
        className={`navbar__mobile ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <Link href="/features"  className="navbar__link" onClick={toggleMenu}>Features</Link>
        <Link href="/pricing"   className="navbar__link" onClick={toggleMenu}>Pricing</Link>
        <Link href="/resources" className="navbar__link" onClick={toggleMenu}>Resources</Link>
        <hr aria-hidden="true" />
        <button className="btn-login">Login</button>
        <button className="btn-cyan btn-signup">Sign Up</button>
      </nav>

    </header>
  );
}