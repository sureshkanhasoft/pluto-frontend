import React, { useEffect } from 'react';
import { Container, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PastShiftTable from '../ShiftTable/PastShiftTable'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const PastShift = () => {
    const classes = useStyles();
    const { getMyShiftList, loading } = useSelector(state => state.myShift)
    const getPastShiftList = getMyShiftList && getMyShiftList.hasOwnProperty('data') ? getMyShiftList.data.past : [] 

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }

            <PastShiftTable
                shiftList={getPastShiftList}
            />
            {getPastShiftList && getPastShiftList.data && getPastShiftList.data.length == 0 &&
                <Container maxWidth="lg">
                    <p className="mb-36">You don't have any past shifts.</p>
                    <Link to="/shifts" className="btn primary-btn">Browse Shift</Link>
                </Container>
            }
        </>
    )
}

export default PastShift
