import React, { useEffect, useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    Backdrop, CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { useDispatch, useSelector } from 'react-redux';
import { confirmBook, getShiftDetail, shiftApply } from '../../store/action';
import Notify from '../../components/Notify/Notify';

const useStyles = makeStyles((theme) => ({
    leftBorder: {
        borderLeft: "1px solid #eaecfb",
        paddingLeft: 24
    },
    refId: {
        fontSize: 18
    },
    number: {
        fontSize: 16,
        fontWeight: "500"
    },
    link: {
        color: "#184a7b",
        fontWeight: "500"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const ShiftsDetail = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
    const shift_id = match.params.id;
    const { getShiftDetails, loading, applyShiftSuccess, confirmBookSuccess, confirmBookError } = useSelector(state => state.browseShift)
    const [applyNotify, setApplyNotify] = useState(false)
    const [confirmNotify, setConfirmNotify] = useState(false)
    const [data, setData] = useState({
        booking_id: shift_id,
        signee_status: ""
    })

    const [shiftData, setShiftData] = useState({
        booking_id: shift_id,
        signee_id: getShiftDetails?.data?.signeeid,
        status: ""
    })

    let today = new Date(getShiftDetails?.data?.date);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
    const shiftDate = today.toLocaleDateString("en-US", options)

    useEffect(() => {
        dispatch(getShiftDetail(shift_id))
    }, [])

    const applyShift = () => {
        data.signee_status = "Interested"
        dispatch(shiftApply(data))
        setApplyNotify(true)
        setTimeout(() => {
            dispatch(getShiftDetail(shift_id))
        }, 4000);
    }

    const confirmBookApply = (statusData) => {
        shiftData.signee_id = getShiftDetails?.data?.signeeid;
        shiftData.status = statusData;
        dispatch(confirmBook(shiftData));
        setConfirmNotify(true);
        setTimeout(() => {
            dispatch(getShiftDetail(shift_id))
        }, 4000);
    }

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {applyNotify && applyShiftSuccess?.message &&
                <Notify
                    data={applyShiftSuccess?.message}
                    status="success"
                />
            }
            {confirmNotify && confirmBookSuccess?.message &&
                <Notify
                    data={confirmBookSuccess?.message}
                    status="success"
                />
            }
            {/* {confirmNotify && confirmBookError?.message &&
                <Notify
                    data={confirmBookError?.message}
                    status="error"
                />
            } */}
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <Link to="/shifts" className="back-button"><KeyboardArrowLeftIcon /> Back to all shifts </Link>
                    <h1 className="mt-16">Shift Details</h1>

                    <Card className="shift-detail-container">
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} md={8}>
                                    <div className="refrence-text">
                                        <div className="block-icon">
                                            <WatchLaterIcon />
                                        </div>
                                        <div className="">
                                            <span className="title-text-sm">REFERENCE SHIFT ID</span>
                                            <Typography variant="h6" className={classes.refId}>{getShiftDetails?.data?.reference_id}</Typography>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2} className={classes.leftBorder}>
                                    <div className="">
                                        <span className="title-text-sm">Shift Type</span>
                                        <Typography variant="body1" className={classes.number}>{getShiftDetails?.data?.shift_type}</Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2} className={classes.leftBorder}>
                                    <div className="">
                                        <span className="title-text-sm">RATE</span>
                                        <Typography variant="body1" className={classes.number}>£{getShiftDetails?.data?.rate}/h</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="compliance-alert mt-16 mb-24">
                                {/* {getShiftDetails?.data?.booking_record_perm_for_signees?.book_shifts &&
                                    <span className="compliance-btn apply-btn" onClick={applyShift}>Apply</span>
                                }
                                {getShiftDetails?.data?.booking_record_perm_for_signees?.cancel_shifts &&
                                    <span className="compliance-btn apply-btn disabled-btn">Applied</span>
                                } */}
                                {
                                    getShiftDetails?.data?.compliance_status !== "COMPLIANT"
                                        ?
                                        <>
                                            <img src="https://app.altrix.co.uk/assets/img/onboarding-icon.png?id=c76a9373d3bdf3f28ccb" alt="warning" className="icon" />
                                            <Typography variant="body1">This Job role has additional compliance requirements. Please update your compliance to book this shift.</Typography>
                                            <Link to="/profile/documents" className="compliance-btn">Check compliance</Link>

                                        </>
                                        :
                                        getShiftDetails?.data?.profile_status === "Active" &&
                                        <>
                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "OFFER") &&
                                                <span className="compliance-btn apply-btn " onClick={() => confirmBookApply("ACCEPT")}>ACCEPT</span>
                                            }
                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "OFFER" || getShiftDetails?.data?.signee_booking_status === "CONFIRMED") &&
                                                <span className="compliance-btn apply-btn" onClick={() => confirmBookApply("DECLINE")}>DECLINE</span>
                                            }

                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "REJECT") &&
                                                <span className="compliance-btn apply-btn ">REJECT</span>
                                            }
                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "APPLY") &&
                                                <span className="compliance-btn apply-btn" onClick={() => confirmBookApply("DECLINE")}>Cancel</span>
                                            }
                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "PENDING") &&
                                                <span className="compliance-btn apply-btn" onClick={applyShift}>Apply</span>
                                            }
                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "CANCEL") &&
                                                <span className="compliance-btn apply-btn cursor-none">Rejected</span>
                                            }
                                            {
                                                (getShiftDetails?.data?.signee_booking_status === "DECLINE") &&
                                                <span className="compliance-btn apply-btn cursor-none">DECLINE</span>
                                            }
                                        </>
                                }
                                {/* {getShiftDetails?.data?.compliance_status && getShiftDetails?.data?.profile_status === "Active" && getShiftDetails?.data?.compliance_status !== "COMPLIANT" &&
                                    <>
                                        <img src="https://app.altrix.co.uk/assets/img/onboarding-icon.png?id=c76a9373d3bdf3f28ccb" alt="warning" className="icon" />
                                        <Typography variant="body1">This Job role has additional compliance requirements. Please update your compliance to book this shift.</Typography>
                                        <Link to="/profile/documents" className="compliance-btn">Check compliance</Link>
                                    </>
                                }
                                {getShiftDetails?.data?.compliance_status && getShiftDetails?.data?.profile_status === "Active" && getShiftDetails?.data?.compliance_status === "COMPLIANT" &&
                                    <span className="compliance-btn apply-btn disabled-btn">Applied</span>
                                } */}
                            </div>

                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <div className="row-header">
                                        <WatchLaterIcon />
                                        <h4 className="mb-0"> Shift Time</h4>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">Specialist</span>
                                        {/* <p>Cardiologist</p> */}
                                        <p>{getShiftDetails?.data?.speciality_name}</p>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">SHIFT DATE</span>
                                        {/* <p>Thursday 08 July 2021</p> */}
                                        <p>{shiftDate}</p>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">SHIFT TIMES</span>
                                        {/* <p>{getShiftDetails?.data?.start_time} - {getShiftDetails?.data?.end_time}</p> */}
                                        <p>{getShiftDetails?.data?.start_time.slice(0, 5)} - {getShiftDetails?.data?.end_time.slice(0, 5)}</p>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">DURATION</span>
                                        {/* <p>12:30:00</p> */}
                                        <p>{getShiftDetails?.data?.duration.slice(0, 5)}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} className={classes.leftBorder}>
                                    <div className="row-header">
                                        <ApartmentIcon />
                                        <h4 className="mb-0">Hospital Details</h4>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">HOSPITAL NAME</span>
                                        <p>{getShiftDetails?.data?.hospital_name}</p>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">WARD NAME</span>
                                        <p>{getShiftDetails?.data?.ward_name}</p>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">TYPE OF WARD</span>
                                        <p>{getShiftDetails?.data?.ward_type}</p>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">HOSPITAL WEBSITE</span>
                                        {/* <p><a href="https://www.nlg.nhs.uk/hospitals/grimsby/" target="_blank" rel="noreferrer" className={classes.link}>https://www.nlg.nhs.uk/hospitals/grimsby/</a></p> */}
                                        <p><a href={getShiftDetails?.data?.trust_portal_url ? getShiftDetails?.data?.trust_portal_url : "#"} target="_blank" rel="noreferrer" className={classes.link}>{getShiftDetails?.data?.trust_portal_url}</a></p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} className={classes.leftBorder}>
                                    <div className="row-header">
                                        <LocationOnIcon />
                                        <h4 className="mb-0">Shift Location</h4>
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">ADDRESS</span>
                                        <p className="mb-0">{getShiftDetails?.data?.address_line_1}{getShiftDetails?.data?.address_line_2 ? "," : ""} {getShiftDetails?.data?.address_line_2}</p>
                                        <p>{getShiftDetails?.data?.city} - {getShiftDetails?.data?.post_code}</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </section>

        </>
    );
};

export default ShiftsDetail;