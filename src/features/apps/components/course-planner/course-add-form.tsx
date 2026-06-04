'use client';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface CourseAddFormProps {
  newCode: string;
  newTitle: string;
  newCredits: string;
  newPrereqs: string;
  onCodeChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onCreditsChange: (value: string) => void;
  onPrereqsChange: (value: string) => void;
  onAdd: () => void;
}

export function CourseAddForm({
  newCode,
  newTitle,
  newCredits,
  newPrereqs,
  onCodeChange,
  onTitleChange,
  onCreditsChange,
  onPrereqsChange,
  onAdd,
}: CourseAddFormProps) {
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input
            aria-label="Course code"
            placeholder="Course code (e.g. CSE 211)"
            value={newCode}
            onChange={(e) => onCodeChange(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Input
            aria-label="Course title"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Input
            aria-label="Credits"
            type="number"
            placeholder="Credits"
            min="1"
            max="6"
            value={newCredits}
            onChange={(e) => onCreditsChange(e.target.value)}
          />
          <Input
            aria-label="Prerequisites (comma-separated codes)"
            placeholder="Prerequisites (codes, comma-sep)"
            value={newPrereqs}
            onChange={(e) => onPrereqsChange(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Button onClick={onAdd}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}
