import React, { FunctionComponent, useId, useRef } from "react";
import { useValidation } from "../../lib/hooks/useValidation";
import { Validator } from "../../lib/validators/Validator";

interface Props {
  label: string;
  value?: string;
  onChange?: (newValue: string) => void;
  validators?: Validator[];
}

export const TextInput: FunctionComponent<Props> = ({
  label,
  value,
  validators,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [validity, errors] = useValidation(value, validators);

  const id = "text_input_" + useId();
  return (
    <div className="text-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        ref={inputRef}
      />
      <div className="error-list">
        {errors && errors.length > 0 && errors[0]}
      </div>
    </div>
  );
};
