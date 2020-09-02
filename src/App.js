import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Countries from "./Components/Countries/index";
import Country from "./Components/Country/index";

function App() {
    return (
        <>
          <Navbar />
          <Route path="/" exact component={Countries} />
          <Route path="/country/:country" exact component={Country} />
        </>
    );
}

export default App;
