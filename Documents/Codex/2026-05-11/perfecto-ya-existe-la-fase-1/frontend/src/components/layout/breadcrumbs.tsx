'use client';

import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const parts = usePathname().split('/').filter(Boolean);
  const labels = parts.length ? parts : ['dashboard'];

  return (
    <div className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
      {labels.map((part, index) => (
        <div key={`${part}-${index}`} className="flex items-center gap-1">
          {index > 0 ? <ChevronRight className="h-3 w-3" /> : null}
          <span className={index === labels.length - 1 ? 'text-foreground' : ''}>
            {part.replaceAll('-', ' ')}
          </span>
        </div>
      ))}
    </div>
  );
}
