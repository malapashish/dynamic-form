import React from "react";
import { Form } from "./components/Form/Form";
import { formDemoData } from "./demo-data/data";

export const App = () => {
  return <Form formData={formDemoData} />;
};
