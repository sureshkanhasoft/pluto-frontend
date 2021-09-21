import React, { useEffect } from 'react';
import { Container, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShiftTable from '../ShiftTable/ShiftTable'
import { getShift } from '../../store/action';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const UpcomingShift = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { getShiftList, loading } = useSelector(state => state.browseShift)
    useEffect(() => {
        dispatch(getShift())
    }, [])
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            <ShiftTable
                shiftList={getShiftList}
            />

            <Container maxWidth="lg">
                <p className="mb-36">You don't have any past shifts.</p>
                <Link to="/shifts" className="btn primary-btn">Browser Shift</Link>
            </Container>
        </>
    )
}

export default UpcomingShift
