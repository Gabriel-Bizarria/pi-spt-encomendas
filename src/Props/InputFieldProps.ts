import { InputHTMLAttributes } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelTop: boolean;
  label: string;
  error?: boolean;
  errorMessage?: string;
  max?: number;
}
