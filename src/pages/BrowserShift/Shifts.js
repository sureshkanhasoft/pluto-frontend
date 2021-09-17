import React from 'react';
import {
    Switch, 
    Route,
    Redirect
} from "react-router-dom";
import BrowserShift from './BrowserShift';
import ShiftsDetail from './ShiftsDetail';

const Shifts = ({match}) => {
    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`} component={BrowserShift} />
                <Route exact path={`${match.url}/:id`} component={ShiftsDetail} />
                <Redirect from="" to={`${match.url}`} />
            </Switch>
        </>
    );
};

export default Shifts;