'use client';

import { Calendar, Clock, MapPin, Mail, CalendarPlus } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config/site';

interface TimeSlot {
  id: string;
  day: string;
  time: string;
  type: 'In-Person' | 'Online';
  location: string;
}

const OFFICE_HOURS: TimeSlot[] = [
  {
    id: '1',
    day: 'Sunday',
    time: '11:00 AM - 1:00 PM',
    type: 'In-Person',
    location: 'UB 0503',
  },
  {
    id: '2',
    day: 'Tuesday',
    time: '11:00 AM - 1:00 PM',
    type: 'In-Person',
    location: 'UB 0503',
  },
  {
    id: '3',
    day: 'Wednesday',
    time: '2:00 PM - 4:00 PM',
    type: 'Online',
    location: 'Google Meet',
  },
];

export function OfficeHoursBooker() {
  const getBookingEmail = (slot: TimeSlot) => {
    const subject = encodeURIComponent(
      `Office Hours Request: ${slot.day} at ${slot.time}`
    );
    const body = encodeURIComponent(
      `Hi ${siteConfig.author.split(' ')[0]},\n\nI would like to reserve a 1-on-1 counseling slot on ${slot.day} between ${slot.time}.\n\nTopic of discussion:\n\nThank you.`
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {OFFICE_HOURS.map((slot) => (
            <Card
              key={slot.id}
              className="relative overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className={`absolute top-0 right-0 w-2 h-full ${slot.type === 'In-Person' ? 'bg-primary' : 'bg-emerald-500'}`}
              />
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    {slot.day}
                  </CardTitle>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${slot.type === 'In-Person' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}
                  >
                    {slot.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{slot.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full gap-2" variant="secondary" asChild>
                  <a href={getBookingEmail(slot)}>
                    <Mail className="h-4 w-4" />
                    Request Slot
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarPlus className="h-5 w-5 text-primary" />
              Scheduling Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Office hours are dedicated blocks of time for students to ask
              questions, seek academic and career advice, and discuss course
              material outside of lectures.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Please request a slot at least <strong>24 hours</strong> in
                advance.
              </li>
              <li>
                Requests without a specified discussion topic may be
                deprioritized.
              </li>
              <li>For urgent matters, mark the email subject as [URGENT].</li>
            </ul>
            <div className="pt-4 mt-4 border-t border-primary/10">
              <Button asChild variant="default" className="w-full gap-2">
                <a href={`mailto:${siteConfig.email}?subject=General Inquiry`}>
                  <Mail className="h-4 w-4" /> Direct Email
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
