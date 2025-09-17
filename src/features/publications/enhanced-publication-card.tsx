'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import {
  FileText,
  Code,
  ExternalLink,
  Quote,
  Users,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
} from 'lucide-react';

interface Author {
  name: string;
  isCorresponding?: boolean;
  isFirstAuthor?: boolean;
  isMe?: boolean;
}

interface PublicationUrls {
  paper?: string;
  preprint?: string;
  code?: string;
  data?: string;
  demo?: string;
  slides?: string;
}

interface EnhancedPublication {
  id: string;
  title: string;
  authors: Author[];
  venue: string;
  year: number;
  type: 'conference' | 'journal' | 'workshop' | 'preprint' | 'book-chapter';
  abstract?: string;
  keywords: string[];
  citations?: number;
  impactFactor?: number;
  urls: PublicationUrls;
  awards?: string[];
  featured?: boolean;
  status?: 'published' | 'accepted' | 'under-review' | 'in-preparation';
}

export function EnhancedPublicationCard({
  publication,
}: {
  publication: EnhancedPublication;
}) {
  const [showAbstract, setShowAbstract] = useState(false);
  const [showFullAuthors, setShowFullAuthors] = useState(false);

  const getVenueTypeStyle = (type: string) => {
    const styles = {
      conference:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      journal:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      workshop:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      preprint: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      'book-chapter':
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return styles[type as keyof typeof styles] || styles.preprint;
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      published:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'under-review':
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'in-preparation':
        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    };
    return styles[status as keyof typeof styles] || styles['in-preparation'];
  };

  const renderAuthors = () => {
    const displayAuthors = showFullAuthors
      ? publication.authors
      : publication.authors.slice(0, 5);
    const hasMoreAuthors = publication.authors.length > 5;

    return (
      <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Users className="w-4 h-4 flex-shrink-0" />
        <span className="flex flex-wrap items-center gap-1">
          {displayAuthors.map((author, index) => (
            <span
              key={index}
              className={`
              ${author.isMe ? 'font-semibold text-foreground' : ''}
              ${author.isCorresponding ? 'underline' : ''}
            `}
            >
              {author.name}
              {author.isFirstAuthor && <sup className="text-primary">*</sup>}
              {author.isCorresponding && <sup className="text-primary">†</sup>}
              {index < displayAuthors.length - 1 && (
                <span className="text-muted-foreground">, </span>
              )}
            </span>
          ))}
          {hasMoreAuthors && !showFullAuthors && (
            <>
              <span className="text-muted-foreground">, </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullAuthors(true)}
                className="h-auto p-0 text-xs text-primary hover:text-primary/80"
              >
                +{publication.authors.length - 5} more
              </Button>
            </>
          )}
          {hasMoreAuthors && showFullAuthors && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullAuthors(false)}
              className="h-auto p-0 text-xs text-primary hover:text-primary/80 ml-1"
            >
              (show less)
            </Button>
          )}
        </span>
      </div>
    );
  };

  return (
    <Card
      className={`
      transition-all duration-200 hover:shadow-lg group
      ${publication.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
    `}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-lg font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">
              {publication.title}
            </h3>

            {/* Authors */}
            <div className="mb-3">
              {renderAuthors()}
              {(publication.authors.some((a) => a.isFirstAuthor) ||
                publication.authors.some((a) => a.isCorresponding)) && (
                <div className="text-xs text-muted-foreground mt-1">
                  {publication.authors.some((a) => a.isFirstAuthor) && (
                    <span>* First author</span>
                  )}
                  {publication.authors.some((a) => a.isFirstAuthor) &&
                    publication.authors.some((a) => a.isCorresponding) && (
                      <span className="mx-2">•</span>
                    )}
                  {publication.authors.some((a) => a.isCorresponding) && (
                    <span>† Corresponding author</span>
                  )}
                </div>
              )}
            </div>

            {/* Venue and Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={getVenueTypeStyle(publication.type)}>
                {publication.type.toUpperCase().replace('-', ' ')}
              </Badge>
              <span className="text-sm font-medium">{publication.venue}</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {publication.year}
              </Badge>
              {publication.status && publication.status !== 'published' && (
                <Badge className={getStatusStyle(publication.status)}>
                  {publication.status.replace('-', ' ').toUpperCase()}
                </Badge>
              )}
            </div>

            {/* Awards */}
            {publication.awards && publication.awards.length > 0 && (
              <div className="flex items-center gap-1 mb-3">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                  {publication.awards.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Featured Badge */}
          {publication.featured && (
            <Badge
              variant="default"
              className="flex items-center gap-1 bg-primary"
            >
              <Star className="w-3 h-3" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Abstract Toggle */}
        {publication.abstract && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAbstract(!showAbstract)}
              className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
            >
              <Quote className="w-4 h-4 mr-1" />
              {showAbstract ? 'Hide' : 'Show'} Abstract
              {showAbstract ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </Button>

            {showAbstract && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm leading-relaxed">
                  {publication.abstract}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Keywords */}
        {publication.keywords.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1">
              {publication.keywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Metrics and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {publication.citations !== undefined && (
              <div className="flex items-center gap-1">
                <Quote className="w-4 h-4" />
                <span>
                  {publication.citations} citation
                  {publication.citations !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            {publication.impactFactor && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>IF: {publication.impactFactor}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {publication.urls.paper && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={publication.urls.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Paper
                </a>
              </Button>
            )}
            {publication.urls.preprint && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={publication.urls.preprint}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Preprint
                </a>
              </Button>
            )}
            {publication.urls.code && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={publication.urls.code}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {publication.urls.demo && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={publication.urls.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
