import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/shared/components/ui/alert';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { SpotlightCard } from '@/shared/components/ui/spotlight-card';
import React from 'react';

// ─── Button ──────────────────────────────────────────────────────────────────
describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button.className).toContain('bg-destructive');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button', { name: /outline/i });
    expect(button.className).toContain('border');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button.className).toContain('hover:bg-accent');
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole('button', { name: /link/i });
    expect(button.className).toContain('underline-offset-4');
  });

  it('renders small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button', { name: /small/i });
    expect(button.className).toContain('h-9');
  });

  it('renders large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button', { name: /large/i });
    expect(button.className).toContain('h-11');
  });

  it('renders icon size', () => {
    render(<Button size="icon">X</Button>);
    const button = screen.getByRole('button', { name: /x/i });
    expect(button.className).toContain('w-10');
  });

  it('forwards onClick handler', () => {
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('disables the button when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});

// ─── Card ────────────────────────────────────────────────────────────────────
describe('Card', () => {
  it('renders all card sub-components', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId('card').className).toContain('custom-class');
  });

  it('CardTitle renders as h3', () => {
    render(<CardTitle>Heading</CardTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});

// ─── Badge ───────────────────────────────────────────────────────────────────
describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText('Secondary');
    expect(badge.className).toContain('bg-secondary');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge.className).toContain('text-foreground');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge.className).toContain('bg-destructive');
  });

  it('applies custom className', () => {
    render(<Badge className="custom">Custom</Badge>);
    expect(screen.getByText('Custom').className).toContain('custom');
  });
});

// ─── Alert ───────────────────────────────────────────────────────────────────
describe('Alert', () => {
  it('renders with role="alert"', () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders default variant', () => {
    render(<Alert data-testid="alert">Info</Alert>);
    expect(screen.getByTestId('alert').className).toContain('bg-background');
  });

  it('renders destructive variant', () => {
    render(
      <Alert variant="destructive" data-testid="alert">
        Error
      </Alert>
    );
    expect(screen.getByTestId('alert').className).toContain('destructive');
  });
});

// ─── CollapsibleSection ──────────────────────────────────────────────────────
describe('CollapsibleSection', () => {
  it('renders title and children', () => {
    render(
      <CollapsibleSection
        title="Section Title"
        icon={<span data-testid="icon">📚</span>}
      >
        <p>Section content</p>
      </CollapsibleSection>
    );
    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('defaults to open state', () => {
    render(
      <CollapsibleSection title="Open" icon={<span>📚</span>}>
        <p>Visible</p>
      </CollapsibleSection>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('can start collapsed', () => {
    render(
      <CollapsibleSection
        title="Closed"
        icon={<span>📚</span>}
        defaultOpen={false}
      >
        <p>Hidden</p>
      </CollapsibleSection>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles on click', () => {
    render(
      <CollapsibleSection title="Toggle" icon={<span>📚</span>}>
        <p>Content</p>
      </CollapsibleSection>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});

// ─── SpotlightCard ───────────────────────────────────────────────────────────
describe('SpotlightCard', () => {
  it('renders children', () => {
    render(
      <SpotlightCard>
        <p>Spotlight content</p>
      </SpotlightCard>
    );
    expect(screen.getByText('Spotlight content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SpotlightCard className="custom-spot">
        <p>Content</p>
      </SpotlightCard>
    );
    expect(container.querySelector('.custom-spot')).toBeInTheDocument();
  });

  it('has spotlight overlay element', () => {
    const { container } = render(
      <SpotlightCard>
        <p>Content</p>
      </SpotlightCard>
    );
    const overlay = container.querySelector('.pointer-events-none');
    expect(overlay).toBeInTheDocument();
  });
});
