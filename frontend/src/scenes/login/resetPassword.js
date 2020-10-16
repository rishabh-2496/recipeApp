import React from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../../components/common/input";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { resetPasswordStart } from "./actions";
import ReactLoading from "react-loading";

const Container = styled.div`
  ${tw`w-full h-screen  mt-0 flex items-center `}
  background-image: url(${(props) => props.img});
  background-size: auto;
  background-size: cover;
`;

const Card = styled.div`
  ${tw`mx-auto w-4/5 md:w-1/2 lg:w-1/3 bg-white flex justify-center px-4 pt-10 pb-10 rounded-md shadow-md  `}
`;

const FieldContainer = styled.div`
  ${tw`my-8`}
`;

const Div = styled.div`
  ${tw`w-2/3`}
`;

const CenterDiv = styled.div`
  ${tw`w-full flex  justify-center `}
`;

const P = styled.p`
  ${tw`text-purple-500 mt-6 font-semibold`}
`;

const Title = styled.p`
  ${tw`font-bold text-center text-2xl`}
`;

const SubTitle = styled.p`
  ${tw`text-gray-400 text-center`}
`;

const Text = styled.p`
  ${tw`my-4 text-center text-xl`}
`;

const ResetPassword = ({
  authData,
  dataFetching,
  failureMessage,
  resetPasswordStart,
  match,
  history,
}) => {
  const { token: resetToken } = match.params;
  if (failureMessage) toast.error(failureMessage);
  if (authData && authData.message) history.replace("/login");
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
        <Div>
          <Title>Reset Password</Title>
          <SubTitle>Reset Your Password</SubTitle>
          {authData && authData.message ? (
            <Text>{authData.message}</Text>
          ) : (
            <Formik
              initialValues={{ password: "", confirmpassword: "" }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .min(8, "password min 8 characters")
                  .required("Password Required"),
                confirmpassword: Yup.string().when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "password doesn't match"
                  ),
                }),
              })}
              onSubmit={(values, { setSubmitting }) => {
                resetPasswordStart({ ...values, resetToken });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <FieldContainer>
                    <Input
                      label="password"
                      name="password"
                      type="password"
                      placeholder="New Password"
                    ></Input>
                  </FieldContainer>
                  <FieldContainer>
                    <Input
                      label="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      placeholder="Confirm Password"
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
                      Reset
                    </button>
                  </CenterDiv>
                </Form>
              )}
            </Formik>
          )}
        </Div>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authData: state.resetPassword.authData,
  dataFetching: state.resetPassword.dataFetching,
  failureMessage: state.resetPassword.failureMessage,
});

const mapDispatchToProps = { resetPasswordStart };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
