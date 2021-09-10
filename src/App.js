import "./App.scss";
import { Router, Switch, Route,Redirect } from "react-router-dom";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Layout from "./layout/Layout";
import PrivateRoute from "./config/PrivateRoute";
import history from "./utils/HistoryUtils";
import ForgottenPassword from "./pages/Auth/ForgottenPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
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
            <Route exact path="/forgotten-password" component={ForgottenPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            {/* .{isAuthenticated() ? <PrivateRoute path="/" component={Layout} isAuthenticated={e => isAuthenticated()} /> :  <Redirect from="/" to="/login" />} */}
            <PrivateRoute path="/" component={Layout} isAuthenticated={e => isAuthenticated()} /> 
            <Redirect from="/" to="/login" />
          </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
