import { useContext } from "react";
import { FormContext, FormContextInterface } from "../contexts/FormContext";

export function useFormContext(): FormContextInterface | undefined {
  const formContext = useContext(FormContext);

  return formContext;
}
