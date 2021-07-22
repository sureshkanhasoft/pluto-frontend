import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ApartmentIcon from '@material-ui/icons/Apartment';

const useStyles = makeStyles((theme) => ({
    leftBorder:{
        borderLeft:"1px solid #eaecfb",
        paddingLeft:24
    },
    refId:{
        fontSize:18
    },
    number:{
        fontSize:16,
        fontWeight:"500"
    },
    link:{
        color:"#184a7b",
        fontWeight:"500"
    }
}))

const ShiftsDetail = () => {
    const classes = useStyles();
    return (
        <>
        <ProfileUpdateInfo />
        <section className="pt-16 pb-32">
            <Container maxWidth="lg">
                <Link to="/shifts" className="back-button"><KeyboardArrowLeftIcon /> Back to all shifts </Link>
                <h1 className="mt-16">Shift Details</h1>

                <Card className="shift-detial-container">
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} md={10}>
                                <div className="refrence-text">
                                    <div className="block-icon">
                                        <WatchLaterIcon />
                                    </div>
                                    <div className="">
                                        <span className="title-text-sm">REFERENCE SHIFT ID</span>
                                        <Typography variant="h6" className={classes.refId}>0521031755</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2} className={classes.leftBorder}>
                                <div className="">
                                    <span className="title-text-sm">RATE</span>
                                    <Typography variant="body1" className={classes.number}>£33/h</Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <div className="compliance-alert mt-16 mb-24">
                            <img src="https://app.altrix.co.uk/assets/img/onboarding-icon.png?id=c76a9373d3bdf3f28ccb" alt="warning" className="icon"/>
                            <Typography variant="body1">This Job role has additional compliance requirements. Please update your compliance to book this shift.</Typography>
                            <Link to="/profile/documents" className="compliance-btn">Check compliance</Link>
                        </div>

                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <div className="row-header">
                                    <WatchLaterIcon />
                                    <h4 className="mb-0"> Shift Time</h4>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">Specialist</span>
                                    <p>Cardiologist</p>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">SHIFT DATE</span>
                                    <p>Thursday 08 July 2021</p>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">SHIFT TIMES</span>
                                    <p>19:00—07:30</p>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">DURATION</span>
                                    <p>12:30:00</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4} className={classes.leftBorder}>
                                <div className="row-header">
                                    <ApartmentIcon />
                                    <h4 className="mb-0">Hospital Details</h4>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">HOSPITAL NAME</span>
                                    <p>Grimsby - Diana, Princess of Wales Hospital</p>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">NAME OF WARD</span>
                                    <p>B2 Yellow A IAAU DPoW</p>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">TYPE OF WARD</span>
                                    <p>Acute Assessment</p>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">HOSPITAL WEBSITE</span>
                                    <p><a href="https://www.nlg.nhs.uk/hospitals/grimsby/" target="_blank" rel="noreferrer" className={classes.link}>https://www.nlg.nhs.uk/hospitals/grimsby/</a></p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4} className={classes.leftBorder}>
                                <div className="row-header">
                                    <LocationOnIcon />
                                    <h4 className="mb-0">Shift Location</h4>
                                </div>
                                <div className="">
                                    <span className="title-text-sm">ADDRESS</span>
                                    <p>Scartho Road, Grimsby</p>
                                </div>
                                <div className="">
                                    
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