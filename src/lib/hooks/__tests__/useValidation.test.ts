import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { useValidation } from "../useValidation";
import { RequiredValidator } from "../../validators/RequiredValidator";
import { ValidationState } from "../../validators/Validator";

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
});
