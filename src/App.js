import React, { useState } from "react";
import { Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Countries from "./Components/Countries/index";
import Country from "./Components/Country/index";

function App() {
  const [isDarkMode, setDarkMode] = useState(false)
  const switchDarkMode =() => setDarkMode(!isDarkMode)
    return (
        <>
          <Navbar darkMode={isDarkMode} switchTodarkMode={switchDarkMode} />
          <Route path="/" exact>
            <Countries darkMode={isDarkMode} />
          </Route>
          <Route path="/country/:country" exact>
            <Country darkMode={isDarkMode} />
          </Route>
        </>
    );
}

export default App;
