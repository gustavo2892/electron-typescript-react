import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
  Text,
  Flex
} from "@chakra-ui/react";
import { FieldError, Merge, FieldErrorsImpl, Controller, Control, FieldValues } from "react-hook-form";
import { forwardRef } from "react";

interface SwitchProps extends ChakraSwitchProps {
  nameForm: string;
  control: Control<FieldValues, any>;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  confirmText?: string;
  negativeText?: string;
}

const SwitchBase = (
  { nameForm, label, error = null, control, confirmText = '', negativeText = '', ...rest }: SwitchProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={nameForm}>{label}</FormLabel>}
      <Controller
        render={({ field: { onChange, value } }) => (
          <Flex
            align="center"
            justify="flex-start"
            direction="row"
          >
            <ChakraSwitch
              isChecked={value}
              onChange={(e) => onChange(e.target.checked)}
              id={nameForm}
              ref={ref}
              {...rest}
            >
            </ChakraSwitch>
            {
              (confirmText || negativeText) &&
              <Text fontSize='md' ml={2}>{value ? confirmText : negativeText}</Text>
            }
          </Flex>
        )}
        control={control}
        name={nameForm}
      />
      {!!error && (
        <FormErrorMessage>
          {typeof error?.message === "string" && error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Switch = forwardRef(SwitchBase);
