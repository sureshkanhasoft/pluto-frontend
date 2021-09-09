import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
// import {Routes} from './'

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
                <Redirect from="/" to="/shifts" />
            </Switch>
        </div>
        <Footer />
      </>
    );
};

export default Layout;