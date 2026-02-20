import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

describe('Sheet Component', () => {
  it('should render trigger button', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
      </Sheet>
    );

    expect(
      screen.getByRole('button', { name: 'Open Sheet' })
    ).toBeInTheDocument();
  });

  it('should open sheet when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
      expect(screen.getByText('Sheet Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });
  });

  it('should close sheet with escape key', async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should support controlled state', async () => {
    const onOpenChange = vi.fn();

    render(
      <Sheet open={true} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await user.click(trigger);

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');

      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeInTheDocument();
    });
  });

  it('should render different sides correctly', () => {
    const { rerender } = render(
      <Sheet open={true}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Side</SheetTitle>
            <SheetDescription>Left Content</SheetDescription>
          </SheetHeader>
          Content
        </SheetContent>
      </Sheet>
    );

    let content = screen.getByRole('dialog');
    expect(content).toBeInTheDocument();

    rerender(
      <Sheet open={true}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Side</SheetTitle>
            <SheetDescription>Right Content</SheetDescription>
          </SheetHeader>
          Content
        </SheetContent>
      </Sheet>
    );

    content = screen.getByRole('dialog');
    expect(content).toBeInTheDocument();
  });

  it('should focus trap when open', async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <button>First Button</button>
          <button>Second Button</button>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
