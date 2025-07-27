
// src/components/AuthForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/styles/Login.module.css";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Dummy login, you can replace with API call
    if (email && password) {
      router.push("/dashboard");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
}
