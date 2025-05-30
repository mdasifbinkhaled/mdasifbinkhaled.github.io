"use client";

import { useState, useEffect } from 'react';

export function FooterYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) {
    // You can return a placeholder or null during server render / initial client render
    return <span>{new Date().getFullYear()}</span>; // Fallback for SSR/SSG, though it might cause brief mismatch
  }

  return <span>{year}</span>;
}
