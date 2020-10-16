import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import tw from "tailwind.macro";

const Error = styled.div`
  ${tw`text-red-700 font-semibold`}
`;

const TextArea = styled.textarea`
  ${tw`border-b-2 border-purple-600 outline-none w-full`}
`;

const InputArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextArea {...field} {...props} rows="2" cols="50"></TextArea>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </>
  );
};

export default InputArea;
