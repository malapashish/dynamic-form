import React from "react";

export const Field = ({ field, fieldChanged, type, value }: any) => {
  return (
    <div key={field._uid}>
      <label htmlFor={field._uid}>{field.label}</label>
      <input
        type={type || field.component}
        value={value}
        onChange={(e) => fieldChanged(field._uid, e.target.value)}
      />
    </div>
  );
};
