import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../../components/common/input";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { editProfileStart } from "./actions";
import { ObjectToFormData } from "./../../utils/genericUtils";

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
  ${tw`rounded-full w-32 h-32 mx-auto`}
`;

const FileInput = styled.input`
  ${tw`mt-3`}
`;

const EditProfile = ({
  userData,
  dataFetching,
  failureMessage,
  editProfileStart,
  match,
  history,
}) => {
  const [profileImage, setProfileImage] = useState("");
  const [profileURL, setProfileURL] = useState("");

  if (failureMessage) toast.error(failureMessage);

  const setField = (profileImage) => {
    if (profileImage) {
      setProfileImage(profileImage);
      const profileURL = URL.createObjectURL(profileImage);
      setProfileURL(profileURL);
    }
  };

  if (userData && userData?.user?.token) {
    window.location = "/";
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(profileImage);
  }, [profileImage]);

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
          <Title>Edit Profile</Title>
          <Formik
            initialValues={{ username: "" }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required("Username Required")
                .min(3, "must be atleast 3 characters")
                .max(20, "must be atmost 20 characters"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              if (!profileImage) toast.error("please upload profile image");
              let formData = ObjectToFormData(values);
              formData.append("profile_pic", profileImage);
              editProfileStart({ data: formData, id: match.params.id });
              setSubmitting(false);
            }}
          >
            <Form>
              <FieldContainer>
                {profileURL && <Profile src={profileURL}></Profile>}
                <FileInput
                  type="file"
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
              <CenterDiv>
                <button className="pushy__btn pushy__btn--md pushy__btn--purple">
                  Save
                </button>
              </CenterDiv>
            </Form>
          </Formik>
        </Div>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userData: state.editProfile.userData,
  dataFetching: state.editProfile.dataFetching,
  failureMessage: state.editProfile.failureMessage,
});

const mapDispatchToProps = { editProfileStart };

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
