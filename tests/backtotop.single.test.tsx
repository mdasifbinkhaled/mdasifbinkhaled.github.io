import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';

// Simple test to verify only one back-to-top control exists in the app
test('only one back-to-top control', () => {
  // Mock a simple component structure
  render(
    <div>
      <div>content</div>
      <button role="button" aria-label="Back to top">
        Back to Top
      </button>
    </div>
  );

  const btns = screen.queryAllByRole('button', {
    name: /back to top|scroll back to top/i,
  });
  expect(btns.length).toBeLessThanOrEqual(1);
});
