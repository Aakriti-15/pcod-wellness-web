// src/app/page.tsx
'use client';
import styles from '@/styles/Login.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    // Simulate login (replace this with real API call later)
    localStorage.setItem('loggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>Login to your PCOD wellness journey</p>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p className={styles.bottomText}>
        Don’t have an account?{' '}
        <Link href="/register">
          <span className={styles.link}>Register</span>
        </Link>
      </p>
    </div>
  );
}
