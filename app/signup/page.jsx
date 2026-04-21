'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../utils/storage';

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    
    // Register user with validation
    const result = registerUser(username, email, password);
    
    setTimeout(() => {
      setLoading(false);
      if (result.success) {
        login(username);
        router.push('/dashboard');
      } else {
        setError(result.error || 'Signup failed');
      }
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="page">
          <div className="page__hero">
            <h1 className="page__title">Join Shortly Today</h1>
            <p className="page__subtitle">
              Create your account and start shortening links.
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Preferred Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. alex_johnson"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="btn-cyan btn-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-link">
              Already have an account? <Link href="/login">Sign in here</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}