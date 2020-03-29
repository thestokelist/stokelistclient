import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import config from "./config";

function App() {
    return (
      <Router
        basename={config.ROUTER_BASE_NAME}>
       <Route path="/" component={MainApp} />
      </Router>
    );
}

export default App;