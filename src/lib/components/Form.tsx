import React, {
  DetailedHTMLProps,
  FormEvent,
  FunctionComponent,
  useCallback,
  useRef,
  useState,
} from "react";
import { FormContext, Input } from "../contexts/FormContext";
import { ValidationState } from "../validators/Validator";

interface Props
  extends Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    "onSubmit"
  > {
  onSubmit: (
    formRef: FormData,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}

export const Form: FunctionComponent<Props> = React.memo(
  ({ children, onSubmit, ...props }) => {
    const formData = useRef(new FormData());
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const internalOnSubmit = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();

        setWasSubmitted(true);
        onSubmit?.(formData.current, event);
      },
      []
    );

    const setInput = useCallback((input: Input) => {
      return formData.current.setInput(input);
    }, []);

    return (
      <form onSubmit={internalOnSubmit} {...props}>
        <FormContext.Provider value={{ setInput, wasSubmitted }}>
          {/**
           * We should probably use a component with React.memo here as a kind of
           * re-render protection which till prevent any updates from this component
           * to propagate further down the tree. This should help immensely with
           * re-renders
           */}
          {children}
        </FormContext.Provider>
      </form>
    );
  }
);

export class FormData {
  public inputs: Input[] = [];

  setInput(newInput: Input) {
    const existingIdx = this.inputs.findIndex(
      (input) => input.id === newInput.id
    );
    if (existingIdx > -1) {
      this.inputs.splice(existingIdx, 1, newInput);
    } else {
      this.inputs.push(newInput);
    }

    return () => {
      const existingIdx = this.inputs.findIndex(
        (input) => input.id === newInput.id
      );
      if (existingIdx > -1) {
        this.inputs.splice(existingIdx, 1);
      }
    };
  }

  resetValidation() {
    this.inputs.forEach((input) => input.resetValidation());
  }

  get isValid(): boolean {
    return this.inputs.every((input) => input.isValid);
  }

  get isInvalid(): boolean {
    return !this.inputs.every((input) => input.isValid);
  }

  get isPending(): boolean {
    return this.inputs.some(
      (input) => input.validationState === ValidationState.PENDING
    );
  }
}
