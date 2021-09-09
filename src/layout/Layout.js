import React from 'react';
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
// import {Routes} from './'
import BrowserShift from '../pages/BrowserShift/BrowserShift';
import ShiftsDetail from '../pages/BrowserShift/ShiftsDetail';
import ComplainceDetail from '../pages/Compliance/ComplainceDetail';
import Compliance from '../pages/Compliance/Compliance';
import MyShift from '../pages/MyShift/MyShift';
import Profile from '../pages/Profile/Profile';
import Routes from '../routes';

const Layout = ({match}) => {
    return (
        <>
        <Navbar />
        <div className="main-page-body">
            <Switch>
                {
                    Routes.map((prop, key) => {
                        return (
                            <Route
                                path={`/${prop.path}`}
                                component={prop.component}
                                key={key}
                            />
                        );
                    })
                }
            </Switch>
        </div>
        <Footer />
      </>
    );
};

export default Layout;