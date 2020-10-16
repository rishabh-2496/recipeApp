import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Link } from "react-router-dom";
import RecipeCard from "./../../components/recipeCard";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { getProfileStart, resetProfileState } from "./actions";

const Container = styled.div`
  ${tw`w-full  flex flex-col`}
`;

const Header = styled.div`
  ${tw`w-full bg-purple-400 h-64 flex justify-center items-center`}
`;

const ProfileSection = styled.div`
  ${tw`w-full flex flex-col items-center py-4  `}
`;

const ProfileContainer = styled.div`
  ${tw`flex flex-col`}
`;

const ProfilePic = styled.img`
  ${tw`rounded-full w-32 h-32 `}
`;

const Username = styled.p`
  ${tw`text-center mt-2 font-semibold text-lg`}
`;

const EditIcon = styled.img`
  ${tw`absolute top-0 right-0 mx-3 my-3 w-5 h-5 `}
`;

const Heading = styled.p`
  ${tw`font-semibold text-xl border-b-2 text-purple-600 mb-2`}
`;

const Cards = styled.div`
  ${tw`mx-4 flex flex-col justify-center items-center`}
`;

const CardContainer = styled.div`
  ${tw` sm:w-4/5 lg:w-3/5 `}
`;

const Text = styled.p`
  ${tw`text-2xl text-purple-800 font-semibold`}
`;

const Profile = ({
  match,
  profileData,
  dataFetching,
  failureMessage,
  getProfileStart,
  user,
  resetProfileState,
}) => {
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastRecipeRef = useCallback(
    (node) => {
      if (dataFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const hasMore = profileData?.data?.hasOwnProperty("next");
        if (entries[0].isIntersecting && hasMore) {
          if (profileData?.data?.next?.page) {
            setPage(profileData?.data?.next?.page);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [dataFetching, profileData]
  );

  if (failureMessage) toast.error(failureMessage);

  useEffect(() => {
    window.onpopstate = function (e) {
      resetProfileState();
    };
    getProfileStart({ id: match.params.id, page });
  }, [getProfileStart, match.params.id, page, resetProfileState]);

  return (
    <Container>
      {dataFetching && (
        <ReactLoading
          type={"spokes"}
          color={"#6c5ce7"}
          height={50}
          width={50}
          className={"elevate"}
        />
      )}
      {user?._id === profileData?.user?.id && (
        <Link to={`/editProfile/${user?._id}`}>
          <EditIcon src={"/editIcon.png"}></EditIcon>
        </Link>
      )}

      <Header>
        <ProfileContainer>
          <ProfilePic
            src={`http://localhost:5000/${profileData?.user?.profilePic}`}
          ></ProfilePic>
          <Username>{profileData?.user?.username}</Username>
        </ProfileContainer>
      </Header>
      <ProfileSection>
        <Heading>Recipes</Heading>
        {profileData?.data?.recipes?.length === 0 && (
          <Text>No Recipe Found</Text>
        )}
        <Cards>
          {profileData?.data?.recipes?.map((recipe, index) => (
            <CardContainer>
              {profileData?.data?.recipes?.length === index + 1 ? (
                <RecipeCard
                  ref={lastRecipeRef}
                  key={recipe._id}
                  data={recipe}
                />
              ) : (
                <RecipeCard key={recipe._id} data={recipe} />
              )}
            </CardContainer>
          ))}
        </Cards>
      </ProfileSection>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  profileData: state.profile.profileData,
  dataFetching: state.profile.dataFetching,
  failureMessage: state.profile.failureMessage,
});

const mapDispatchToProps = { getProfileStart, resetProfileState };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
