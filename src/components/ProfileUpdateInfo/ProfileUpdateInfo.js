import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const ProfileUpdateInfo = () => {
    const signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
    return (
        <>
            {
                signeeInfo.status !== "COMPLIANT" &&
                <section className="update-section">
                    <Container maxWidth="lg">
                        <Link to="/profile/documents" className="onboarding-banner">
                            <Grid container justify="space-between" alignItems="center">
                                <Grid className="inner-container">
                                    <img src="https://app.altrix.co.uk/assets/img/onboarding-icon.png?id=c76a9373d3bdf3f28ccb" alt="warning" className="icon" />
                                    <p variant="subtitle2" className="mb-0">Your profile is not complete. Please update the relevant information.</p>
                                </Grid>
                                <Grid className="inner-container">
                                    <Typography variant="body2" >Complete your profile </Typography>
                                    <ChevronRightIcon />
                                </Grid>
                            </Grid>
                        </Link>
                    </Container>
                </section>
            }

        </>
    );
};

export default ProfileUpdateInfo;