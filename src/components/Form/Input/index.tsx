import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  nameForm: string;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { nameForm, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={nameForm}>{label}</FormLabel>}
      <ChakraInput
        name={nameForm}
        id={nameForm}
        focusBorderColor="pink.500"
        ref={ref}
        size="lg"
        {...rest}
      />
      {!!error && (
        <FormErrorMessage>
          {typeof error?.message === "string" && error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
