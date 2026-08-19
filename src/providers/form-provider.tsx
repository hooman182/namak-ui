
import { FormProvider as RHFForm, type UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type FormProps = {
  onSubmit?: () => void;
  children: React.ReactNode;
  method: UseFormReturn<any>;
};

// ----------------------------------------------------------------------

export default function Form({ onSubmit, children, method }: FormProps) {
  return (
    <RHFForm {...method}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  )
}
