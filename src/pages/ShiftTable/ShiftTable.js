import React from 'react';
import {
    Container,
    Divider,
    Chip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

const ShiftTable = (props) => {
    return (
        <div className="table-container">
            <div className="table-header">
                <Container maxWidth="lg">
                    <div className="table-row">
                        <div className="table-cloumn left-cloumn d-flex">
                            <div className="table-inner-cloumn date-column d-flex xy-center"><div className="table-header-lable">Date</div></div>
                            <div className="table-inner-cloumn shift-time d-flex xy-center"><div className="table-header-lable">Shift Time</div></div>
                            <div className="table-inner-cloumn job-role d-flex xy-center"><div className="table-header-lable">Speciality</div></div>
                        </div>
                        <div className="table-cloumn center-cloumn d-flex">
                            <div className="table-inner-cloumn hospital d-flex y-center"><div className="table-header-lable">Hospital</div></div>
                            <div className="table-inner-cloumn payment d-flex xy-center"><div className="table-header-lable">Payment</div></div>
                        </div>
                        <div className="table-cloumn right-cloumn d-flex xy-center"></div>
                    </div>
                </Container>
            </div>
            <div className="table-body">
                <Container maxWidth="lg">
                    <h2 className="date-text">JULY 2021</h2>
                    {
                        props.shiftList.map(index => (
                            <div className="table-row" key={index}>
                                <div className="table-cloumn left-cloumn d-flex">
                                    <div className="table-inner-cloumn date-column d-flex xy-center">
                                        <div className="table-cell text-center">
                                            <span className="day-text">Fri</span><br />
                                            <span className='date-text'>02</span><br />
                                            <span>JUL</span>
                                        </div>
                                    </div>
                                    <div className="table-inner-cloumn shift-time d-flex xy-center">
                                        <div className="table-cell">
                                            <span>09:00</span>
                                            <Divider />
                                            <span>18:00</span>
                                        </div>
                                    </div>
                                    <div className="table-inner-cloumn job-role d-flex xy-center">
                                        <div className="table-cell">
                                            <Chip className="tag" label="Theatre"></Chip>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-cloumn center-cloumn d-flex">
                                    <div className="table-inner-cloumn hospital d-flex y-center">
                                        <div className="table-cell">
                                            <div className="hospital-text">
                                                <span>Lincoln - Lincoln County Hospital</span>
                                            </div>
                                            <div className="ward-cont">
                                                <p className="mb-0"><span>Ward:</span>LCH Theatres Recovery</p>
                                                <p className="mb-0"><span>Ward Type:</span>Theatres</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-inner-cloumn payment d-flex xy-center">
                                        <div className="table-cell">
                                            <span className="payment-text">Rate: £ 30/h</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-cloumn right-cloumn d-flex xy-center">
                                    <div className="table-inner-cloumn">
                                        <div className="table-cell">
                                            <Link to="shifts/1" className="detail-btn">Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </Container>
            </div>
            {
                (props.shiftList) && (props.shiftList).length > 9 && 
                <div className="pagination-container">
                    <Container>
                        <div className="inner-pagination">
                            <Pagination count={10} boundaryCount={2} />
                        </div>
                    </Container>
                </div>
            }

        </div>
    )
}

export default ShiftTable