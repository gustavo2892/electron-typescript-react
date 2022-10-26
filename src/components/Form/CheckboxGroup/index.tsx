import { forwardRef } from "react";
import {
  Stack,
  Checkbox,
  CheckboxGroup as ChakraCheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  Controller,
  Control,
  FieldValues,
} from "react-hook-form";
import { Option } from "../../../models/form";

interface CheckboxGroupProps {
  nameForm: string;
  options: Option[];
  control: Control<FieldValues, any>;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const CheckboxGroupBase = (
  { nameForm, error, label, options, control }: CheckboxGroupProps,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel as="legend">{label}</FormLabel>}
      <Controller
        render={({ field: { onChange, value } }) => (
          <ChakraCheckboxGroup onChange={onChange} value={value}>
            <Stack direction="row">
              {options.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Stack>
          </ChakraCheckboxGroup>
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

export const CheckboxGroup = forwardRef(CheckboxGroupBase);
