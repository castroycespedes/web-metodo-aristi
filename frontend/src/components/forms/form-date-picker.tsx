import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { FormInput } from './form-input';

export function FormDatePicker<T extends FieldValues>(
  props: Omit<Parameters<typeof FormInput<T>>[0], 'type'>,
) {
  return <FormInput<T> {...props} type="date" />;
}
