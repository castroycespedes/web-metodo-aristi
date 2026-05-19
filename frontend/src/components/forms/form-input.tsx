import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FormInput<T extends FieldValues>({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
}: {
  label: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} {...register(name)} />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
