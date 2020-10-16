import React, { useEffect, useState, useRef, useCallback } from "react";
import RecipeCard from "./../../components/recipeCard";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { getThisWeekRecipeStart, resetThisWeekRecipeState } from "./actions";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "tailwind.macro";

const Message = styled.p`
  ${tw`text-gray-700 text-semibold text-lg mt-3 ml-3`}
`;

const CardContainer = styled.div`
  ${tw`sm:w-4/5 lg:w-4/5`}
`;

const ThisWeek = ({
  recipeList,
  dataFetching,
  failureMessage,
  getThisWeekRecipeStart,
}) => {
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastRecipeRef = useCallback(
    (node) => {
      if (dataFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const hasMore = recipeList?.hasOwnProperty("next");
        if (entries[0].isIntersecting && hasMore) {
          if (recipeList?.next?.page) {
            setPage(recipeList?.next?.page);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [dataFetching, recipeList]
  );

  if (failureMessage) toast.error(failureMessage);

  useEffect(() => {
    window.onpopstate = function (e) {
      resetThisWeekRecipeState();
    };
    getThisWeekRecipeStart(page);
  }, [getThisWeekRecipeStart, page]);

  return (
    <div>
      {dataFetching && (
        <ReactLoading
          type={"spokes"}
          color={"#6c5ce7"}
          height={50}
          width={50}
          className={"elevate"}
        />
      )}
      {recipeList?.recipes?.length === 0 && (
        <Message>Nothing to show for now </Message>
      )}
      {recipeList?.recipes?.map((recipe, index) => (
        <CardContainer>
          {recipeList?.recipes?.length === index + 1 ? (
            <RecipeCard ref={lastRecipeRef} key={recipe._id} data={recipe} />
          ) : (
            <RecipeCard key={recipe._id} data={recipe} />
          )}
        </CardContainer>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipeList: state.thisWeekRecipe.recipeList,
  dataFetching: state.thisWeekRecipe.dataFetching,
  failureMessage: state.thisWeekRecipe.failureMessage,
});

const mapDispatchToProps = { getThisWeekRecipeStart };

export default connect(mapStateToProps, mapDispatchToProps)(ThisWeek);
