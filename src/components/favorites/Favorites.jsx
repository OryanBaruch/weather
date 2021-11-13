import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  generateIconUrl,
  removeFromFaviorites,
} from "../../Redux/actions/weatherAction";
import "./favorites.css";

const Favorites = ({ dayName, toggleAll, nightMode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [likedCitiesData, setLikedCitiesData] = useState([]);
  const toggleFavoritesReducer = useSelector(
    (state) => state.toggleFavoritesReducer
  );
  const { likes } = toggleFavoritesReducer;

  const visitLocation = (id, locationName) => {
    history.push(`/${id}/${locationName}`);
  };
  useEffect(() => {
    //Fetch Data from local for after refresh activity.
    const likedCitiesDataFromLocalStorage = JSON.parse(
      localStorage.getItem("favorites")
    );
    setLikedCitiesData(likedCitiesDataFromLocalStorage);
  }, [likes]);

  return (
    <>
      {likedCitiesData?.length ? (
        <Card
          className={
            nightMode
              ? "likeCard WeatherItemContainerNight"
              : "likeCard WeatherItemContainerDay"
          }
        >
          {likedCitiesData &&
            likedCitiesData?.map((item, index) => (
              <div key={index}>
                <Button
                  className="unLikebutton"
                  onClick={() =>
                    dispatch(removeFromFaviorites(item?.data?.cityKey))
                  }
                >
                  Unlike
                </Button>
                <Button
                  className="unLikebutton"
                  onClick={() => {
                    visitLocation(item?.data?.cityKey, item?.data?.cityName);
                  }}
                >
                  VISIT
                </Button>
                <h3>
                  <strong className={nightMode ? "darkTheme" : "dayTheme"}>
                    {" "}
                    {dayName}{" "}
                  </strong>
                </h3>
                <a
                  href={item?.currWeatherObj?.Link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>More info</Button>
                </a>
                <h3 className={nightMode ? "darkTheme" : "dayTheme"}>
                  {item?.data?.cityName} , {item?.data?.countryName}
                </h3>
                <h3 className={nightMode ? "darkTheme" : "dayTheme"}>
                  {item?.currWeatherObj?.LocalObservationDateTime?.slice(0, 10)}
                </h3>
                {toggleAll ? (
                  <>
                    <span className={nightMode ? "darkTheme" : "dayTheme"}>
                      {" "}
                      {item?.currWeatherObj?.Temperature?.Metric?.Value}
                    </span>
                    <span className={nightMode ? "darkTheme" : "dayTheme"}>
                      {" "}
                      {item?.currWeatherObj?.Temperature?.Metric?.Unit}°
                    </span>
                  </>
                ) : (
                  <>
                    <span className={nightMode ? "darkTheme" : "dayTheme"}>
                      {item?.currWeatherObj?.Temperature?.Imperial?.Value}
                    </span>
                    <span className={nightMode ? "darkTheme" : "dayTheme"}>
                      {item?.currWeatherObj?.Temperature?.Imperial?.Unit}°
                    </span>
                  </>
                )}
                <div className="placeItemInDivOnBothSides">
                  <h3 className={nightMode ? "darkTheme" : "dayTheme"}>
                    {" "}
                    {item?.currWeatherObj?.WeatherText}
                  </h3>
                </div>
                <img
                  src={generateIconUrl(item?.currWeatherObj?.WeatherIcon)}
                  alt="icon"
                />
              </div>
            ))}
        </Card>
      ) : (
        <>
          <h2>No Liked Cities.</h2>
          <Card className="likeCard nolikesCard">
            <img
              className="img"
              src="https://qph.fs.quoracdn.net/main-qimg-c1d29b3b7d6e81d1e4d496e1b2faa404"
              alt="Nolikes"
            />
          </Card>
        </>
      )}
    </>
  );
};

export default Favorites;
