'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function FormMultiSelect({
  label,
  values,
  options,
  onChange,
}: {
  label: string;
  values: string[];
  options: { label: string; value: string }[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = values.includes(option.value);
          return (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={selected ? 'default' : 'outline'}
              onClick={() =>
                onChange(
                  selected
                    ? values.filter((value) => value !== option.value)
                    : [...values, option.value],
                )
              }
            >
              {option.label}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-1">
        {values.map((value) => <Badge key={value} variant="secondary">{value}</Badge>)}
      </div>
    </div>
  );
}
