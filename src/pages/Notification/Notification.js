import React from 'react'
import {
    Container, Box, Paper, makeStyles, Typography
} from '@material-ui/core';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'

const useStyle = makeStyles(() => ({
    notificationBox: {
        width: "100%",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        position: "relative",
        overflow: "hidden",
        '&::after': {
            content: `""`,
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: "100%",
            background: "#184a7b",
        }
    },
    menuHeading: {
        fontSize: 15,
    },
    menuDesc: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.6)",
    }
}))

const Notification = () => {
    const classes = useStyle();
    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mt-16">Notifications</h1>
                    <Box className="mb-36">
                        {
                            [1, 2, 3, 4, 5, 6].map(index => {
                                return (
                                    <Paper elevation={3} className={classes.notificationBox} key={index}>
                                        <div>
                                            <Typography variant="h6" className={classes.menuHeading}>Heading {index}</Typography>
                                            <Typography variant="body2" className={classes.menuDesc}>Notification demo item {index}</Typography>
                                        </div>
                                        <span>17 jun</span>

                                    </Paper>
                                )
                            })
                        }

                    </Box>
                </Container>
            </section>
        </>
    )
}

export default Notification
