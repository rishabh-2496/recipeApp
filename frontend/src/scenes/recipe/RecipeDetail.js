import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import StarRatings from "react-star-ratings";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputArea from "./../../components/common/InputArea";
import ReplyBox from "./../../components/replyBox";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
  postCommentStart,
  getCommentStart,
  postReplyStart,
  getRecipeDetailStart,
} from "./actions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${tw`sm:mx-5 lg:mx-20 md:mx-20 py-10 px-5 `}
`;

const Title = styled.p`
  ${tw`font-bold text-2xl mx-3`}
`;

const Description = styled.p`
  ${tw`mx-3 text-gray-500 `}
`;

const Heading = styled.p`
  ${tw`font-semibold mx-3 text-xl my-5  `}
`;

const Directions = styled.p`
  ${tw`mx-3`}
`;

const Ingredients = styled.ul`
  ${tw`flex flex-wrap mx-3 px-3`}
`;

const ListItem = styled.li`
  ${tw`flex mt-2 mx-2`}
`;

const Icon = styled.img`
  ${tw`w-10 h-10`}
`;

const ListText = styled.p`
  ${tw`my-2 mx-1`}
`;

const RatingContainer = styled.div`
  ${tw`mx-3 flex mb-8`}
`;

const RatingCount = styled.p`
  ${tw`text-gray-500 mx-3 my-1`}
`;

const Author = styled.div`
  ${tw`flex my-4 mx-3`}
`;

const ProfilePic = styled.img`
  ${tw`h-10 w-10 rounded-full mb-5 `}
`;

const AuthorName = styled.p`
  ${tw` mt-1 mx-2 font-semibold`}
`;

const CommentBox = styled.div`
  ${tw` mt-5`}
`;

const Comments = styled.div`
  ${tw`mt-3`}
`;

const User = styled.div`
  ${tw`flex`}
`;

const UserName = styled.div`
  ${tw`ml-2 mt-2 font-semibold`}
`;

const Text = styled.p`
  ${tw`mt-1 ml-8`}
`;

const ReplyBtn = styled.p`
  ${tw`text-purple-500 font-semibold cursor-pointer ml-8`}
`;

const Replies = styled.div`
  ${tw`mx-8 py-4`}
`;

const Reply = styled.div`
  ${tw`my-4`}
`;

const HorizontalBorder = styled.div`
  ${tw`border-b-2 border-gray-100`}
`;

const RecipeDetail = ({
  postCommentStart,
  commentPostFailure,
  commentPostFailureMessage,
  getCommentStart,
  commentPostLoading,
  match,
  getCommentsLoading,
  getCommentFailure,
  getCommentFailureMessage,
  commentData,
  postReplyLoading,
  postRepliesFailure,
  postRepliesFailureMessage,
  postReplyStart,
  getRecipeDetailStart,
  getRecipeLoading,
  getRecipeFailure,
  getRecipeFailureMessage,
  recipeData,
  user,
}) => {
  const [showBox, toggleHide] = useState(false);
  const [rating, changeRating] = useState(0);

  const setRating = (rating) => {
    changeRating(rating);
  };

  const HideBtn = (comment) => {
    toggleHide(!showBox);
    comment.showBox = !showBox;
  };

  if (commentPostFailure && commentPostFailureMessage) {
    toast.error(commentPostFailureMessage);
  }

  if (getCommentFailure && getCommentFailureMessage) {
    toast.error(getCommentFailureMessage);
  }

  if (postRepliesFailure && postRepliesFailureMessage) {
    toast.error(postRepliesFailureMessage);
  }

  if (getRecipeFailure && getRecipeFailureMessage) {
    toast.error(getRecipeFailureMessage);
  }

  useEffect(() => {
    getRecipeDetailStart(match.params.id);
    getCommentStart(match.params.id);
  }, [getCommentStart, getRecipeDetailStart, match.params.id]);

  return (
    <Container>
      {(getRecipeLoading ||
        getCommentsLoading ||
        commentPostLoading ||
        postReplyLoading) && (
        <ReactLoading
          type={"spokes"}
          color={"#6c5ce7"}
          height={50}
          width={50}
          className={"elevate"}
        />
      )}
      <Title>{recipeData?.recipe?.name}</Title>
      <Description>{recipeData?.recipe?.description}</Description>
      <RatingContainer>
        <StarRatings
          rating={recipeData?.recipe?.ratingAverage}
          starRatedColor="#ffc600"
          numberOfStars={5}
          name="rating"
          starDimension={"20"}
          starSpacing={"1"}
        />
        <RatingCount>Ratings {recipeData?.recipe?.ratingCount} </RatingCount>
      </RatingContainer>
      <Carousel arrows dots>
        {recipeData?.recipe?.images?.map((img) => (
          <img src={"http://localhost:5000/" + img} alt="carouselImg" />
        ))}
      </Carousel>
      <Heading>Ingredients</Heading>
      <Ingredients>
        {recipeData?.recipe?.ingredients.map((ingredient) => (
          <ListItem>
            <Icon src={"/cute-pumpkin.png"}></Icon>
            <ListText>{ingredient}</ListText>
          </ListItem>
        ))}
      </Ingredients>
      <Heading>Directions</Heading>
      <Directions>{recipeData?.recipe?.directions}</Directions>
      <Heading>Author</Heading>
      <Link to={`/profile/${recipeData?.recipe?.author?._id}`}>
        <Author>
          <ProfilePic
            src={
              "http://localhost:5000/" + recipeData?.recipe?.author?.profilePic
            }
          ></ProfilePic>
          <AuthorName>{recipeData?.recipe?.author?.username}</AuthorName>
        </Author>
      </Link>
      {user?._id && (
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={Yup.object({
            comment: Yup.string().required("Comment Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            postCommentStart({
              comment: values.comment,
              rating: rating,
              recipeId: match.params.id,
            });
            setRating(0);
            resetForm();
            setSubmitting(false);
            getCommentStart(match.params.id);
            getRecipeDetailStart(match.params.id);
          }}
        >
          <Form>
            <StarRatings
              rating={rating}
              starRatedColor="#ffc600"
              starHoverColor="#ffc600"
              numberOfStars={5}
              name="rating"
              starDimension={"20"}
              starSpacing={"3"}
              changeRating={setRating}
            />
            <CommentBox>
              <InputArea
                label="comment"
                name="comment"
                placeholder="Comment Here..."
              />
              <button
                className="pushy__btn pushy__btn--md pushy__btn--purple mt-2"
                type="submit"
              >
                Post
              </button>
            </CommentBox>
          </Form>
        </Formik>
      )}
      {!user?._id && <HorizontalBorder></HorizontalBorder>}
      {commentData?.comments?.length > 0 && <Heading>Comments</Heading>}
      {commentData?.comments?.map((comment) => (
        <Comments key={comment._id}>
          <Link to={`/profile/${comment?.userId._id}`}>
            <User>
              <ProfilePic
                key={comment._id}
                src={"http://localhost:5000/" + comment?.userId?.profilePic}
              ></ProfilePic>
              <div>
                <UserName>{comment?.userId?.username}</UserName>
                <StarRatings
                  rating={comment.rating}
                  starRatedColor="#ffc600"
                  starHoverColor="#ffc600"
                  numberOfStars={5}
                  name="rating"
                  starDimension={"13"}
                  le
                  starSpacing={"1"}
                />
              </div>
            </User>
          </Link>
          <Text>{comment.comment}</Text>
          <ReplyBtn onClick={() => HideBtn(comment)}>Reply</ReplyBtn>
          {comment?.showBox && (
            <ReplyBox
              postReplyStart={postReplyStart}
              commentId={comment._id}
            ></ReplyBox>
          )}
          {comment?.replies?.map((reply) => (
            <Replies key={reply._id}>
              <Reply>
                <Link to={`/profile/${reply?.userId._id}`}>
                  <User>
                    <ProfilePic
                      key={reply._id}
                      src={`http://localhost:5000/${reply.userId.profilePic}`}
                    ></ProfilePic>
                    <UserName>{reply.userId.username}</UserName>
                  </User>
                </Link>
                <Text>{reply.reply}</Text>
              </Reply>
            </Replies>
          ))}
        </Comments>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  getRecipeLoading: state.recipeDetail.getRecipeDetailLoading,
  getRecipeFailure: state.recipeDetail.getRepliesDetailFailure,
  getRecipeFailureMessage: state.recipeDetail.getRepliesDetailFailureMessage,
  recipeData: state.recipeDetail.repliesDetailData,
  commentPostLoading: state.comments.commentPostLoading,
  commentPostFailure: state.comments.commentPostFailure,
  commentPostFailureMessage: state.comments.commentPostFailureMessage,
  getCommentsLoading: state.comments.getCommentsLoading,
  commentData: state.comments.commentData,
  getCommentFailure: state.comments.getCommentFailure,
  getCommentFailureMessage: state.comments.getCommentFailureMessage,
  postReplyLoading: state.replies.postReplyLoading,
  postRepliesFailure: state.replies.postRepliesFailure,
  postRepliesFailureMessage: state.replies.postRepliesFailureMessage,
});

const mapDispatchToProps = {
  postCommentStart,
  getCommentStart,
  postReplyStart,
  getRecipeDetailStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
