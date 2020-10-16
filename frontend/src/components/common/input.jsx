import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import tw from "tailwind.macro";

const Field = styled.input`
  ${tw`border-b-2 border-purple-600 outline-none  w-full `}
`;

const Error = styled.div`
  ${tw`text-red-700 font-semibold`}
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Field {...field} {...props}></Field>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </>
  );
};



export default Input;
