import React, { useState } from "react";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Favorites from "./components/favorites/Favorites";
import "./components/navbar/Navbar.css";

const App = () => {
  const [nightMode, setNightMode] = useState(false);
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll(!toggleAll);
  };

  const toggleDarkMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div>
      <Router>
        <Navbar
          toggleAll={toggleAll}
          nightMode={nightMode}
          toggleDarkMode={toggleDarkMode}
          handleToggleAll={handleToggleAll}
        />
        <Switch>
          <Route path="/favorites">
            <Favorites
              nightMode={nightMode}
              toggleDarkMode={toggleDarkMode}
              toggleAll={toggleAll}
            />
          </Route>
    
          <Route path="/homepage">
            <Homepage
              setNightMode={setNightMode}
              nightMode={nightMode}
              toggleDarkMode={toggleDarkMode}
              toggleAll={toggleAll}
            />
          </Route>
    
          <Route path="/:locationKey/:locationName">
            <Homepage
              setNightMode={setNightMode}
              nightMode={nightMode}
              toggleDarkMode={toggleDarkMode}
              toggleAll={toggleAll}
            />
          </Route>
    
          <Route path="/homepage">
            <Homepage
              setNightMode={setNightMode}
              nightMode={nightMode}
              toggleDarkMode={toggleDarkMode}
              toggleAll={toggleAll}
            />
          </Route>

         
          <Redirect exact from="/" to="/homepage" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
