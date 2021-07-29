import React from "react";
import Form from "./form";

/** Represents a proxy component of form - signup form.
 * @example
 * return (
 *  <FormSignup />
 * )
 * @return {function}
*/
const FormSignup = () => {
  return <Form isSignup={true} />;
};

export {FormSignup};
export default FormSignup;
