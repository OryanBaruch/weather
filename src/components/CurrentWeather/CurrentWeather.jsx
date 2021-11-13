import React, { useEffect, useState } from "react";
import {
  addToFavorites,
  generateIconUrl,
  removeFromFaviorites,
} from "../../Redux/actions/weatherAction";
import { useDispatch } from "react-redux";
import { Card } from "@mui/material";
import Heart from "react-animated-heart";
import "./CurrentWeather.css";
import { useHistory } from "react-router";

const CurrentWeather = ({
  currWeatherObj,
  data,
  dayName,
  toggleAll,
  nightMode,
}) => {
  const dispatch = useDispatch();
  const [isClick, setClick] = useState(false);
  const history=useHistory()

  const insertDataOfLikedCity = { data, currWeatherObj };
  const parsedCheckOfData = JSON.parse(localStorage.getItem("favorites")) || [];
  const fetchCityKey = parsedCheckOfData?.map((item) => item?.data.cityKey);

  const handleToggleLike = () => {
    fetchCityKey.includes(insertDataOfLikedCity?.data?.cityKey)
      ? dispatch(removeFromFaviorites(insertDataOfLikedCity?.data?.cityKey))
      : dispatch(addToFavorites(insertDataOfLikedCity));
    setClick(!isClick);
  };

  // const backToHomePageWithFavoriteShowen = (fetchCityKey) => {
  //   console.log(fetchCityKey);
  //   history.push('/homepage')
  // };

  useEffect(() => {
    fetchCityKey.includes(insertDataOfLikedCity?.data?.cityKey)
      ? setClick(true)
      : setClick(false);
  }, [fetchCityKey, insertDataOfLikedCity?.data?.cityKey]);

  return (
    <>
      {currWeatherObj ? (
        <Card
          className={nightMode ? "card cardDarkTheme" : "card cardDayTheme"}
        >
          <Heart isClick={isClick} onClick={handleToggleLike} />
          <div className="watherDetails">
            <h3>
              <strong className={nightMode ? "darkTheme" : "dayTheme"}>
                {" "}
                {dayName}{" "}
              </strong>
            </h3>
            {toggleAll ? (
              <>
                <span className={nightMode ? "darkTheme" : "dayTheme"}>
                  {" "}
                  {currWeatherObj?.Temperature?.Metric?.Value}
                </span>
                <span className={nightMode ? "darkTheme" : "dayTheme"}>
                  {" "}
                  {currWeatherObj?.Temperature?.Metric?.Unit}°
                </span>
              </>
            ) : (
              <>
                <span className={nightMode ? "darkTheme" : "dayTheme"}>
                  {currWeatherObj?.Temperature?.Imperial?.Value}
                </span>
                <span className={nightMode ? "darkTheme" : "dayTheme"}>
                  {currWeatherObj?.Temperature?.Imperial?.Unit}°
                </span>
              </>
            )}
            {/* <button onClick={backToHomePageWithFavoriteShowen(data?.cityKey)}>CHECK</button> */}
            <h3 className={nightMode ? "darkTheme" : "dayTheme"}>
              {" "}
              {data?.cityName} , {data?.countryName}
            </h3>
            <h3 className={nightMode ? "darkTheme" : "dayTheme"}>
              {currWeatherObj?.LocalObservationDateTime?.slice(0, 10)}
            </h3>
            <div className="placeItemInDivOnBothSides">
              <h3 className={nightMode ? "darkTheme" : "dayTheme"}>
                {" "}
                {currWeatherObj?.WeatherText}
              </h3>
              <img
                src={generateIconUrl(
                  data && data?.weatherCurrObject[0]?.WeatherIcon
                )}
                alt="icon"
              />
            </div>
            <a href={currWeatherObj?.Link} target="_blank" rel="noreferrer">
              More Details
            </a>
          </div>
        </Card>
      ) : (
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif"
            alt="Loader"
          />
        </>
      )}
    </>
  );
};

export default CurrentWeather;
