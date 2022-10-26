import styled from "@emotion/styled";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export interface DatePickerProps extends ReactDatePickerProps {
  selected?: Date;
}

export const DatePicker = styled(ReactDatePicker)<DatePickerProps>``;