import React, { useState } from "react";
import { Form } from "../lib/components/Form";
import { RequiredValidator } from "../lib/validators/RequiredValidator";
import { TextInput } from "./components/TextInput";
import "./Example.css";

export const Example = () => {
  const [input1, setInput1] = useState("");
  return (
    <main className="example-page">
      <h1>Example login</h1>
      <Form
        onSubmit={(formData) => {
          console.log("onSubmit");
          console.log(formData.isValid);
        }}
      >
        <TextInput
          label="Input 1"
          value={input1}
          onChange={setInput1}
          validators={[new RequiredValidator("Field 1 is required")]}
        />
        <button type="submit">Submit me!</button>
      </Form>
    </main>
  );
};
