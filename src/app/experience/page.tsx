import { redirect } from 'next/navigation';

export default function ExperiencePage() {
  // Experience content has been merged into the About page
  redirect('/about#experience');
}
