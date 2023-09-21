import React from "react";
import "./App.css";
import RouteLink from "./routes/Route";
import NavBar from "./components/organisms/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <RouteLink></RouteLink>
    </div>
  );
}

export default App;
