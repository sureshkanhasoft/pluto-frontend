import "./App.scss";
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import BrowserShift from "./pages/BrowserShift/BrowserShift";
import MyShift from "./pages/MyShift/MyShift";
import Compliance from "./pages/Compliance/Compliance";
import ShiftsDetail from "./pages/BrowserShift/ShiftsDetail";
import ComplainceDetail from "./pages/Compliance/ComplainceDetail";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div className="main-page">
      <BrowserRouter>
        <Navbar />
        <div className="main-page-body">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/shifts" component={BrowserShift} />
            <Route exact path="/shifts/:id" component={ShiftsDetail} />
            <Route path="/my-shifts" component={MyShift} />
            <Route exact path="/profile/documents" component={Compliance} />
            <Route exact path="/profile/documents/:id" component={ComplainceDetail} />
            <Route path="/profile" component={Profile} />
            <Redirect from="/" to="/shifts" />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
