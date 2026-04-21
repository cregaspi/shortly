'use client';
// components/Navbar.js

import { useState } from 'react';
import Link         from 'next/link';
import Image        from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push('/');
  };

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
        {user ? (
          <>
            {user && <Link href="/dashboard"  className="navbar__link">Dashboard</Link>}
            <span className="navbar__username">{user.username}</span>
            <button onClick={handleLogout} className="btn-cyan btn-signup">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn-login">Login</Link>
            <Link href="/signup" className="btn-cyan btn-signup">Sign Up</Link>
          </>
        )}
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
        {user && <Link href="/dashboard"  className="navbar__link" onClick={toggleMenu}>Dashboard</Link>}
        <Link href="/features"  className="navbar__link" onClick={toggleMenu}>Features</Link>
        <Link href="/pricing"   className="navbar__link" onClick={toggleMenu}>Pricing</Link>
        <Link href="/resources" className="navbar__link" onClick={toggleMenu}>Resources</Link>
        <hr aria-hidden="true" />
        {user ? (
          <>
            <span className="navbar__username--mobile">{user.username}</span>
            <button onClick={handleLogout} className="btn-cyan btn-signup">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn-login" onClick={toggleMenu}>Login</Link>
            <Link href="/signup" className="btn-cyan btn-signup" onClick={toggleMenu}>Sign Up</Link>
          </>
        )}
      </nav>

    </header>
  );
}