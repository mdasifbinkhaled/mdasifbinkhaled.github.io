import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import { Megaphone, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface Notice {
  id: string;
  title: string;
  date: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  link?: string;
  importance: 'high' | 'medium' | 'low';
}

interface NoticeBoardProps {
  notices: Notice[];
}

export function NoticeBoard({ notices }: NoticeBoardProps) {
  if (!notices.length) return null;

  const getIcon = (type: Notice['type']) => {
    switch (type) {
      case 'alert':
        return AlertCircle;
      case 'warning':
        return Megaphone;
      case 'success':
        return CheckCircle2;
      default:
        return Info;
    }
  };

  const getVariant = (type: Notice['type']) => {
    switch (type) {
      case 'alert':
        return 'destructive';
      case 'warning':
        return 'default'; // Using default for warning-like visual if simplified
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-4">
      {notices.map((notice) => {
        const Icon = getIcon(notice.type);
        return (
          <Alert
            key={notice.id}
            variant={getVariant(notice.type)}
            className={`
            ${notice.type === 'info' ? 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400' : ''}
            ${notice.type === 'success' ? 'border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400' : ''}
          `}
          >
            <Icon className="h-4 w-4" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
              <div>
                <AlertTitle className="mb-1 flex items-center gap-2">
                  {notice.title}
                  {notice.importance === 'high' && (
                    <span className="text-[10px] uppercase bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                      New
                    </span>
                  )}
                </AlertTitle>
                <AlertDescription>
                  Posted on {new Date(notice.date).toLocaleDateString()}
                </AlertDescription>
              </div>
              {notice.link && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="shrink-0 bg-background/50"
                >
                  <a
                    href={notice.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </Button>
              )}
            </div>
          </Alert>
        );
      })}
    </div>
  );
}
