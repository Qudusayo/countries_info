import React, { useState } from "react";
import { Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Countries from "./Components/Countries/index";
import Country from "./Components/Country/index";

import styles from './Components/Countries/style.module.scss'

function App() {
  const [isDarkMode, setDarkMode] = useState(false)
  const switchDarkMode =() => setDarkMode(!isDarkMode)
    return (
        <div className={ [styles.app, isDarkMode ? styles.darkMode : styles.lightMode].join(" ") }>
          <Navbar darkMode={isDarkMode} switchToDarkMode={switchDarkMode} />
          <Route path="/" exact>
            <Countries darkMode={isDarkMode} />
          </Route>
          <Route path="/country/:country" exact>
            <Country darkMode={isDarkMode} />
          </Route>
        </div>
    );
}

export default App;
