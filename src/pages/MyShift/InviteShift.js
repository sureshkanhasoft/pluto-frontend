import React from 'react';
import { Container, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApplyShiftTable from '../ShiftTable/ApplyShiftTable'
import InviteShiftTable from '../ShiftTable/InviteShiftTable';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const InviteShift = () => {
    const classes = useStyles();
    const { getMyShiftList, loading } = useSelector(state => state.myShift)
    const getInviteShiftList = getMyShiftList && getMyShiftList.hasOwnProperty('data') ? getMyShiftList.data.offer : []
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }

            <InviteShiftTable
                shiftList={getInviteShiftList}
            />
            {getInviteShiftList && getInviteShiftList.data && getInviteShiftList.data.length == 0 &&
                <Container maxWidth="lg">
                    <p className="mb-36">You don't have any invite shifts.</p>
                    <Link to="/shifts" className="btn primary-btn">Browse Shift</Link>
                </Container>
            }
        </>
    )
}

export default InviteShift
