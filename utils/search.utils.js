import { setIsLoading, setResults, setShowResultScreen, setShowSearchBar} from './../redux/Search/search.actions'

export const sendSearch = async (terms) => {
    const request = {
        term: terms
    }
    try {
        const data = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/search", {
        // Adding method type

        method: "POST",
    
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(request),
      });

      const result = await data.json();
      return {code_error: 0 ,...result}
    } catch (err) {
        console.log(err.message)
        return {code_error: 1}
    }
    


}

export const handleSetIsLoading = (isLoading, dispatch) => {

  dispatch(
    setIsLoading(isLoading)
  )
}

export const handleSetShowResultScreen = (isShow, dispatch) => {

  dispatch(
    setShowResultScreen(isShow)
  )
}

export const handleSetResults = (results, dispatch) => {

  dispatch(
    setResults(results)
  )
}

export const handleSetShowSearchBar = (isShow, dispatch) => {
  dispatch(
    setShowSearchBar(isShow)
  )
}