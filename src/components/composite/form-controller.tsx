import type { Theme } from "@mui/material/styles";
import type { BaseTextFieldProps } from "@mui/material"
import type { FieldPath, FieldValues} from "react-hook-form";

import { varAlpha } from "minimal-shared/utils";
import { Controller, useFormContext } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers/icons";
import { TextField, FormControl, ToggleButton, Autocomplete, ToggleButtonGroup } from "@mui/material";

import { UploadBox } from "../upload/upload-box";

//---------------------------------------------------------------------------

type BaseControllerProps<T extends FieldValues> = {
  name: FieldPath<T>;
};

interface FormFieldProps extends BaseTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

//---------------------------------------------------------------------------

export function TextFieldController({
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

//---------------------------------------------------------------------------

type ToggleOption = {
  value: string;
  label: string;
};

type ToggleButtonControllerProps<T extends FieldValues> =
  BaseControllerProps<T> & {
    options: ToggleOption[];
    exclusive?: boolean;
  };

export function ToggleButtonController<T extends FieldValues>({
  name,
  options,
  exclusive = true,
}: ToggleButtonControllerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <ToggleButtonGroup
          value={field.value ?? null}
          exclusive={exclusive}
          onChange={(_, value) => {
            field.onChange(value);
          }}
          onBlur={field.onBlur}
        >
          {options.map((option) => (
            <ToggleButton key={option.value} value={option.value}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type DatePickerControllerProps<T extends FieldValues> =
  BaseControllerProps<T> & {
    label?: string;
    fullWidth?: boolean;
  };

export function DatePickerController<T extends FieldValues>({
  name,
  label,
  fullWidth = true,
}: DatePickerControllerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          format="yyyy/MM/dd"
          value={parseStoredDate(field.value)}
          slots={{
            leftArrowIcon: ArrowRightIcon,
            rightArrowIcon: ArrowLeftIcon,
          }}
          onChange={(value) => {
            field.onChange(value && !Number.isNaN(value.getTime()) ? formatStoredDate(value) : "");
          }}
          slotProps={{
            textField: {
              fullWidth,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
              sx: (theme) => ({
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.42),
                  transition: theme.transitions.create(["background-color", "box-shadow"]),
                  "&:hover": {
                    backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.58),
                  },
                  "&.Mui-focused": {
                    backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.72),
                    boxShadow: `0 0 0 4px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.12)}`,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.24),
                  },
                },
              }),
            },
            desktopPaper: { sx: glassDatePickerPaperSx },
            mobilePaper: { sx: glassDatePickerPaperSx },
          }}
        />
      )}
    />
  );
}

function parseStoredDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

function formatStoredDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const glassDatePickerPaperSx = (theme: Theme) => ({
  border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)}`,
  borderRadius: 3,
  backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.76),
  backdropFilter: "blur(20px) saturate(1.4)",
  boxShadow: `0 18px 48px ${varAlpha(theme.vars.palette.grey["900Channel"], 0.22)}`,
  overflow: "hidden",
  "& .MuiPickersDay-root": {
    borderRadius: 2,
    transition: theme.transitions.create(["background-color", "transform"]),
    "&:hover": {
      backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.12),
    },
    "&.Mui-selected": {
      boxShadow: `0 4px 12px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.32)}`,
    },
  },
});

// ----------------------------------------------------------------------

type AutocompleteControllerProps<
  T extends FieldValues,
  Option
> = BaseControllerProps<T> & {
  options: Option[];
  label?: string;
  getOptionLabel: (option: Option) => string;
};

export function AutocompleteController<
  T extends FieldValues,
  Option
>({
  name,
  options,
  label,
  getOptionLabel,
}: AutocompleteControllerProps<T, Option>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={options}
          value={field.value ?? null}
          getOptionLabel={getOptionLabel}
          onChange={(_, value) => {
            field.onChange(value);
          }}
          onBlur={field.onBlur}
          isOptionEqualToValue={(option, value) =>
            option === value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------
type UploadControllerProps<T extends FieldValues> = {
  name: FieldPath<T>;
};

export function UploadController<T extends FieldValues>({
  name,
}: UploadControllerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <UploadBox
          value={field.value ?? []}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
