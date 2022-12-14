import React, { createContext, RefObject } from "react";
import { ValidationState } from "../validators/Validator";

export class Input {
  public id: string;
  public label: string | React.ReactNode;
  public value: unknown;
  public validationState: ValidationState;
  public resetValidation: () => void;
  public errors: string[] | undefined;
  public scrollToRef: RefObject<HTMLElement> | undefined;

  constructor({
    id,
    label,
    value,
    validationState,
    resetValidation,
    errors,
    scrollToRef,
  }: {
    id: string;
    label: string | React.ReactNode;
    value: unknown;
    validationState: ValidationState;
    resetValidation: () => void;
    errors: string[] | undefined;
    scrollToRef: RefObject<HTMLElement> | undefined;
  }) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.validationState = validationState;
    this.resetValidation = resetValidation;
    this.errors = errors;
    this.scrollToRef = scrollToRef;
  }

  /**
   * Computed values
   */

  public get isValid() {
    return this.validationState === ValidationState.VALID;
  }

  public get isInvalid() {
    return this.validationState !== ValidationState.VALID;
  }
}

export interface FormContextInterface {
  setInput(input: Input): () => void;
  wasSubmitted: boolean;
}

export const FormContext = createContext<FormContextInterface | undefined>(
  undefined
);
