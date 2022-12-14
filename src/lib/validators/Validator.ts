export enum ValidationState {
  VALID = "VALID",
  INVALID = "INVALID",
  PENDING = "PENDING",
}

export interface ValidValidationData {
  state: ValidationState.VALID;
}

export interface InvalidValidationData {
  state: ValidationState.INVALID;
  error: string;
}

export interface PendingValidationData {
  state: ValidationState.PENDING;
}

export type ValidationData =
  | ValidValidationData
  | InvalidValidationData
  | PendingValidationData;

export type AsyncValidationData = Promise<ValidationData>;

export type ValidationResponses = ValidationData | AsyncValidationData;

export abstract class Validator {
  protected abstract id: string;
  protected error: string;

  constructor(error: string) {
    this.error = error;
  }

  public getComparator() {
    return this.id + "_" + this.error;
  }

  abstract validate(value: unknown): ValidationResponses;
}
