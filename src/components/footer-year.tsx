"use client";

export function FooterYear() {
  // Directly return the current year without using state
  // This ensures consistent rendering between server and client
  return <>{new Date().getFullYear()}</>;
}