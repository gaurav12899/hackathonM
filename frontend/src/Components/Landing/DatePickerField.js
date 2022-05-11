import React from "react";
import DatePicker from "react-datepicker";
import {useFormikContext } from "formik";
const DatePickerField = ({ ...props }) => {
    const { setFieldValue, validateField, values, handleBlur } = useFormikContext();

  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default DatePickerField;