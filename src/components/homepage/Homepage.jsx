import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeather,
  searchForCityAction,
} from "../../Redux/actions/weatherAction";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import WeatherItem from "../weatherItem/WeatherItem";
import Grid from "@material-ui/core/Grid";
import "./homepage.css";
import SearchBarComp from "../SearchBar/SearchBarComp";
import { useParams } from "react-router";

const Homepage = ({ nightMode, toggleAll, setNightMode }) => {
  const dayOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dispatch = useDispatch();

  const { locationKey, locationName } = useParams();

  const weatherReducer = useSelector((state) => state.weatherReducer);
  const { data } = weatherReducer;
  const currWeatherObj = data?.weatherCurrObject[0];

  const d = new Date(currWeatherObj?.LocalObservationDateTime?.slice(0, 10));
  const dayName = dayOfTheWeek[d.getDay()];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          getWeather(position.coords.latitude, position.coords.longitude)
        );
      });
    }
    dispatch(getWeather(40.73061, -73.935242));
  }, [dispatch]);

  useEffect(() => {
    if (locationKey && locationName ) {
      dispatch(searchForCityAction(locationName));
    }
  }, [dispatch, locationKey, locationName]);

  return (
    <div>
      <SearchBarComp className="searchComp" nightMode={nightMode} />
      <CurrentWeather
        dayName={dayName}
        currWeatherObj={currWeatherObj}
        data={data}
        toggleAll={toggleAll}
        nightMode={nightMode}
      />
      <Grid
        className="grid"
        container
        justifyContent="center"
        alignItems="center"
      >
        {data ? (
          data &&
          data?.weatherFiveObject?.DailyForecasts?.map((day, index) => (
            <Grid key={index} item xl={2} lg={2} md={3} sm={3} xs={5}>
              <WeatherItem
                setNightMode={setNightMode}
                day={day}
                key={index}
                toggleAll={toggleAll}
                dayOfTheWeek={dayOfTheWeek}
                nightMode={nightMode}
              />
            </Grid>
          ))
        ) : (
          <>
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif"
              alt="Loader"
            />{" "}
          </>
        )}
      </Grid>
    </div>
  );
};

export default Homepage;
