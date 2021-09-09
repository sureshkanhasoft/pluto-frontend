import "./App.scss";
import { Router, Switch, Route,Redirect } from "react-router-dom";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Layout from "./layout/Layout";
import PrivateRoute from "./config/PrivateRoute";
import history from "./utils/HistoryUtils";

function App() {
  const isAuthenticated = () => {
    // const token = localStorage.getItem('token');
    const token = true;
    try {
      if (token) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return (
    <div className="main-page">
     
      <Router history={history}>
        {/* <Navbar /> */}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {isAuthenticated() ? <PrivateRoute path="/" component={Layout} isAuthenticated={e => isAuthenticated()} /> :  <Redirect from="/" to="/login" />}
          </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
