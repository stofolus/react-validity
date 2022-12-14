import { Validator, ValidationState, ValidationData } from "./Validator";

export class MaxLengthValidator extends Validator {
  protected id: string = "MaxLengthValidator";
  private maxLength: number;

  constructor(maxLength: number, error: string) {
    super(error);
    this.maxLength = maxLength;
  }

  validate(value: unknown): ValidationData {
    if (typeof value === "string" && value.length > this.maxLength) {
      return { state: ValidationState.INVALID, error: this.error };
    }

    return { state: ValidationState.VALID };
  }
}
