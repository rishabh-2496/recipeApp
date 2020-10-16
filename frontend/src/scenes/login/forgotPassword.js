import React from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import Input from "./../../components/common/input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { forgotPasswordStart } from "./actions";

const Container = styled.div`
${tw`w-full h-screen  mt-0 flex items-center `}
   background-image: url(${(props) => props.img});
   background-size: auto;
   background-size:cover;
`;

const Card = styled.div`
  ${tw`mx-auto w-4/5 md:w-1/2 lg:w-1/3 bg-white flex flex-col justify-center px-4 pt-10 pb-10 rounded-md shadow-md  `}
`;

const FieldContainer = styled.div`
  ${tw`my-8 mx-6`}
`;

const Title = styled.p`
  ${tw`font-bold text-center text-2xl`}
`;

const Text = styled.p`
  ${tw`my-4 text-center text-xl`}
`;

const CenterDiv = styled.div`
  ${tw`w-full flex  justify-center `}
`;

const ForgotPassword = ({
  authData,
  dataFetching,
  failureMessage,
  forgotPasswordStart,
}) => {
  if (failureMessage) toast.error(failureMessage);
  return (
    <Container img={"/bg.jpg"}>
      {dataFetching && (
        <ReactLoading
          type={"spokes"}
          color={"#6c5ce7"}
          height={50}
          width={50}
          className={"elevate"}
        />
      )}
      <Card>
        <Title>Forgot Password</Title>
        {authData && authData.message ? (
          <Text>{authData.message}</Text>
        ) : (
          <>
            <Text>Please click to email the reset password link.</Text>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("invalid email address")
                  .required("Email Required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                resetForm({});
                forgotPasswordStart(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <FieldContainer>
                    <Input
                      label="email"
                      name="email"
                      type="text"
                      placeholder="Email"
                    ></Input>
                  </FieldContainer>
                  <CenterDiv>
                    <button
                      disabled={!isValid || isSubmitting || dataFetching}
                      type="submit"
                      className={
                        isValid
                          ? "pushy__btn pushy__btn--purple"
                          : "pushy__btn pushy__btn--grey"
                      }
                    >
                      Click here
                    </button>
                  </CenterDiv>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authData: state.forgotPassword.authData,
  dataFetching: state.forgotPassword.dataFetching,
  failureMessage: state.forgotPassword.failureMessage,
});

const mapDispatchToProps = { forgotPasswordStart };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
