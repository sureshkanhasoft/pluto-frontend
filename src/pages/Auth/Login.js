import React, { useState } from 'react'
import {
    Grid, Card, TextField, Button, makeStyles,
    FormControl, Select, MenuItem, InputLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/action/auth/authAction';
import logo from '../../assets/images/logo.svg'
// import { getOrganization } from '../../store/action';
// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Notify from '../../components/Notify/Notify';
import { apiClient } from '../../config/apiClient';

const useStyle = makeStyles({
    loginContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#2b68a4",
        flexDirection: "column"
    },
    loginCard: {
        width: "100%",
        maxWidth: 480,
        padding: "36px 24px 24px",
        background: "#dceeff",
        boxShadow: "0 1px 35px rgba(11, 48, 86, 0.50)",
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        marginBottom: 24,
        color: "#000",
        "& input": {
            paddingLeft: 12
        },
        "& svg": {
            color: "#2b68a4"
        }
    },
    forgotCont: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 24,
        marginTop: 12
    },
    forgotText: {
        color: "#2b68a4",
        fontSize: 13,
        borderBottom: "1px dashed #2b68a4"
    },
    loginBtn: {
        width: 140,
        borderRadius: "4px",
        margin: "0 auto",
        background: "#ff8b46",
        "&:hover": {
            background: "#ff8b46"
        }
    },
    bottomLink: {
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14
    },
    registerBtn: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: "500",
        color: "#2b68a4"
    }
})

const Login = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    // const { getOrglist } = useSelector(state => state.organization)
    // console.log('getOrglist: ', getOrglist);
    const { loginErrors, userInfo } = useSelector(state => state.authenticate)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loginNotify, setLoginNotify] = useState(false)

    const [orgList, setOrgList] = useState([])
    const [emailNotify, setEmailNotify] = useState("")


    const [getEmail, setGetEmail] = useState({

        email: ""
    })

    const [data, setData] = useState({
        email: "",
        password: "",
        organization_id: ""
    })

    const handleBlurEmail = async () => {
        if (getEmail.email !== "") {
            setEmailNotify("")
            await apiClient(true).post(`api/signee/get-email-organisation`, getEmail)
                .then(response => {
                    const dataItem = response.data
                    if (dataItem && dataItem.status === true) {
                        setOrgList(dataItem)
                    } else {
                        setEmailNotify("Invalid email address")
                    }
                }).catch(error => {
                    setEmailNotify(error.response.data.message)
                })
        }


    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        setGetEmail({ ...getEmail, [event.target.name]: event.target.value });
    }

    const loginSubmit = () => {
        // e.preventDefault()
        dispatch(login(data))
        setLoginNotify(true)
    }

    // useEffect(() => {
    //     dispatch(getOrganization())
    // }, [])
    return (
        <>
            {loginNotify && (loginErrors?.message || loginErrors) &&
                <Notify
                    data={loginErrors?.message ? loginErrors?.message : loginErrors}
                    status="error"
                />
            }
            {emailNotify &&
                <Notify
                    data={emailNotify}
                    status="error"
                />
            }
            {loginNotify && userInfo?.message &&
                <Notify
                    data={userInfo?.message}
                    status="success"
                />
            }
            <Grid className={classes.loginContainer}>
                <div className="mb-16">
                    <img src={logo} alt="" />
                </div>
                <Card className={classes.loginCard}>
                    <form className={classes.form} onSubmit={handleSubmit(loginSubmit)} autoComplete="off">
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            autoComplete="off"
                            variant="outlined"
                            {...register('email', {
                                required: "The email field is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                },
                                onBlur: handleBlurEmail
                            })}
                            error={(errors.email ? true : false)}
                            onBlur={handleBlurEmail}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <MailIcon />
                            }}
                            className={classes.textField}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            autoComplete="new-password"
                            {...register('password', {
                                required: "The password field is required.",
                            })}
                            error={(errors.password ? true : false)}
                            onChange={handleChange}
                            type="password"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            className={classes.textField}
                        />

                        <FormControl variant="outlined" className={classes.formControl}
                            {...register('organization_id', {
                                required: "The organization field is required.",
                            })}
                            error={(errors.organization_id ? true : false)}
                        >
                            <InputLabel>Select Organization</InputLabel>
                            <Select
                                value={data.organization_id}
                                label="Select Organization"
                                onChange={handleChange}
                                name="organization_id"
                            >
                                <MenuItem value="">
                                    Select Organization
                                </MenuItem>
                                {
                                    orgList?.data && orgList?.data.map((list, index) => {
                                        return (
                                            <MenuItem value={list.organization_id} key={index}>{list.organization_name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <div className={classes.forgotCont}>
                            <Link to="forgotten-password" className={classes.forgotText}>Forgotten your password?</Link>
                        </div>
                        <Button variant="contained" color="primary" className={classes.loginBtn} type="submit" formNoValidate>
                            login
                        </Button>
                        <div className={classes.bottomLink}>
                            <p className="mb-0">Don't have an account?</p>
                            <Link to="register" className={classes.registerBtn}>Register</Link>
                        </div>
                    </form>
                </Card>
            </Grid>
        </>
    );
};

export default Login;