const initialState = {
  favoritas: [],
  moviesLoaded: [],
  movieDetail: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_MOVIE_FAVORITE") {
    //Si se agrega movie a favoritos
    console.log(action.payload);
    return {
      ...state,
      favoritas: state.favoritas.concat(action.payload),
    };
  }
  if (action.type === "GET_MOVIES") {
    //Si se nos solicita una movie
    return {
      ...state,
      moviesLoaded: action.payload.Search,
    };
  }
  if (action.type === "GET_MOVIE_DETAIL") {
    console.log(action.payload);
    return {
      ...state,
      movieDetail: action.payload,
    };
  }
  if (action.type === "REMOVE_MOVIE_FAVORITE") {
    //Si se nos solicita remover una movie
    return {
      ...state,
      favoritas: state.favoritas.filter((m) => m.id !== action.payload),
    };
  }

  return state;
}

export default rootReducer;
