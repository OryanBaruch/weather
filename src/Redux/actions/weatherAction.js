import {
  FETCH_DEFAULT_DATA_REQUEST,
  FETCH_DEFAULT_DATA_SUCCESS,
  FETCH_DEFAULT_DATA_FAILURE,
  FETCH_DATA_BY_SEARCH_SUCCESS,
  FETCH_DATA_BY_SEARCH_FAILURE,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_SUCCESS,
  UNLIKE_FAILURE,
  key,
} from "./actionTypes";
import {
  autoCompleteBaseUrl,
  currCityDataBaseUrl,
  fiveDaysDataBaseUrl,
  geoLocationBaseUrl,
  generateIconBaseUrl,
} from "../UrlBase";
import { generateObjectMain } from "../mainObject/mainObject";
import axios from "axios";

export const searchForCityAction = (seachQuery) => async (dispatch) => {
  try {
    const base_url = autoCompleteBaseUrl;
    const query = `?apikey=${key}&q=${seachQuery}`;
    const { data } = await axios.get(base_url + query);
    
    const cityKey = data[0]?.Key;
    const cityName = data[0]?.LocalizedName;
    const countryName = data[0]?.Country.LocalizedName;
    // after we have the key and the rest of data we get currLocation conditions
    const currCityUrl = `${currCityDataBaseUrl}/${cityKey}?apikey=${key}&language=en-us&details=true`;
    const currCityResponse = await fetch(currCityUrl);
    const currCityData = await currCityResponse.json();

    // Fetch 5 days forecast
    const fiveDaysUrlBase = `${fiveDaysDataBaseUrl}/${cityKey}?apikey=${key}&language=en-us&details=true&metric=true`;
    const fiveDaysResponse = await axios.get(fiveDaysUrlBase);
    const fiveDaysData = fiveDaysResponse.data;

    const currentWeatherObj = generateObjectMain(
      cityKey,
      cityName,
      countryName,
      currCityData,
      fiveDaysData
    );

    dispatch({
      type: FETCH_DATA_BY_SEARCH_SUCCESS,
      payload: currentWeatherObj,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DATA_BY_SEARCH_FAILURE,
      payload: error,
    });
  }
};

export const getWeather = (lat, long) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_DEFAULT_DATA_REQUEST,
    });
    const baseUrl = `${geoLocationBaseUrl}?apikey=${key}&q=${lat}%2C${long}&language=en-us&details=true`;
    const { data } = await axios.get(baseUrl);
    const cityKey = data.Key;
    const cityName = data.LocalizedName;
    const countryName = data.Country.LocalizedName;

    const currCityUrl = `${currCityDataBaseUrl}/${cityKey}?apikey=${key}&language=en-us&details=true`;
    const currCityResponse = await axios.get(currCityUrl);
    const currCityData = currCityResponse.data;

    //5 days forecast now
    const fiveDaysUrlBase = `${fiveDaysDataBaseUrl}/${cityKey}?apikey=${key}&language=en-us&details=true&metric=true`;
    const fiveDaysResponse = await axios.get(fiveDaysUrlBase);
    const fiveDaysData = fiveDaysResponse.data;

    //create new main object
    const currentWeatherObj = generateObjectMain(
      cityKey,
      cityName,
      countryName,
      currCityData,
      fiveDaysData
    );
    dispatch({
      type: FETCH_DEFAULT_DATA_SUCCESS,
      payload: currentWeatherObj,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DEFAULT_DATA_FAILURE,
      payload: error,
    });
  }
};

export const generateIconUrl = (weatherIconNumber) => {
  if (weatherIconNumber < 10) {
    return `${generateIconBaseUrl}/0` + weatherIconNumber + "-s.png";
  } else {
    return `${generateIconBaseUrl}/` + weatherIconNumber + "-s.png";
  }
};


export const addToFavorites = (favoriteObject) => async (dispatch) => {
  try {
    dispatch({
      type: LIKE_SUCCESS,
      payload: favoriteObject,
    });
  } catch (error) {
    dispatch({
      type: LIKE_FAILURE,
      payload: error,
    });
  }
};

export const removeFromFaviorites = (cityKey) => async (dispatch) => {
  try {
    dispatch({
      type: UNLIKE_SUCCESS,
      payload: cityKey,
    });
  } catch (error) {
    dispatch({
      type: UNLIKE_FAILURE,
      payload: error,
    });
  }
};
