import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { verificationStart } from "./actions";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const Container = styled.div`
  ${tw`w-full h-screen  mt-0 flex items-center `}
  background-image: url(${(props) => props.img});
  background-size: auto;
  background-size: cover;
`;

const Card = styled.div`
  ${tw`mx-auto w-4/5 md:w-1/2 lg:w-1/3 bg-white flex flex-col justify-center px-4 pt-10 pb-10 rounded-md shadow-md  `}
`;

const Title = styled.p`
  ${tw`font-bold text-center text-2xl`}
`;

const Text = styled.p`
  ${tw`my-4 text-center text-xl`}
`;

const VerifyAccount = ({
  verificationStart,
  match,
  dataFetching,
  authData,
  failureMessage,
}) => {
  useEffect(() => {
    verificationStart(match.params.token);
  }, [match.params.token, verificationStart]);

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
        <Title>Account Verification</Title>
        {dataFetching ? (
          <Text>Wait Your account is getting verified</Text>
        ) : (
          <Text>Your account is verified.You can close this page</Text>
        )}
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authData: state.verification.authData,
  dataFetching: state.verification.dataFetching,
  failureMessage: state.verification.failureMessage,
});

const mapDispatchToProps = { verificationStart };

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
