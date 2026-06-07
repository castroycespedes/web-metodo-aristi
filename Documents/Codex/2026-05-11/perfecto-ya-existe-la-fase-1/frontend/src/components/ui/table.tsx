import * as React from 'react';
import { cn } from '@/lib/utils';

export const Table = ({ className, ...props }: React.ComponentProps<'table'>) => (
  <div className="w-full overflow-auto">
    <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
);
export const TableHeader = (props: React.ComponentProps<'thead'>) => <thead {...props} />;
export const TableBody = (props: React.ComponentProps<'tbody'>) => <tbody {...props} />;
export const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => (
  <tr className={cn('border-b transition-colors hover:bg-muted/50', className)} {...props} />
);
export const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => (
  <th className={cn('h-10 px-3 text-left align-middle text-xs font-medium uppercase text-muted-foreground', className)} {...props} />
);
export const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <td className={cn('p-3 align-middle', className)} {...props} />
);
