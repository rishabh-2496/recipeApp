import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../../components/common/input";
import { toast } from "react-toastify";
import { registerationStart } from "./actions";
import { connect } from "react-redux";
import { ObjectToFormData } from "./../../utils/genericUtils";
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

const Profile = styled.img`
  ${tw`rounded-full w-16 h-16 mx-auto`}
`;

const FileInput = styled.input`
  ${tw`mt-3`}
`;

const Register = ({
  registerationStart,
  authData,
  dataFetching,
  failureMessage,
}) => {
  const [profileImage, setProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const setField = (profileImage) => {
    if (profileImage) {
      setProfileImage(profileImage);
      const imageUrl = URL.createObjectURL(profileImage);
      setImageUrl(imageUrl);
    }
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(profileImage);
  }, [profileImage]);

  if (authData && authData.message) {
    toast.success(authData.message);
  }

  if (failureMessage) toast.error(failureMessage);
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
          <Title>Sign up</Title>
          <SubTitle>Share Your Amazing Recipes</SubTitle>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required("Username Required")
                .min(3, "must be atleast 3 characters")
                .max(20, "must be atmost 20 characters"),
              email: Yup.string()
                .email("invalid email address")
                .required("Email Required"),
              password: Yup.string()
                .min(8, "password min 8 characters")
                .required("Password Required"),
              confirmpassword: Yup.string()
                .required("Confirm Password")
                .when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "password doesn't match"
                  ),
                }),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              if (!profileImage) toast.error("please upload profile image");
              let formData = ObjectToFormData(values);
              formData.append("profile_pic", profileImage);
              registerationStart(formData);
              resetForm({});
              if (!dataFetching) setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <FieldContainer>
                  {imageUrl && <Profile src={imageUrl}></Profile>}
                  <FileInput
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                    onChange={(event) => setField(event.currentTarget.files[0])}
                  ></FileInput>
                </FieldContainer>

                <FieldContainer>
                  <Input
                    label="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                  ></Input>
                </FieldContainer>
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
                    Sign up
                  </button>
                </CenterDiv>
                <CenterDiv>
                  <Link to="/login">
                    <P>Already have an account</P>
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
  authData: state.register.authData,
  dataFetching: state.register.dataFetching,
  failureMessage: state.register.failureMessage,
});

const mapDispatchToProps = { registerationStart };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
