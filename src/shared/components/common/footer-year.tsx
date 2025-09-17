'use client';

import React from 'react';

// Memoized component since the year only changes once per year
export const FooterYear = React.memo(function FooterYear() {
  return <>{new Date().getFullYear()}</>;
});

FooterYear.displayName = 'FooterYear';
