import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { searchForCityAction } from "../../Redux/actions/weatherAction";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import "./SearchBar.css";
import { key } from "../../Redux/actions/actionTypes";
import { autoCompleteBaseUrl } from "../../Redux/UrlBase";
import { debounce } from "lodash";
import Card from "@mui/material/Card";

const SearchBarComp = ({ nightMode }) => {
  const [option, setOption] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = debounce(async (e) => {
    if (!/^[A-Za-z ]+$/.test(e.target.value) && inputValue !== "") {
      setDropDownOpen(false);
      return swal({
        title: "No Input",
        text: "Please write only english letters",
        icon: "error",
        button: "ok",
      });
    }
    if (!inputValue) {
      setDropDownOpen(false);
    }

    const base_url = autoCompleteBaseUrl;
    const query = `?apikey=${key}&q=${e.target.value}`;
    const response = await fetch(base_url + query);
    const data = await response.json();
    setOption(data);
    setDropDownOpen(true);
  }, 450);

  return (
    <Card className="cardContainer">
      <TextField
        className={nightMode ? "searchFieldDay" : "searchFieldNight"}
        label="Search City"
        variant="outlined"
        onChange={(e) => handleChange(e)}
        placeholder="Search for a city..."
      />
      {dropDownOpen && (
        <section className="selectContainer">
          {option.map((item, index) => (
            <section
              className="select"
              onClick={
                !option.length
                  ? null
                  : (e) => {
                      setInputValue(e.target.value);
                      setDropDownOpen(false);
                      dispatch(searchForCityAction(item.LocalizedName));
                    }
              }
              value={item.LocalizedName}
              key={index}
            >
              {item.LocalizedName} , {item.Country.LocalizedName}
            </section>
          ))}
        </section>
      )}
    </Card>
  );
};

export default SearchBarComp;
