import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlackThemeHome from "./components/BlackThemeHome";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/Home";
import Movie from "./components/Movie";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/bT" component={BlackThemeHome} />
            <Route path="/movie/:id" component={Movie} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
