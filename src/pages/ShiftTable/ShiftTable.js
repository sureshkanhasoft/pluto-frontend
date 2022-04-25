import React from 'react';
import {
    Container,
    Divider,
    Chip,
    // makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import UtilService from '../../helper/service';

// const useStyles = makeStyles((theme) => ({
//     backdrop: {
//         zIndex: theme.zIndex.drawer + 1,
//         color: '#fff',
//     },
// }))

const ShiftTable = (props) => {
    const { shiftList, handleChangePage, page } = props
    // const classes = useStyles();

    const shiftData = shiftList?.data?.data.reduce((shiftFor, getData) => {
        let date2 = new Date(getData.date)
        const fullyear = date2.getFullYear()
        const getMon = date2.toLocaleString("en", { month: "short" })
        const monthYear = `${fullyear} ${getMon}`
        if (!shiftFor[monthYear]) shiftFor[monthYear] = [];
        shiftFor[monthYear].push(getData);
        return shiftFor;
    }, {});


    return (

        <>
            <div className="table-container">
                <div className="table-header">
                    <Container maxWidth="lg">
                        <div className="table-row">
                            <div className="table-cloumn left-cloumn d-flex">
                                <div className="table-inner-cloumn date-column d-flex xy-center"><div className="table-header-lable">Date</div></div>
                                <div className="table-inner-cloumn shift-time d-flex xy-center"><div className="table-header-lable">Shift Time</div></div>
                                <div className="table-inner-cloumn job-role d-flex y-center"><div className="table-header-lable">Speciality</div></div>
                            </div>
                            <div className="table-cloumn center-cloumn d-flex">
                                <div className="table-inner-cloumn hospital d-flex y-center"><div className="table-header-lable">Hospital</div></div>
                                <div className="table-inner-cloumn payment d-flex y-center"><div className="table-header-lable">Payment</div></div>
                            </div>
                            <div className="table-cloumn right-cloumn d-flex xy-center"></div>
                        </div>
                    </Container>
                </div>
                <div className="table-body">
                    <Container maxWidth="lg">
                        {
                            (shiftData ? shiftData : "") && Object.entries(shiftData ? shiftData : "").map((list, index) => {
                                let dateReverse = list[0].split(" ").reverse().join(" ")
                                return (
                                    <React.Fragment key={index}>
                                        <h2 className="date-text mt-4">{dateReverse}</h2>
                                        {list[1].map((result, index1) => {
                                            let specilaity_list = result.speciality_name.split(",");
                                            let date2 = new Date(result.date)
                                            let dayNum = date2.toLocaleString("en", { day: "2-digit" })
                                            let getMon = date2.toLocaleString("en", { month: "short" })
                                            const dayName = UtilService.getDayName(date2)
                                            return (
                                                <div className="table-row" key={index1}>
                                                    <div className="table-cloumn left-cloumn d-flex">
                                                        <div className="table-inner-cloumn date-column d-flex xy-center">
                                                            <div className="table-cell text-center">
                                                                <span className="day-text">{dayName}</span><br />
                                                                <span className='date-text'>{dayNum}</span><br />
                                                                <span>{getMon}</span>
                                                            </div>
                                                        </div>
                                                        <div className="table-inner-cloumn shift-time d-flex xy-center">
                                                            <div className="table-cell">
                                                                <span>{result.start_time ? (result.start_time = result.start_time.slice(0, 5)) : ""}</span>
                                                                <Divider />
                                                                <span>{result.end_time ? (result.endttime = result.end_time.slice(0, 5)) : ""}</span>
                                                            </div>
                                                        </div>
                                                        <div className="table-inner-cloumn job-role d-flex y-center">
                                                            <div className="table-cell" style={{ width: "100%" }}>
                                                                <div className="tag-box">
                                                                    {specilaity_list.map((list, index) => <Chip className="tag" label={list} key={index}></Chip>)}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-cloumn center-cloumn d-flex">
                                                        <div className="table-inner-cloumn hospital d-flex y-center">
                                                            <div className="table-cell">
                                                                <div className="hospital-text">
                                                                    <span>{result.hospital_name}</span>
                                                                </div>
                                                                <div className="ward-cont">
                                                                    <p className="mb-0"><span>Ward:</span>{result.ward_name}</p>
                                                                    <p className="mb-0"><span>Ward Type:</span>{result.ward_type}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="table-inner-cloumn payment d-flex y-center">
                                                            <div className="table-cell">
                                                                <span className="payment-text">Rate: £ {Number(result.rate) - Number(result.commission)}/h</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-cloumn right-cloumn d-flex xy-center">
                                                        <div className="table-inner-cloumn">
                                                            <div className="table-cell">
                                                            {result?.booking_record_perm_for_signees && result?.booking_record_perm_for_signees?.review_shifts &&
                                                                <Link to={`shifts/${result.id}`} className="detail-btn">Details</Link>
                                                            } 
                                                            {/* {result?.compliance_status && result?.profile_status === "Active" && (result?.compliance_status === "COMPLIANT" || result?.compliance_status=== "NOT COMPLIANT") && 
                                                                <Link to={`shifts/${result.id}`} className="detail-btn">Details</Link>
                                                            }
                                                            {result?.compliance_status && result?.profile_status !== "Active" && result?.compliance_status !== "ON HOLD" && 
                                                                <Link to={`shifts/${result.id}`} className="detail-btn">Details</Link>
                                                            } */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })
                        }

                    </Container>
                </div>
                <div className="pagination-container">
                    <Container>
                        <div className="inner-pagination">
                            <Pagination onChange={handleChangePage} page={page} count={shiftList?.data?.last_page} boundaryCount={2} />
                        </div>
                    </Container>
                </div>

            </div>

        </>
    )
}

export default ShiftTable