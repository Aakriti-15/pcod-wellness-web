// src/app/register/page.tsx
'use client';
import styles from '@/styles/Register.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate account creation
    localStorage.setItem('loggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>Join the PCOD wellness community</p>
      <form className={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p className={styles.bottomText}>
        Already have an account?{' '}
        <Link href="/">
          <span className={styles.link}>Login</span>
        </Link>
      </p>
    </div>
  );
}
