import React from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${tw`w-full h-screen  bg-purple-200 flex flex-col justify-center items-center`}
`;
const Heading = styled.p`
  ${tw`text-5xl font-bold px-2`}
`;
const SubHeading = styled.p`
  ${tw`text-xl px-2 text-center mb-4`}
`;

const NotFound = () => {
  return (
    <Container>
      <Heading>Not Found!</Heading>
      <SubHeading>Oops Resource You're Looking For Doesn't Exist.</SubHeading>
      <Link to="/" className={"pushy__btn pushy__btn--purple"}>
        Home
      </Link>
    </Container>
  );
};

export default NotFound;
