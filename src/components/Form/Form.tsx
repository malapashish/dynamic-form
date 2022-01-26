import React, { useState, useEffect } from "react";
import { InputEvent } from "../../DynamicFormTypes";
import { Field } from "./Field";
import { FieldGroup } from "./FieldGroup";
import { Option } from "./Option";

const fieldMeetsCondition = (values: any) => (field: any) => {
  if (field.conditional && field.conditional.field) {
    const segments = field.conditional.field.split("_");
    const fieldId = segments[segments.length - 1];
    return values[fieldId] === field.conditional.value;
  }
  return true;
};

export const Form = ({ formData }: any) => {
  const [page, setPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState(formData[page]);
  const [values, setValues] = useState<any>({});
  const onSubmit = (e: InputEvent) => {
    e.preventDefault();
    console.log("Form values", e);
  };

  const fieldChanged = (fieldId: any, value: any) => {
    setValues((currentValues: any) => {
      currentValues[fieldId] = value;
      return currentValues;
    });

    setCurrentPageData((currentPageData: any) => {
      return Object.assign({}, currentPageData);
    });
  };

  const navigatePages = (direction: any) => () => {
    const findNextPage: any = (page: any) => {
      const upcomingPageData = formData[page];
      if (upcomingPageData.conditional && upcomingPageData.conditional.field) {
        const segments = upcomingPageData.conditional.field.split("_");
        const fieldId = segments[segments.length - 1];

        const fieldToMatchValue = values[fieldId];

        if (fieldToMatchValue !== upcomingPageData.conditional.value) {
          return findNextPage(direction === "next" ? page + 1 : page - 1);
        }
      }
      return page;
    };

    setPage(findNextPage(direction === "next" ? page + 1 : page - 1));
  };
  const nextPage = navigatePages("next");
  const prevPage = navigatePages("prev");

  useEffect(() => {
    const upcomingPageData = formData[page];
    setCurrentPageData(upcomingPageData);
    setValues((currentValues: any) => {
      const newValues = upcomingPageData.fields.reduce(
        (obj: any, field: any) => {
          if (field.component === "field_group") {
            for (const subField of field.fields) {
              obj[subField._uid] = "";
            }
          } else {
            obj[field._uid] = "";
          }

          return obj;
        },
        {}
      );
      return Object.assign({}, newValues, currentValues);
    });
  }, [page, formData]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>{currentPageData.label}</h2>
        {currentPageData.fields
          .filter(fieldMeetsCondition(values))
          .map((field: any) => {
            switch (field.component) {
              case "field_group":
                return (
                  <FieldGroup
                    key={field._uid}
                    field={field}
                    fieldChanged={fieldChanged}
                    values={values}
                  />
                );
              case "options":
                return (
                  <Option
                    key={field._uid}
                    field={field}
                    fieldChanged={fieldChanged}
                    values={values[field._uid]}
                  />
                );
              default:
                return (
                  <Field
                    key={field._uid}
                    field={field}
                    fieldChanged={fieldChanged}
                    value={values[field._uid]}
                  />
                );
            }
          })}
        {page > 0 && <button onClick={prevPage}>Back</button>}&nbsp;
        {page < formData.length - 1 && <button onClick={nextPage}>Next</button>}
        <hr />
        <button onClick={() => console.log(values)}>Dump form data</button>
      </form>
    </div>
  );
};
