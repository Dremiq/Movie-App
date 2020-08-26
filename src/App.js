import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlackThemeHome from "./components/BlackThemeHome";
import WhiteThemeHome from "./components/WhiteThemeHome";
import ChooseATheme from "./components/ChooseATheme";
import { Provider } from "react-redux";
import store from "./redux/store";
import Movie from "./components/Movie";
import { createBrowserHistory } from "react";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={ChooseATheme} />
            <Route path="/bT" component={BlackThemeHome} />
            <Route path="/wT" component={WhiteThemeHome} />
            <Route path="/movie/:id" component={Movie} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
