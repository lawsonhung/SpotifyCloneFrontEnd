import { TextField, type AutocompleteRenderInputParams, type TextFieldVariants } from "@mui/material";
import { useRef, type ChangeEvent } from "react";
import type { SearchMenuItemType } from "../../types/SearchMenuItemOption";

interface ThrottledTextFieldProps {
  onChange: Function,
  delay?: number,
  params: AutocompleteRenderInputParams,
  name: string,
  label: string,
  variant: TextFieldVariants,
  value: SearchMenuItemType[],
}

const ThrottledTextField = ({ onChange, delay = 1000, params, name, label, variant, value }: ThrottledTextFieldProps) => {
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!timeoutRef.current) {

      onChange(e.target.value);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, delay);
    }
  }

  return (
    <TextField
      {...params}
      name={name}
      label={label}
      variant={variant}
      value={value}
      onChange={handleChange}
    />
  )
}

export default ThrottledTextField;