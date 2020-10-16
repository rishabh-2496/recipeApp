import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { searchStart, resetSearchState } from "./actions";
import queryString from "query-string";
import { toast } from "react-toastify";
import RecipeCard from "./../../components/recipeCard";

const Container = styled.div`
  ${tw`flex flex-col justify-center items-center mt-8`}
`;

const CardContainer = styled.div`
  ${tw`sm:w-4/5 lg:w-3/5`}
`;

const Text = styled.p`
  ${tw`text-2xl text-purple-800 font-semibold`}
`;

const Search = ({
  searchStart,
  dataFetching,
  results,
  failureMessage,
  location,
  resetSearchState,
}) => {
  const { query } = queryString.parse(location.search);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastRecipeRef = useCallback(
    (node) => {
      if (dataFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const hasMore = results?.hasOwnProperty("next");
        if (entries[0].isIntersecting && hasMore) {
          if (results?.next?.page) {
            setPage(results?.next?.page);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [dataFetching, results]
  );

  if (failureMessage) toast.error(failureMessage);

  useEffect(() => {
    window.onpopstate = function (e) {
      resetSearchState();
    };
    searchStart({ query, page });
  }, [page, query, resetSearchState, searchStart]);
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

      {results?.recipes?.length === 0 && <Text>No Recipe Found</Text>}
      {results?.recipes?.map((recipe, index) => (
        <CardContainer>
          {results?.recipes?.length === index + 1 ? (
            <RecipeCard ref={lastRecipeRef} key={recipe._id} data={recipe} />
          ) : (
            <RecipeCard key={recipe._id} data={recipe} />
          )}
        </CardContainer>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  results: state.search.searchResult,
  dataFetching: state.search.dataFetching,
  failureMessage: state.search.failureMessage,
});

const mapDispatchToProps = { searchStart, resetSearchState };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
