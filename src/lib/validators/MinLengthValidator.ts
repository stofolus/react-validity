import { Validator, ValidationState, ValidationData } from "./Validator";

export class MinLengthValidator extends Validator {
  protected id: string = "MinLengthValidator";
  private minLength: number;

  constructor(minLength: number, error: string) {
    super(error);
    this.minLength = minLength;
  }

  validate(value: unknown): ValidationData {
    if (
      typeof value === "string" &&
      value.length > 0 &&
      value.length < this.minLength
    ) {
      return { state: ValidationState.INVALID, error: this.error };
    }

    return { state: ValidationState.VALID };
  }
}
