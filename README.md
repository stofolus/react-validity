# React validity

## Core principles

- Validators validate one thing and one thing only. This allow for precise error messages that help guide the user.
- Validation does not require a context or the `<Form>` component and can be done from any component. Not just inputs.
- `useValidation` and `<Form>` should only create the absolute minimum amount of re-renders
- Everything should have tests
- There should be a reactive API for building accessable components like an error list
- `useValidation` will only be async if has async validators. This will decrease the number of re-renders and prevent unnecessary pending states in the components
