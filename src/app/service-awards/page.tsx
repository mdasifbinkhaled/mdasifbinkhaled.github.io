import { redirect } from 'next/navigation';

export default function ServiceAwardsPage() {
  // Service & Awards content has been merged into the About page
  redirect('/about#honors-awards');
}
