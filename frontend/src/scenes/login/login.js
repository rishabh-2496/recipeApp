import React from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../../components/common/input";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { loginStart } from "./actions";

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

const ForgetLink = styled.p`
  ${tw`text-purple-500 text-right mt-2 font-semibold`}
`;

const Login = ({
  loginStart,
  authData,
  dataFetching,
  failureMessage,
  location,
}) => {
  if (failureMessage) toast.error(failureMessage);
  if (authData && authData.success) {
    const { state } = location;
    window.location = state ? state.from.pathname : "/";
  }

  return (
    <Container img={"./bg.jpg"}>
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
          <Title>Welcome</Title>
          <SubTitle>Login to Continue</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("invalid email address")
                .required("Email Required"),
              password: Yup.string()
                .min(8, "password min 8 characters")
                .required("Password Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              loginStart(values);
              setSubmitting(false);
              resetForm({});
              if (!dataFetching) setSubmitting(false);
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
                <FieldContainer>
                  <Input
                    label="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  ></Input>
                  <Link to="/forgotPassword">
                    <ForgetLink>Forgot Password</ForgetLink>
                  </Link>
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
                    Login
                  </button>
                </CenterDiv>
                <CenterDiv>
                  <Link to="/register">
                    <P>Don't have an account</P>
                  </Link>
                </CenterDiv>
              </Form>
            )}
          </Formik>
        </Div>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authData: state.login.authData,
  dataFetching: state.login.dataFetching,
  failureMessage: state.login.failureMessage,
});

const mapDispatchToProps = { loginStart };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
