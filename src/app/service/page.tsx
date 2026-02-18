import { redirect } from 'next/navigation';

// Direct redirect — avoids double-hop through /service-awards/
export default function ServicePage() {
  redirect('/about#honors-awards');
}
