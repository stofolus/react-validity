import { Validator, ValidationState, ValidationData } from "./Validator";

export class RequiredValidator extends Validator {
  protected id: string = "RequiredValidator";

  validate(value: unknown): ValidationData {
    if (typeof value === "undefined" || value === null) {
      return { state: ValidationState.INVALID, error: this.error };
    }
    if (typeof value === "string" && value.length === 0) {
      return { state: ValidationState.INVALID, error: this.error };
    }

    return { state: ValidationState.VALID };
  }
}
