import React from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import { NavLink, Switch, Route,useRouteMatch,Redirect } from 'react-router-dom';
import Information from "./Information"
import Preferences from './Preferences';

const useStyle = makeStyles(() => ({
    root: {
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#eaecfb",
        borderBottom: "1px solid rgba(183,187,199,.5)",
        position: "sticky",
        top: "80px",
        zIndex: 9
    },
    gridContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    navLink: {
        height: "45px",
        padding: "6px 0",
        margin: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#787aa2",
        cursor: "pointer",
        fontWeight: 400,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "none",
            color: "#184a7b",
        },
        "&.active": {
            borderBottom: "1px solid #184a7b",
            color: "#18264d",
        }
    }
}))

const Profile = () => {
    const classes = useStyle();
    let { path, url } = useRouteMatch();
    return (
        <>
            <nav className={classes.root}>
                <Container maxWidth="lg">
                    <Grid className={classes.gridContainer}>
                        <NavLink activeClassName="active" to={`${url}/information`} className={classes.navLink}>Personal Information</NavLink>
                        <NavLink activeClassName="active" to={`${url}/preferences`} className={classes.navLink}>Preferences</NavLink>
                    </Grid>
                </Container>
            </nav>
            <Switch>
                <Route exact path={`${path}/information`} component={Information} />
                <Route exact path={`${path}/preferences`} component={Preferences}/>
                <Redirect from="/" to={`${path}/information`}/>
            </Switch>
        </>
    )
}

export default Profile
