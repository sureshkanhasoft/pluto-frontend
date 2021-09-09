import React from 'react';
import {
    // Switch, 
    Route
} from "react-router-dom";
import BrowserShift from './BrowserShift';
import ShiftsDetail from './ShiftsDetail';

const Shifts = ({match}) => {
    return (
        <>
            <Route exact path={`${match.path}`} component={BrowserShift} />
            <Route exact path={`${match.url}/:id`} component={ShiftsDetail} />
        </>
    );
};

export default Shifts;