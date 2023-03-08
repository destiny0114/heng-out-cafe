import styles from "@styles/FormInputs.module.css";
import { InputHTMLAttributes } from "react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
}

export function Input<T extends FieldValues>({ register, name, error, ...rest }: InputProps<T>) {
  return (
    <div className={styles.text_input_wrapper}>
      <input className={styles.text_input} {...(register && register(name))} autoComplete="off" {...rest} />
      {error && <small className={styles.error_message}>{error.message}</small>}
    </div>
  );
}
