import React, { useEffect } from 'react';
import { Container, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpcomingShiftTable from '../ShiftTable/UpcomingShiftTable'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const UpcomingShift = () => {
    const classes = useStyles();
    const { getMyShiftList, loading } = useSelector(state => state.myShift)
    const getUpComingShiftList = getMyShiftList && getMyShiftList.hasOwnProperty('data') ? getMyShiftList.data.upcoming : [] 

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            <UpcomingShiftTable
                shiftList={getUpComingShiftList}
            />
            {getUpComingShiftList && getUpComingShiftList.data && getUpComingShiftList.data.length == 0 &&
                <Container maxWidth="lg">
                    <p className="mb-36">You don't have any upcoming shifts.</p>
                    <Link to="/shifts" className="btn primary-btn">Browse Shift</Link>
                </Container>
            }
        </>
    )
}

export default UpcomingShift
