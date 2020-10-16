import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./common/input";

import styled from "styled-components";
import tw from "tailwind.macro";

const Button = styled.button`
  ${tw`mt-2 bg-purple-400 px-3  text-small text-white outline-none rounded-md`}
`;

const AddIngredients = ({ handleAddIngredient }) => {
  return (
    <Formik
      initialValues={{ ingredient: "" }}
      validationSchema={Yup.object({
        ingredient: Yup.string()
          .required("Ingredient Name Required")
          .min(3, "Must be atleast 3 characters")
          .max(100, "Too long"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleAddIngredient(values.ingredient);
        setSubmitting(false);
      }}
    >
      <Form>
        <Input
          label="Ingredient"
          name="ingredient"
          type="text"
          placeholder="ingredient"
        ></Input>
        <Button type="submit">Add</Button>
      </Form>
    </Formik>
  );
};

export default AddIngredients;
