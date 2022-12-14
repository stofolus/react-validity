import "@testing-library/jest-dom";
import { MinLengthValidator } from "../MinLengthValidator";
import { ValidationState } from "../Validator";

describe("RequiredValidaor", () => {
  it("should should have a correct comparator", async () => {
    const errorText = "Min length is 5";
    const validator = new MinLengthValidator(5, errorText);
    expect(validator.getComparator()).toBe(`MinLengthValidator_${errorText}`);
  });

  it("should allow undefined", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate(undefined);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow null", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate(null);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow empty string", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate("");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow 0", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate(0);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow numeric values", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate(123);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow false", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate(false);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow true", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate(true);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should not allow a text shorter than Min length", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate("abc");
    expect(result.state).toBe(ValidationState.INVALID);
  });

  it("should allow a text longer than Min length", async () => {
    const validator = new MinLengthValidator(5, "Min length is 5");
    const result = validator.validate("longer");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should return the provided error", async () => {
    const errorMessage = "Min length is 5";
    const validator = new MinLengthValidator(5, errorMessage);
    const result = validator.validate("abc");
    if (
      result.state === ValidationState.VALID ||
      result.state === ValidationState.PENDING
    ) {
      fail("state should be INVALID");
    }
    expect(result.error).toBe(errorMessage);
  });
});
