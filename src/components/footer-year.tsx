"use client";

import { useState, useEffect } from 'react';

export function FooterYear() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Render null (or a placeholder) initially until the year is set on the client
  if (currentYear === null) {
    return null; 
  }

  return <span>{currentYear}</span>;
}
