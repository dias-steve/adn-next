
import searchTypes from "./search.types";

export const setSearchTerms = (searchTerms) =>({
    type: searchTypes.SET_SEARCH_TERMS,
    payload: searchTerms

});

export const setResults = (results) => ({
    type: searchTypes.SET_RESULTS,
    payload: results
});

export const setIsLoading = (isLoading) => ({
    type: searchTypes.SET_IS_LOADING,
    payload: isLoading
});

export const setIsDone = (isDone) => ({
    type: searchTypes.SET_IS_DONE,
    payload: isDone

});