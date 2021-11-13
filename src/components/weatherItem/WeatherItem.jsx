import React from "react";
import { generateIconUrl } from "../../Redux/actions/weatherAction";
import Card from "@mui/material/Card";
import "./weatherItem.css";

const WeatherItem = ({
  day,
  toggleAll,
  dayOfTheWeek,
  nightMode,
}) => {
  const d = new Date(day?.Date);
  const dayName = dayOfTheWeek[d.getDay()];

  return (
    <>
      <Card
        className={
          nightMode&&nightMode ? "WeatherItemContainerNight" : "WeatherItemContainerDay"
        }
      >
        <strong className={nightMode ? "dayNameNight" : "dayNameDay"}>
          {" "}
          {dayName}{" "}
        </strong>
        <div className={nightMode ? "dayNameNight" : "dayNameDay"}>
          {toggleAll ? (
            <div className="DegreesCelsius">
              C {day.Temperature.Minimum.Value}-{day?.Temperature.Maximum.Value}{" "}
              °
            </div>
          ) : (
            <div className="DegreesFahrenheit">
              F {Math.round(day.Temperature.Minimum.Value * 1.8 + 32)}-
              {Math.round(day?.Temperature.Maximum.Value * 1.8 + 32)} °
            </div>
          )}
        </div>
        <h3 className={nightMode ? "dayNameNight" : "dayNameDay"}>
          {day.Date.slice(0, 10)}
        </h3>
        <h3 className={nightMode ? "dayNameNight" : "dayNameDay"}>
          {day?.Day?.IconPhrase}
        </h3>
        <img src={generateIconUrl(day?.Day?.Icon)} alt="icon" />
      </Card>
    </>
  );
};

export default WeatherItem;
