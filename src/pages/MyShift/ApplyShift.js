import React, { useEffect } from 'react';
import { Container, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApplyShiftTable from '../ShiftTable/ApplyShiftTable'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const ApplyShift = () => {
    const classes = useStyles();
    const { getMyShiftList, loading } = useSelector(state => state.myShift)
    const getApplyShiftList = getMyShiftList && getMyShiftList.hasOwnProperty('data') ? getMyShiftList.data.past : [] 

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }

            <ApplyShiftTable
                shiftList={getApplyShiftList}
            />
            {getApplyShiftList && getApplyShiftList.data && getApplyShiftList.data.length == 0 &&
                <Container maxWidth="lg">
                    <p className="mb-36">You don't have any apply shifts.</p>
                    <Link to="/shifts" className="btn primary-btn">Browser Shift</Link>
                </Container>
            }
        </>
    )
}

export default ApplyShift
