import React from 'react';
import {
    Container,
    Chip,
    makeStyles,
    Box
} from '@material-ui/core';
import { NavLink, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import UpcomingShift from './UpcomingShift';
import PastShift from './PastShift';

const useStyle = makeStyles(() => ({
    shiftLink: {
        color: "#787aa2",
        height: 40,
        display: "flex",
        alignItems: "center",
        marginRight: "24px",
        borderBottom: "1px solid transparent",
        "&.active": {
            color: "#184a7b",
            borderBottom: "1px solid #184a7b",
        }
    },
    chipText: {
        marginLeft: 8,
        height: 20,
        background: "#b0b2ce",
        color: "#fff",
        fontSize: 11
    }
}))

const MyShift = ({match}) => {
    let { path, url } = useRouteMatch();
    const classes = useStyle();
    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mt-16">My Shifts</h1>
                    <Box display="flex" className="mb-36">
                        <NavLink className={classes.shiftLink} activeClassName="active" to={`${url}/upcoming`} >Upcoming Shift <Chip size="small" label="2" className={classes.chipText} /></NavLink>
                        <NavLink className={classes.shiftLink} activeClassName="active" to={`${url}/past`} >Past Shift  <Chip size="small" label="4" className={classes.chipText} /></NavLink>
                    </Box>
                </Container>
                <Switch>
                    <Route exact path={`${path}/upcoming`} component={UpcomingShift} />
                    <Route path={`${path}/past`} component={PastShift} />
                    <Redirect from="" to={`${match.url}`} />
                </Switch>
            </section>
        </>
    );
};

export default MyShift;