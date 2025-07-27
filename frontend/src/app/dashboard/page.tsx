// src/app/dashboard/page.tsx
'use client';
import styles from './dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/');
    }
  }, [router]);



  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <h1 className={styles.greeting}>Welcome to Your Wellness Dashboard 🌸</h1>
     <p className={styles.subtitle}>Here’s your current wellness summary</p>
        <div className={styles.separator}></div>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.iconBox}>
             <Image src="/assets/track.png" alt="Track Icon" width={64} height={64} />
          </div>
          <h2>Track Cycle</h2>
          <p>Track your period cycle and more with intelligent insights and predictions.</p>
          <button>Open Tracker</button>
        </div>
        <div className={styles.card}>
            <div className={styles.iconBox}>
             <Image src="/assets/symptom.png" alt="Symptom Icon" width={64} height={64} />
          </div>
          <h2>Log Symptoms</h2>
          <p>Log symptoms and monitor patterns to better understand your wellness journey.</p>
          <button>Log Now</button>
        </div>
        <div className={styles.card}>
            <div className={styles.iconBox}>
            <Image src="/assets/consult.png" alt="Consult Icon" width={64} height={64} />
          </div>
          <h2>Consult Doctor</h2>
          <p>Connect with a doctor for personalized advice and professional guidance.</p>
          <button>Consult</button>
        </div>
      </div>
    </div>
    </>
  );
}
