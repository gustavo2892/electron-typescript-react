import { forwardRef } from "react";
import {
  Stack,
  Radio,
  RadioGroup as ChakraRadioGroup,
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

interface RadioGroupProps {
  nameForm: string;
  options: Option[];
  control: Control<FieldValues, any>;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const RadioGroupBase = (
  { nameForm, error, label, options, control }: RadioGroupProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel as="legend">{label}</FormLabel>}
      <Controller
        render={({ field: { onChange, value } }) => (
          <ChakraRadioGroup onChange={onChange} value={value} ref={ref}>
            <Stack direction="row">
              {options.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Stack>
          </ChakraRadioGroup>
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

export const RadioGroup = forwardRef(RadioGroupBase);
