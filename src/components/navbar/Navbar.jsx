import React from "react";
import Box from "@mui/material/Box";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Button } from "@mui/material";

const Navbar = ({ toggleDarkMode, nightMode, handleToggleAll, toggleAll }) => {
  return (
    <Box className={nightMode ? "navbar navBarNight" : "navbar navBarDay"}>
      <div className="navBar">
        <h3 className="Header">AccuWeather App</h3>
        <NavLink to="/favorites">
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </NavLink>
        <NavLink to="/homepage">
          <BottomNavigationAction label="Homepage" icon={<HomeIcon />} />
        </NavLink>

        <Button
          size="small"
          variant={nightMode ? "varianted" : "contained"}
          onClick={toggleDarkMode}
        >
          {nightMode ? "Dark Theme" : "Light Theme"}
        </Button>
        
        <Button
          size="small"
          variant={nightMode ? "varianted" : "contained"}
          onClick={handleToggleAll}
        >
          {toggleAll ? "F°" : "C°"}
        </Button>
      </div>
    </Box>
  );
};

export default Navbar;
