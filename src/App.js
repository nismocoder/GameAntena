import React from "react";
//Component and pages
import Home from "./pages/Home";
import { Nav } from "./components";
//styles
import './global.css';
//Router
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Route path={["/game/:id", "/"]} component={Home} />
      </Router>
    </div>
  );
}

export default App;
