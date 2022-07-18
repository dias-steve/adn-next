import searchTypes from './search.types'

export const INITIAL_STATE = {
    search_terms : "",
    results: {post_types_found: []},
    is_loading: false, 
    is_done: false,
}

const searchReducer = (state= INITIAL_STATE, action) => {
    switch (action.type){
        case searchTypes.SET_IS_LOADING:
            return{
                ...state,
                is_loading: action.payload
            };

        case searchTypes.SET_RESULTS:
            return{
                ...state,
                results: action.payload
            }
        case searchTypes.SET_IS_DONE:
            return{
                ...state,
                is_done: action.payload
            }
        case searchTypes.SET_SEARCH_TERMS:
            return{
                ...state,
                search_terms: action.payload
            }

    }
}