'use client';

import { useState } from 'react';
import styles from './tracker.module.css';
import { useRouter } from 'next/navigation';

interface CycleEntry {
  date: string;
  nextPeriod: string;
  cycleLength: number;
  ovulationDate: string;
  fertileWindow: string;
  energyLevel: string;
  moodTrend: string;
  hydrationLevel: string;
  selfCareTip: string;
  suggestedSleep: string;
  currentPhase: string;
  hormonalTip: string;
  hormonalSelfCare: string;
  recommendedMeals: string;
}

const TrackerPage = () => {
  const [periodDate, setPeriodDate] = useState('');
  const [loggedData, setLoggedData] = useState<CycleEntry | null>(null);
  const [entries, setEntries] = useState<CycleEntry[]>([]);
  const router = useRouter();

  const calculateDetails = (startDate: string): CycleEntry => {
    const start = new Date(startDate);
    const cycleLength = 28;

    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLength);

    const ovulation = new Date(start);
    ovulation.setDate(start.getDate() + 14);

    const fertileStart = new Date(start);
    fertileStart.setDate(start.getDate() + 10);

    const fertileEnd = new Date(start);
    fertileEnd.setDate(start.getDate() + 15);

    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const phase = daysSinceStart % cycleLength;

    let moodTrend = 'Stable';
    let hydrationLevel = 'Moderate';
    let selfCareTip = 'Listen to your body';
    let suggestedSleep = '7-8 hours';
    let energyLevel = 'Moderate';

    let currentPhase = 'Luteal';
    let hormonalTip = 'Maintain balance';
    let hormonalSelfCare = 'Stay grounded';
    let recommendedMeals = 'Balanced diet';

    if (phase <= 5) {
      currentPhase = 'Menstrual';
      moodTrend = 'Low/Cranky';
      hydrationLevel = 'High';
      selfCareTip = 'Take warm baths and rest';
      suggestedSleep = '8-9 hours';
      energyLevel = 'Low';
      hormonalTip = 'Iron-rich foods are essential';
      hormonalSelfCare = 'Rest and use heat pads';
      recommendedMeals = 'Leafy greens, lentils, soups';
    } else if (phase > 5 && phase <= 13) {
      currentPhase = 'Follicular';
      moodTrend = 'Energetic';
      hydrationLevel = 'Normal';
      selfCareTip = 'Great time to start new routines';
      suggestedSleep = '7 hours';
      energyLevel = 'High';
      hormonalTip = 'Boost estrogen naturally';
      hormonalSelfCare = 'Try new workouts';
      recommendedMeals = 'Smoothies, salads, lean protein';
    } else if (phase > 13 && phase <= 17) {
      currentPhase = 'Ovulation';
      moodTrend = 'Romantic/Moody';
      hydrationLevel = 'High';
      selfCareTip = 'Stay hydrated and exercise lightly';
      suggestedSleep = '7.5 hours';
      energyLevel = 'Very High';
      hormonalTip = 'Keep stress low';
      hormonalSelfCare = 'Practice mindfulness';
      recommendedMeals = 'Avocados, nuts, berries';
    } else {
      currentPhase = 'Luteal';
      moodTrend = 'Stable but Fatigue';
      hydrationLevel = 'Low';
      selfCareTip = 'Prioritize sleep and reduce stress';
      suggestedSleep = '8 hours';
      energyLevel = 'Moderate';
      hormonalTip = 'Support progesterone';
      hormonalSelfCare = 'Do light yoga';
      recommendedMeals = 'Sweet potatoes, magnesium-rich foods';
    }

    return {
      date: startDate,
      nextPeriod: nextPeriod.toDateString(),
      cycleLength,
      ovulationDate: ovulation.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} - ${fertileEnd.toDateString()}`,
      energyLevel,
      moodTrend,
      hydrationLevel,
      selfCareTip,
      suggestedSleep,
      currentPhase,
      hormonalTip,
      hormonalSelfCare,
      recommendedMeals,
    };
  };

  const handleLog = () => {
    if (!periodDate) return;
    const data = calculateDetails(periodDate);
    setLoggedData(data);
    setEntries([...entries, data]);
    setPeriodDate('');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/');
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>PCOD Wellness</div>
        <div className={styles.links}>
          <a href="/dashboard">Dashboard</a>
          <a href="/consultation">Consult</a>
          <a href="/symptom-log">Symptom</a>
          <button onClick={handleLogout} className={styles.logout}>Logout</button>
        </div>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.title}>Cycle Tracker🌸</h1>

        <div className={styles.centerContainer}>
          <div className={styles.inputSection}>
            <label htmlFor="periodDate">When did your period start?</label>
            <input
              type="date"
              id="periodDate"
              value={periodDate}
              onChange={(e) => setPeriodDate(e.target.value)}
            />
            <button onClick={handleLog}>Log Period</button>
          </div>
        </div>

        {loggedData && (
          <div className={styles.cardsWrapper}>
            <div className={styles.cardsContainer}>
              {/* Current Cycle Card */}
              <div className={styles.card}>
                <h2>Current Cycle</h2>
                <p><strong>Next Period:</strong> {loggedData.nextPeriod}</p>
                <p><strong>Cycle Length:</strong> {loggedData.cycleLength} days</p>
                <p><strong>Ovulation Date:</strong> {loggedData.ovulationDate}</p>
                <p><strong>Fertile Window:</strong> {loggedData.fertileWindow}</p>
              </div>

              {/* Insights Card */}
              <div className={styles.card}>
                <h2>Insights</h2>
                <p><strong>Energy Level:</strong> {loggedData.energyLevel}</p>
                <p><strong>Mood Trend:</strong> {loggedData.moodTrend}</p>
                <p><strong>Hydration Level:</strong> {loggedData.hydrationLevel}</p>
                <p><strong>Self-care Tip:</strong> {loggedData.selfCareTip}</p>
                <p><strong>Suggested Sleep:</strong> {loggedData.suggestedSleep}</p>
              </div>

              {/* Hormonal Health Info Card */}
              <div className={styles.card}>
                <h2>Hormonal Health Info</h2>
                <p><strong>Current Phase:</strong> {loggedData.currentPhase}</p>
                <p><strong>Hormonal Tip:</strong> {loggedData.hormonalTip}</p>
                <p><strong>Self-Care:</strong> {loggedData.hormonalSelfCare}</p>
                <p><strong>Meals:</strong> {loggedData.recommendedMeals}</p>
              </div>
            </div>
          </div>
        )}

        {entries.length > 0 && (
          <div className={styles.recentEntries}>
            <h2>Recent Entries</h2>
            <ul>
              {entries.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.date}</strong> — Next: {entry.nextPeriod}, Ovulation: {entry.ovulationDate}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
