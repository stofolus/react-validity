import "@testing-library/jest-dom";
import { MaxLengthValidator } from "../MaxLengthValidator";
import { ValidationState } from "../Validator";

describe("RequiredValidaor", () => {
  it("should should have a correct comparator", async () => {
    const errorText = "Max length is 5";
    const validator = new MaxLengthValidator(5, errorText);
    expect(validator.getComparator()).toBe(`MaxLengthValidator_${errorText}`);
  });

  it("should allow undefined", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(undefined);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow null", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(null);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow empty string", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate("");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow 0", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(0);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow numeric values", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(123);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow a space", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(" ");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow false", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(false);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow true", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate(true);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow a text shorter than max length", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate("short");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should not allow a text longer than max length", async () => {
    const validator = new MaxLengthValidator(5, "Max length is 5");
    const result = validator.validate("longer");
    expect(result.state).toBe(ValidationState.INVALID);
  });

  it("should return the provided error", async () => {
    const errorMessage = "Max length is 5";
    const validator = new MaxLengthValidator(5, errorMessage);
    const result = validator.validate("longer");
    if (
      result.state === ValidationState.VALID ||
      result.state === ValidationState.PENDING
    ) {
      fail("state should be INVALID");
    }
    expect(result.error).toBe(errorMessage);
  });
});
