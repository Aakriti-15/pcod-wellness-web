// src/components/Navbar.tsx
'use client';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/'; // Redirect to login
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>PCOD Wellness</div>
      <div className={styles.links}>
        <Link href="/tracker">Tracker</Link>
        <Link href="/symptom-log">Symptoms</Link>
        <Link href="/consultation">Consult</Link>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
