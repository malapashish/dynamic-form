import React from "react";

export const Option = ({ field, fieldChanged, value }: any) => {
  return (
    <div>
      <h3>{field.label}</h3>
      {field.options.map((option: any, index: any) => (
        <div key={option.value}>
          <label htmlFor={option.value}>
            <input
              type="radio"
              id={option.value}
              name={field._uid}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => {
                fieldChanged(field._uid, e.target.value);
              }}
            />
            {option.label}
          </label>
          {index < field.options.length - 1 && <br />}
        </div>
      ))}
    </div>
  );
};
