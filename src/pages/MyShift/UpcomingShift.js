import React from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShiftTable from '../ShiftTable/ShiftTable'

const shiftList = [1, 2]

const UpcomingShift = () => {
    return (
        <>
            {
                shiftList && shiftList.length > 0 ?
                    <ShiftTable
                        shiftList={shiftList}
                    /> :

                    <Container maxWidth="lg">
                        <p className="mb-36">You don't have any past shifts.</p>
                        <Link to="/shifts" className="btn primary-btn">Browser Shift</Link>
                    </Container>
            }
        </>
    )
}

export default UpcomingShift
