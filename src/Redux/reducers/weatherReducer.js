import {
  FETCH_DEFAULT_DATA_SUCCESS,
  FETCH_DEFAULT_DATA_FAILURE,
  FETCH_DATA_BY_SEARCH_REQUEST,
  FETCH_DATA_BY_SEARCH_SUCCESS,
  FETCH_DATA_BY_SEARCH_FAILURE,
} from "../actions/actionTypes";

const initalGetWeatherState = {
  loading: false,
  error: false,
  data: null,
};

export const weatherReducer = (state = initalGetWeatherState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DEFAULT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    case FETCH_DEFAULT_DATA_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case FETCH_DATA_BY_SEARCH_REQUEST:
      return {
        loading: true,
      };
    case FETCH_DATA_BY_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case FETCH_DATA_BY_SEARCH_FAILURE:
      return {
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
