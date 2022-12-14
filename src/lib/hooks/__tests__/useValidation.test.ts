import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { useValidation } from "../useValidation";
import { RequiredValidator } from "../../validators/RequiredValidator";
import { ValidationState } from "../../validators/Validator";
import { MinLengthValidator } from "../../validators/MinLengthValidator";

describe("useValidation", () => {
  test("Should have errors when invalid", async () => {
    const errorMessage = "Value is required";
    const value = "";
    const { result } = renderHook(() =>
      useValidation(value, [new RequiredValidator(errorMessage)])
    );

    expect(result.current[0]).toBe(ValidationState.INVALID);
    expect(result.current[1]?.[0]).toBe(errorMessage);
  });

  test("Should not have errors when successful", async () => {
    const errorMessage = "Value is required";
    const value = "Value";
    const { result } = renderHook(() =>
      useValidation(value, [new RequiredValidator(errorMessage)])
    );

    expect(result.current[0]).toBe(ValidationState.VALID);
    expect(result.current[1]).toBe(undefined);
  });

  test("Should validate valid strings with multiple validators", async () => {
    const value = "Long enough";
    const { result } = renderHook(() =>
      useValidation(value, [
        new RequiredValidator("Value is required"),
        new MinLengthValidator(5, "Minimum length is 5"),
      ])
    );

    expect(result.current[0]).toBe(ValidationState.VALID);
  });

  test("Should validate invalid strings with multiple validators", async () => {
    const value = "Short";
    const { result } = renderHook(() =>
      useValidation(value, [
        new RequiredValidator("Value is required"),
        new MinLengthValidator(7, "Minimum length is 7"),
      ])
    );

    expect(result.current[0]).toBe(ValidationState.INVALID);
  });
});
