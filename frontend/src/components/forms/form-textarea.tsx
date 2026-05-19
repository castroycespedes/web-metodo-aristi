import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function FormTextarea<T extends FieldValues>({
  label,
  name,
  register,
  error,
}: {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} {...register(name)} />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
