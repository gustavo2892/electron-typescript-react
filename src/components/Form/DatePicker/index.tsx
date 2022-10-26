import { forwardRef } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FieldError, Merge, FieldErrorsImpl, Control, FieldValues, Controller } from "react-hook-form";
import ptBR from 'date-fns/locale/pt-BR';

import * as S from "./styles";

interface DatePickerProps {
  control: Control<FieldValues, any>;
  nameForm: string;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const DatePickerBase = (
  { nameForm, label, error, control }: DatePickerProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error} w="100%">
      {!!label && <FormLabel as="legend">{label}</FormLabel>}
      <Controller
        render={({ field: { onChange, value } }) => (
          <S.DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date: Date) => onChange(date)}
            ref={ref}
            customInput={
              <Input
                focusBorderColor="pink.500"
                size="lg"
              />
            }
            popperPlacement="top"
            locale={ptBR}
            dateFormat="dd/MM/yyyy"
          />
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

export const DatePicker = forwardRef(DatePickerBase);
