import { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';

interface TimeDisplayProps {
  userTimezone: string; // e.g., 'Asia/Dhaka'
  isCollapsed?: boolean;
}

export function TimeDisplay({
  userTimezone,
  isCollapsed = false,
}: TimeDisplayProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000); // Update every second to keep synced, though we usually show minutes

    return () => clearInterval(timer);
  }, []);

  if (!mounted || !now) return null;

  // Format options for 12-hour time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  // 1. My Time (Dhaka)
  const myTime = new Intl.DateTimeFormat('en-US', {
    ...timeOptions,
    timeZone: userTimezone,
  }).format(now);

  const myDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    timeZone: userTimezone,
  }).format(now);

  // 2. Your Time (Local Viewer)
  // We use the browser's default timezone
  const yourTime = new Intl.DateTimeFormat('en-US', {
    ...timeOptions,
  }).format(now);

  const yourDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
  }).format(now);

  // Render collapsed view (icon only or minimal)
  if (isCollapsed) {
    return (
      <div
        className="flex justify-center w-full py-2 hover:bg-sidebar-accent/50 rounded-md transition-colors cursor-help"
        title={`My Time: ${myTime}\nYour Time: ${yourTime}`}
      >
        <Clock className="w-4 h-4 text-sidebar-foreground/60" />
      </div>
    );
  }

  return (
    <div className="mt-4 px-3 py-3 rounded-lg bg-sidebar-accent/20 border border-sidebar-border/30 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-sidebar-foreground/50 font-medium uppercase tracking-wider text-[10px]">
          My Time (Dhaka)
        </span>
        <span className="text-orange-500/80">
          <Globe className="w-3 h-3" />
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-mono font-semibold text-sidebar-foreground">
          {myTime}
        </span>
        <span className="text-[10px] text-sidebar-foreground/50">{myDate}</span>
      </div>

      <div className="h-px w-full bg-sidebar-border/30 my-1" />

      <div className="flex items-center justify-between text-xs">
        <span className="text-sidebar-foreground/50 font-medium uppercase tracking-wider text-[10px]">
          Your Time
        </span>
        <span className="text-blue-500/80">
          <Clock className="w-3 h-3" />
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-mono font-semibold text-sidebar-foreground">
          {yourTime}
        </span>
        <span className="text-[10px] text-sidebar-foreground/50">
          {yourDate}
        </span>
      </div>
    </div>
  );
}
