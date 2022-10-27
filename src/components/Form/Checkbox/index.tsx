import { forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from "@chakra-ui/react";
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  Controller,
  Control,
  FieldValues,
} from "react-hook-form";

interface CheckboxProps extends ChakraCheckboxProps {
  nameForm: string;
  control: Control<FieldValues, any>;
  label: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const CheckboxBase = (
  { nameForm, error, label, control, ...rest }: CheckboxProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <ChakraCheckbox
            name={nameForm}
            isChecked={value}
            onChange={(e) => onChange(e.target.checked)}
            ref={ref}
            // colorScheme="primary"
            {...rest}
          >
            {label}
          </ChakraCheckbox>
        )}
        name={nameForm}
        control={control}
      />
      {!!error && (
        <FormErrorMessage>
          {typeof error?.message === "string" && error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
