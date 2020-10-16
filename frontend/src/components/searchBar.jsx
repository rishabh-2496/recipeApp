import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import "../assets/css/pushy.css";
import { Link } from "react-router-dom";

const Input = styled.input`
  ${tw`w-2/5 bg-grey-800 my-2 border-gray-lighter rounded shadow-md outline-none px-3 py-2 mr-2 `}
`;

const Navbar = styled.div`
  ${tw`flex flex-row py-2 px-2`};
`;

const Button = styled.button`
  ${tw`mx-3 bg-purple-dark `}
`;

const Text = styled.p`
  ${tw`text-purple-700 mr-2  `}
`;

const Div = styled.div`
  ${tw`flex w-full justify-center items-center`}
`;

const ProfilePic = styled.img`
  ${tw`rounded-full w-10 h-10 cursor-pointer `}
`;

const Modal = styled.div`
  ${tw`absolute shadow-md py-3 px-2 z-10 bg-white-700`}
`;

const VerticalDiv = styled.div`
  ${tw`ml-2`}
`;

const MarginLeft = styled.div`
  ${tw`ml-2 flex`}
`;

const TextLink = styled.p`
  ${tw`text-purple-700 font-hairline hover:text-yellow-700 mr-2`}
`;

const SearchBar = ({ user }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchValue, setValue] = useState("");
  console.log('user',user)
  return (
    <Navbar>
      <Div>
        <Input
          onChange={(e) => setValue(e.currentTarget.value)}
          value={searchValue}
        ></Input>
        <Link
          to={`/search?query=${searchValue}`}
          className="pushy__btn pushy__btn--md pushy__btn--purple"
        >
          Search
        </Link>
        {user ? (
          <>
            <VerticalDiv>
              <div onClick={() => setIsOpen(!modalIsOpen)}>
                <ProfilePic
                  src={`http://localhost:5000/${user.profilePic}`}
                ></ProfilePic>
              </div>
              {modalIsOpen && (
                <Modal>
                  <Link to={"/postRecipe"}>
                    <TextLink>Post Recipe</TextLink>
                  </Link>
                  <Link to="logout">
                    <TextLink>Logout</TextLink>
                  </Link>
                  <Link to={`/profile/${user._id}`}>
                    <TextLink>profile</TextLink>
                  </Link>
                </Modal>
              )}
            </VerticalDiv>
          </>
        ) : (
          <MarginLeft>
            <Link to="login">
              <TextLink>Login</TextLink>
            </Link>
            <Link to="register">
              <TextLink>Register</TextLink>
            </Link>
          </MarginLeft>
        )}
      </Div>
    </Navbar>
  );
};

export default SearchBar;
