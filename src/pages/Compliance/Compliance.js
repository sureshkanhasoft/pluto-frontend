import React from 'react';
import {
    Switch, 
    Route,
    Redirect
} from "react-router-dom";
import ComplianceDetail from './ComplianceDetail';
import ComplianceList from './ComplianceList';


const Compliance = ({match}) => {
    

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`} component={ComplianceList} />
                <Route exact path={`${match.url}/:id`} component={ComplianceDetail} />
                <Redirect from="" to={`${match.url}`} />
            </Switch>
        </>
    );
};

export default Compliance;