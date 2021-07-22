import React, { useState } from 'react'
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    makeStyles,
    Box,
    Button,
    Typography
} from '@material-ui/core';

import ProfileUpdateInfo from "../../components/ProfileUpdateInfo/ProfileUpdateInfo";
import EditIcon from '@material-ui/icons/Edit';
// import WarningIcon from '@material-ui/icons/Warning';

const useStyle = makeStyles(() => ({


    card: {
        background: "#f7f8fd",
        borderRadius: "4px",
        boxShadow: "0 6px 11px rgba(151, 157, 175, 0.27)",
    },
    cardContainer: {
        padding: "0 0 0 !important",

    },
    userImage: {
        height: "100%",
        background: "linear-gradient(180deg,#296bac 0,#184a7b)",
        borderRadius: "4px",
        boxShadow: "0 6px 11px rgba(151, 157, 175, 0.27)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 16,
        fontSize: 12
    },
    textFiled: {
        // marginBottom: 24,
        "& .MuiInputLabel-formControl": {
            padding: "0 32px"
        },
        "& .MuiInputBase-root": {
            padding: "0 24px"
        }
    },
    textRow: {
        "&:hover": {
            background: "#ccc"
        }
    },
    btnSecondary: {
        background: "#f78b46",
        width: 140,
        height: 36,
        color: "#fff",
        boxShadow: "none",
        "&:hover": {
            boxShadow: "none",
            background: "#d76f2d",
        }
    },
    btnCancel: {
        width: 140,
        height: 36,
        marginLeft: 16
    },
    deleteBox: {
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 6px 11px rgba(151, 157, 175, 0.30)",
        padding: "24px 12px"
    },
    warningIcon: {
        margin: "0 24px 0 12px",
        color: "#ff356f",
        width: "55px",
        height: "auto"
    },
    deleteBtn: {
        whiteSpace: "nowrap",
        background: "#ff356f",
        color: "#fff",
        boxShadow: "none",
        flex: "none",
        "&:hover": {
            boxShadow: "none",
            background: "#df265b"
        }
    },
    warningText: {
        fontSize: 14,
        color: "#ff356f",
        margin: 0,
        fontWeight: "300"
    }
}))

const Information = () => {
    const classes = useStyle();

    const [profile, setProfile] = useState({
        email: "davidwarner@gmail.com",
        firstname: "David",
        lastname: "Warner",
        number: "990000000",
        address1: "Postal code in Cambridge, England",
        address2: "Postal code in Cambridge, England",
        city: "Cambridge",
        postcode: "CB10BX"
    })
    const handleChange = (e) => {
        e.preventDefault();
        setProfile({ ...profile, [e.target.name]: e.target.value })

    }
    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">My details</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Card className={classes.userImage}>
                                <Typography variant="caption">PLUTO USER NUMBER</Typography>
                                <Typography variant="body1">AN05619</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContainer}>
                                    <div className="form-field">
                                        <TextField
                                            label="EMAIL"
                                            fullWidth
                                            value={profile.email}
                                            // value="davidwarner@gmail.com"
                                            name="email"
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="email"
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="LAST NAME"
                                            id="lastName"
                                            name="lastname"
                                            value={profile.lastname}
                                            // value="Warner"
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="FIRST NAME"
                                            id="firstName"
                                            name="firstname"
                                            // value="David"
                                            value={profile.firstname}
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="PHONE NUMBER"
                                            id="phoneNumber"
                                            name="number"
                                            // value="99000000"
                                            value={profile.number}
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContainer}>
                                    <div className="form-field">
                                        <TextField
                                            label="ADDRESS LINE 1"
                                            id="address1"
                                            name="address1"
                                            value={profile.address1}
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="ADDRESS LINE 2"
                                            id="address2"
                                            name="address2"
                                            value={profile.address2}
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="CITY OR TOWN"
                                            id="city"
                                            name="city"
                                            value={profile.city}
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="POST CODE"
                                            id="postCode"
                                            name="postcode"
                                            value={profile.postcode}
                                            onChange={handleChange}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" className="mt-24">
                        <Button variant="contained" className={classes.btnSecondary}>Update</Button>
                        <Button variant="outlined" className={classes.btnCancel}>Cancel</Button>
                    </Box>

                </Container>
            </section>

            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Change Password</h1>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContainer}>
                                    <div className="form-field">
                                        <TextField
                                            label="OLD PASSWORD"
                                            id="oldPssword"
                                            placeholder="xxxxxxxx"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="NEW PASSWORD"
                                            id="newPassword"
                                            placeholder="xxxxxxxx"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            label="CONFIRM NEW PASSWORD"
                                            id="conPassword"
                                            placeholder="xxxxxxxx"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.textFiled}
                                            InputProps={{
                                                endAdornment: <EditIcon />
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box className="mt-24">
                        <Button variant="contained" className={classes.btnSecondary}>Update</Button>
                        <Button variant="outlined" className={classes.btnCancel}>Cancel</Button>
                    </Box>
                </Container>
            </section>

            {/* <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Delete profile</h1>
                    <Box display="flex" alignItems="center" className={classes.deleteBox}>
                        <WarningIcon className={classes.warningIcon} />
                        <p className={classes.warningText}>If you wish to delete your profile, please bear in mind that all your historical data will be deleted from our servers and you won’t able to access it anymore.</p>
                        <Button variant="contained" className={classes.deleteBtn}>I want to delete my profile</Button>
                    </Box>
                </Container>
            </section> */}
        </>
    )
}

export default Information
