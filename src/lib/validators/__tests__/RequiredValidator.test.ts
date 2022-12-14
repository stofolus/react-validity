import "@testing-library/jest-dom";
import { RequiredValidator } from "../RequiredValidator";
import { ValidationState } from "../Validator";

describe("RequiredValidaor", () => {
  it("should should have a correct comparator", async () => {
    const errorText = "Value is required";
    const validator = new RequiredValidator(errorText);
    expect(validator.getComparator()).toBe(`RequiredValidator_${errorText}`);
  });

  it("should not allow undefined", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(undefined);
    expect(result.state).toBe(ValidationState.INVALID);
  });

  it("should not allow null", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(null);
    expect(result.state).toBe(ValidationState.INVALID);
  });

  it("should not allow empty string", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate("");
    expect(result.state).toBe(ValidationState.INVALID);
  });

  it("should allow 0", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(0);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow numeric values", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(123);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow a space", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(" ");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow text", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate("text");
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow false", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(false);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should allow true", async () => {
    const validator = new RequiredValidator("Value is required");
    const result = validator.validate(true);
    expect(result.state).toBe(ValidationState.VALID);
  });

  it("should return the provided error", async () => {
    const errorMessage = "Max length is 5";
    const validator = new RequiredValidator(errorMessage);
    const result = validator.validate("");
    if (
      result.state === ValidationState.VALID ||
      result.state === ValidationState.PENDING
    ) {
      fail("state should be INVALID");
    }
    expect(result.error).toBe(errorMessage);
  });
});
