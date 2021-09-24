import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/action/profile/profileAction';
import { changePassword, updateProfile } from '../../store/action'
import { useForm } from 'react-hook-form';
import Notify from '../../components/Notify/Notify';
import UtilService from '../../helper/service';
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
        fontSize: 12,
        position: 'relative',
        height: 296,
        '& img': {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border:"4px solid #fff"
        }
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
    const dispatch = useDispatch()

    const { getProfileList: { data: dataItem }, passChange, passErrors, updateProfileErrors, updateProfileSuccess } = useSelector(state => state.profile)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [changePassNotify, setChangePassNotify] = useState(false)
    const [updateProfileNotify, setUpdateProfileNotify] = useState(false)
    const disFutureDate = UtilService.disabledPastDate()

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
        nationality:"",
        date_of_birth:"",
    })

    const [pass, setPass] = useState({
        password: "",
        confirm_password: "",
        old_password: "",
    })
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })

    }
    const handlePassChange = (event) => {
        event.preventDefault();
        setPass({ ...pass, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        setData(dataItem)
    }, [dataItem])

    useEffect(() => {
        dispatch(getProfile())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const changePasswordSubmit = () => {
        dispatch(changePassword(pass))
        setChangePassNotify(true)
        reset();
    }

    const resetForm = () => {
        reset();
    }

    const updateProfile1 = (e) => {
        e.preventDefault()
        dispatch(updateProfile(data))
        setUpdateProfileNotify(true)
    }

    return (
        <>
            {changePassNotify && passErrors?.message &&
                <Notify
                    data={passErrors?.message}
                    status="error"
                />
            }
            {changePassNotify && passChange?.message &&
                <Notify
                    data={passChange?.message}
                    status="success"
                />
            }

            {updateProfileNotify && updateProfileSuccess?.message &&
                <Notify
                    data={updateProfileSuccess?.message}
                    status="success"
                />
            }
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">My details</h1>
                    <form onSubmit={(e) => updateProfile1(e)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.userImage}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNWVnKZZfy-1CLo75eO5vLhTWFZyeyc7QaI6GgdSalXDIJOCA6t0DSdDDMabrTOdjdYs&usqp=CAU" alt="profile img" />
                                    <div className="choose_file">
                                        <span>Upload Photo</span>
                                        <input name="filename" type="file" />
                                    </div>
                                    {/* <Typography variant="caption">PLUTO USER NUMBER</Typography>
                                    <Typography variant="body1">{data?.candidate_id}</Typography> */}
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContainer}>
                                        <div className="form-field">
                                            <TextField
                                                label="EMAIL"
                                                fullWidth
                                                value={data?.email ? data?.email : ""}
                                                placeholder="-"
                                                name="email"
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                id="email"
                                                className={classes.textFiled}
                                                InputProps={{
                                                    // endAdornment: <EditIcon />,
                                                    readOnly: true,
                                                }}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="FIRST NAME"
                                                id="first_name"
                                                name="first_name"
                                                value={data?.first_name ? data?.first_name : ""}
                                                placeholder="-"
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
                                                error={updateProfileErrors?.message?.first_name ? true : false}
                                                required
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="LAST NAME"
                                                id="last_name"
                                                name="last_name"
                                                // value="David"
                                                value={data?.last_name ? data?.last_name : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                error={updateProfileErrors?.message?.last_name ? true : false}
                                                required
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="PHONE NUMBER"
                                                id="contact_number"
                                                name="contact_number"
                                                // value="99000000"
                                                value={data?.contact_number ? data?.contact_number : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                error={updateProfileErrors?.message?.contact_number ? true : false}
                                                required
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
                                                id="address_line_1"
                                                name="address_line_1"
                                                value={data?.address_line_1 ? data?.address_line_1 : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                error={updateProfileErrors?.message?.address_line_1 ? true : false}
                                                required
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="ADDRESS LINE 2"
                                                id="address_line_2"
                                                name="address_line_2"
                                                value={data?.address_line_2 ? data?.address_line_2 : ""}
                                                placeholder="-"
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
                                                value={data?.city ? data?.city : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                error={updateProfileErrors?.message?.city ? true : false}
                                                required
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="POST CODE"
                                                id="postCode"
                                                name="postcode"
                                                value={data?.postcode ? data?.postcode : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                error={updateProfileErrors?.message?.postcode ? true : false}
                                                required
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
                                                label="Nationality"
                                                id="nationality"
                                                name="nationality"
                                                value={data?.nationality ? data?.nationality : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                error={updateProfileErrors?.message?.nationality ? true : false}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="form-field">
                                            <TextField
                                                label="Date of birth"
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                type="date"
                                                value={data?.date_of_birth ? data?.date_of_birth : ""}
                                                placeholder="-"
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.textFiled}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="NMC DMC pin"
                                                id="nmc_dmc_pin"
                                                name="nmc_dmc_pin"
                                                value={data?.nmc_dmc_pin ? data?.nmc_dmc_pin : ""}
                                                placeholder="-"
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
                            <Button variant="contained" className={classes.btnSecondary} type="submit" formNoValidate>Update</Button>
                            {/* <Button variant="outlined" className={classes.btnCancel}>Cancel</Button> */}
                        </Box>

                    </form>

                </Container>
            </section>

            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Change Password</h1>
                    <form onSubmit={handleSubmit(changePasswordSubmit)} autoComplete="off">
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContainer}>
                                        <div className="form-field">
                                            <TextField
                                                label="OLD PASSWORD"
                                                id="old_password"
                                                placeholder="xxxxxxxx"
                                                name="old_password"
                                                type="password"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("old_password", {
                                                    required: "Please enter confirm password",
                                                    minLength: {
                                                        value: 5,
                                                        message: "min length is 5"
                                                    }
                                                })}
                                                error={errors.old_password ? true : false}
                                                className={classes.textFiled}
                                                onChange={handlePassChange}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                autoComplete="new-password"
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="NEW PASSWORD"
                                                id="password"
                                                name="password"
                                                placeholder="xxxxxxxx"
                                                type="password"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("password", {
                                                    required: "Please enter confirm password",
                                                    minLength: {
                                                        value: 5,
                                                        message: "min length is 5"
                                                    }
                                                })}
                                                error={errors.password ? true : false}
                                                className={classes.textFiled}
                                                onChange={handlePassChange}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-field">
                                            <TextField
                                                label="CONFIRM NEW PASSWORD"
                                                id="confirm_password"
                                                name="confirm_password"
                                                placeholder="xxxxxxxx"
                                                type="password"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("confirm_password", {
                                                    required: "Please enter confirm password",
                                                    minLength: {
                                                        value: 5,
                                                        message: "min length is 5"
                                                    }
                                                })}
                                                error={errors.confirm_password ? true : false}
                                                className={classes.textFiled}
                                                onChange={handlePassChange}
                                                InputProps={{
                                                    endAdornment: <EditIcon />
                                                }}
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Box className="mt-24">
                            <Button type="submit" variant="contained" className={classes.btnSecondary} formNoValidate>Update</Button>
                            <Button variant="outlined" className={classes.btnCancel} onClick={resetForm}>Cancel</Button>
                        </Box>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default Information
