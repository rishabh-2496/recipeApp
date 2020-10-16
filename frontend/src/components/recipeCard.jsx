import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "tailwind.macro";
import StarRatings from "react-star-ratings";

const Card = styled.div`
  ${tw`shadow-md flex flex-intial rounded-md my-3 mx-2 `}
`;

const Flex = styled.div`
  ${tw`flex `}
`;

const Image = styled.img`
  ${tw`w-2/5`}
`;

const Content = styled.div`
  ${tw`px-5 py-2 w-full`}
`;

const Title = styled.p`
  ${tw`font-semibold text-xl`}
`;

const Description = styled.p`
  ${tw`text-gray-500 mb-2`}
`;

const User = styled.div`
  ${tw`flex mt-3`}
`;

const UserPic = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const UserName = styled.p`
  ${tw`text-gray-500 mx-3 my-2`}
`;

const RecipeCard = React.forwardRef(({ data }, ref) => {
  return (
    <Flex>
      <Link to={{ pathname: `/recipe/${data._id}`, state: { data: data } }}>
        <Card ref={ref}>
          <Image
            src={`${process.env.REACT_APP_SERVER_URL + "/" + data?.images[0]}`}
          ></Image>
          <Content>
            <Title>{data?.name}</Title>
            <Description>{data?.description}</Description>
            <StarRatings
              rating={data?.ratingAverage}
              starRatedColor="#ffc600"
              numberOfStars={5}
              name="rating"
              starDimension={"30"}
              starSpacing={"3"}
            />
            <User>
              <UserPic
                src={`${
                  process.env.REACT_APP_SERVER_URL +
                  "/" +
                  data?.author?.profilePic
                }`}
              ></UserPic>
              <UserName>By {data?.author?.username}</UserName>
            </User>
          </Content>
        </Card>
      </Link>
    </Flex>
  );
});

export default RecipeCard;
