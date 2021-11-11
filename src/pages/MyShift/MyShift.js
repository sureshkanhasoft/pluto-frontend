import React , { useEffect } from 'react';
import {
    Container,
    Chip,
    makeStyles,
    Box
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import { MyShiftAccessInfoComponent, MyShiftAccessCheck } from '../../components/MyShiftAccessInfo/MyShiftAccessInfo'
import UpcomingShift from './UpcomingShift';
import PastShift from './PastShift';
import { getMyShift } from '../../store/action';
import UpcomingShiftsDetail from './UpcomingShiftsDetail';
import PastShiftsDetail from './PastShiftsDetail';
import ApplyShiftsDetail from './ApplyShiftsDetail';
import ApplyShift from './ApplyShift';

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
    const dispatch = useDispatch()
    const { getMyShiftList } = useSelector(state => state.myShift)
    const upComingShiftCount = getMyShiftList && getMyShiftList.hasOwnProperty('data') ? getMyShiftList.data.upcoming.data.length : 0 
    const pastShiftCount = getMyShiftList && getMyShiftList.hasOwnProperty('data') ? getMyShiftList.data.past.data.length : 0 

    useEffect(() => {
        if(MyShiftAccessCheck()){
            dispatch(getMyShift())
        }
    }, [])
    return (
        
        <>
            {!MyShiftAccessCheck() ?
            (
                <>
                    <MyShiftAccessInfoComponent/>
                </>
            )
            :
            (
                <>
                    <ProfileUpdateInfo />
                    <section className="pt-16 pb-32">
                        <Container maxWidth="lg">
                            <h1 className="mt-16">My Shifts</h1>
                            <Box display="flex" className="mb-36">
                                <NavLink className={classes.shiftLink} activeClassName="active" to={`${url}/upcoming`} >Upcoming Shift <Chip size="small" label={upComingShiftCount} className={classes.chipText} /></NavLink>
                                <NavLink className={classes.shiftLink} activeClassName="active" to={`${url}/past`} >Past Shift  <Chip size="small" label={pastShiftCount} className={classes.chipText} /></NavLink>
                                <NavLink className={classes.shiftLink} activeClassName="active" to={`${url}/apply`} >Apply Shift  <Chip size="small" label={0} className={classes.chipText} /></NavLink>
                            </Box>
                        </Container>
                        <Switch>
                            <Route exact path={`${path}/upcoming`} component={UpcomingShift} />
                            <Route exact path={`${path}/upcoming/:id`} component={UpcomingShiftsDetail} />
                            <Route exact path={`${path}/past`} component={PastShift} />
                            <Route exact path={`${path}/past/:id`} component={PastShiftsDetail} />
                            <Route exact path={`${path}/apply`} component={ApplyShift} />
                            <Route exact path={`${path}/apply/:id`} component={ApplyShiftsDetail} />
                            <Redirect from="" to={`${match.url}`} />
                        </Switch>
                    </section>
                </>
            )
            }
        </>
    );
};

export default MyShift;