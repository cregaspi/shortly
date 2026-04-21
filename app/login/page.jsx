'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { verifyUser } from '../../utils/storage';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    
    // Verify login credentials
    const result = verifyUser(usernameOrEmail, password);
    
    setTimeout(() => {
      setLoading(false);
      if (result.success) {
        login(result.username);
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="page">
          <div className="page__hero">
            <h1 className="page__title">Welcome Back</h1>
            <p className="page__subtitle">
              Sign in to your account to access your shortened links.
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="usernameOrEmail">Username or Email</label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="e.g. alex_johnson or alex@email.com"
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="btn-cyan btn-full" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-link">
              Don`t have an account? <Link href="/signup">Sign up here</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}