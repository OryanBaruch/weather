import {
    LIKE_SUCCESS,
    LIKE_FAILURE,
    UNLIKE_SUCCESS,
    UNLIKE_FAILURE,
  } from "../actions/actionTypes";

const initalState = {
    error: null,
    loading: false,
    likes: [],
  };
  
  export const toggleFavoritesReducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
      case LIKE_SUCCESS:
        const newState = state.likes.concat(payload);
        let parsedLocalData = JSON.parse(localStorage.getItem("favorites")) || [];
        parsedLocalData.push(payload);
        localStorage.setItem("favorites", JSON.stringify(parsedLocalData));
        return {
          ...state,
          likes: newState,
        };
  
      case LIKE_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
  
      case UNLIKE_SUCCESS:
        const filteredState = state.likes.filter(
          (item) => item.data.cityKey !== payload
        );
        const parsedLocalFilterData =
          JSON.parse(localStorage.getItem("favorites")) || [];
        const filter = parsedLocalFilterData.filter(
          (item) => item.data.cityKey !== payload
        );
        localStorage.setItem("favorites", JSON.stringify(filter));
        return {
          ...state,
          likes: filteredState,
        };
      case UNLIKE_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  };
  