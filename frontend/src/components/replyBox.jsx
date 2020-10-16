import React from "react";
import { Formik, Form } from "formik";
import InputArea from "./common/InputArea";
import * as Yup from "yup";
import styled from "styled-components";
import tw from "tailwind.macro";

const ReplyContainer = styled.div`
  ${tw`mx-8 my-3`}
`;

const ReplyBox = ({ postReplyStart, commentId }) => {
  return (
    <ReplyContainer>
      <Formik
        initialValues={{ reply: "" }}
        validationSchema={Yup.object({
          reply: Yup.string().required("reply Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          postReplyStart({ reply: values.reply, commentId: commentId });
          resetForm();
          setSubmitting(false);
        }}
      >
        <Form>
          <InputArea label="reply" name="reply" placeholder="reply Here..." />
          <button className="pushy__btn pushy__btn--md pushy__btn--purple mt-2">
            send
          </button>
        </Form>
      </Formik>
    </ReplyContainer>
  );
};

export default ReplyBox;
