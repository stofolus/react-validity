import { useEffect, useId, useState } from "react";
import { Input } from "../contexts/FormContext";
import {
  Validator,
  ValidationState,
  AsyncValidationData,
  ValidationResponses,
  ValidationData,
  InvalidValidationData,
} from "../validators/Validator";
import { useFormContext } from "./useFormContext";

type ValidResponse = [validity: ValidationState.VALID, errors: undefined];
type InvalidResponse = [validity: ValidationState.INVALID, errors: string[]];
type PendingResponse = [validity: ValidationState.PENDING, errors: undefined];

type useValidationResponse = ValidResponse | InvalidResponse | PendingResponse;

export function useValidation(
  value: unknown,
  validators: Validator[] = [],
  id?: string
): useValidationResponse {
  const generatedId = "input__" + useId();
  const formContext = useFormContext();
  const [response, setResponse] = useState<useValidationResponse>([
    ValidationState.PENDING,
    undefined,
  ]);

  const inputId = id ?? generatedId;

  useEffect(() => {
    setResponse(validate(value, validators));

    /**
     * We do not want validators in here. This is to prevent new instances with the same logic
     * from running the validation to often
     */
  }, [value, getComparators(validators)]);

  useEffect(() => {
    const input = new Input({
      id: inputId,
      label: undefined,
      value: value,
      validationState: response[0],
      resetValidation: () => {},
      errors: response[1],
      scrollToRef: undefined,
    });
    const removeInput = formContext?.setInput(input);

    return () => {
      removeInput?.();
    };
  }, [JSON.stringify(response)]);

  return response;
}

function validate(
  value: unknown,
  validators: Validator[]
): useValidationResponse {
  const validationData = runValidators(value, validators);
  if (!isSyncStateList(validationData)) {
    throw new Error("Async validators are not yet supported");
  }

  if (isValid(validationData)) {
    return [ValidationState.VALID, undefined];
  }

  const errors = validationData
    .filter(
      (data): data is InvalidValidationData =>
        data.state === ValidationState.INVALID
    )
    .map((data) => data.error);

  return [ValidationState.INVALID, errors];
}

function runValidators(
  value: unknown,
  validators: Validator[]
): ValidationResponses[] {
  return validators.map((validator) => validator.validate(value));
}

function isSyncStateList(
  data: ValidationResponses[]
): data is ValidationData[] {
  return data.every(
    (data) =>
      typeof data === "object" &&
      typeof (data as AsyncValidationData).then === "undefined"
  );
}

function hasAsyncState(data: ValidationResponses[]) {
  return data.some((data) => isAsyncState(data));
}

function isAsyncState(data: ValidationResponses): data is AsyncValidationData {
  return (
    typeof data === "object" &&
    typeof (data as AsyncValidationData).then === "function"
  );
}

function isValid(data: ValidationData[]) {
  return data.every((data) => data.state === ValidationState.VALID);
}

function getComparators(validators: Validator[]) {
  return validators.map((validator) => validator.getComparator()).join("|");
}
