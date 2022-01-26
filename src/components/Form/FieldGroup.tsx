import React from "react";
import { Field } from "./Field";

export const FieldGroup = ({ field, fieldChanged, values }: any) => {
  const fields = field.fields;

  return (
    <fieldset key={field._uid}>
      <h3>{field.name}</h3>
      {fields.map((field: any) => {
        return (
          <Field
            key={field._uid}
            field={field}
            fieldChanged={fieldChanged}
            value={values[field._uid]}
          />
        );
      })}
    </fieldset>
  );
};
