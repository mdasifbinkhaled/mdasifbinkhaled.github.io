import { NewsFeed } from '@/shared/components/common/news-feed';
import { getNewsItems } from '@/shared/lib/data/news';

/**
 * News Section Component
 * Displays recent news and announcements
 */
export function NewsSection() {
  const newsItems = getNewsItems();

  return (
    <section className="w-full py-8 md:py-10 bg-gradient-to-br from-secondary/30 via-secondary/20 to-transparent">
      <div className="container-responsive">
        <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          News
        </h2>
        <NewsFeed items={newsItems} />
      </div>
    </section>
  );
}
