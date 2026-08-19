import { Controller, useFormContext } from "react-hook-form";
import { BaseTextFieldProps, FormControl, FormLabel, TextField } from "@mui/material";

//---------------------------------------------------------------------------

interface FormFieldProps extends BaseTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

//---------------------------------------------------------------------------

export function FormField({
  name,
  label,
  placeholder,
  ...props
}: FormFieldProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <FormControl fullWidth>
      {/* <FormLabel sx={{ fontSize: "1.25rem" }}>{label}</FormLabel> */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            // margin="dense"
            error={!!error}
            helperText={error?.message?.toString()}
            slotProps={{
              input: {
                inputMode: "none",
                autoComplete: "off",
              },
            }}
            {...props}
          />
        )}
      />
    </FormControl>
  );
}
