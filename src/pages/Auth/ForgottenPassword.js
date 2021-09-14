import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid, Card, TextField, Button, makeStyles, Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import logo from '../../assets/images/logo.svg';
import { forgotPassword } from '../../store/action';
import { useForm } from 'react-hook-form';
// import { useForm } from "react-hook-form";
// import Notification from '../../../components/Notification/Notification';

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
    error: {
        marginBottom: "15px",
        paddingLeft: "7px",
        color: "red"
    },
    success: {
        marginBottom: "15px",
        paddingLeft: "7px",
        color: "green"
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
    },
    forgotText: {
        color: "#2b68a4",
        fontSize: 13,
        borderBottom: "1px dashed #2b68a4"
    },
    resetBtn: {
        width: 180,
        borderRadius: "4px",
        margin: "0 auto",
        background: "#ff8b46",
        "&:hover": {
            background: "#ff8b46"
        }
    },
    subTitle: {
        fontSize: 20,
        color: "#9dcbec",
        marginBottom: 20
    },
    descText: {
        marginBottom: 20
    },
    validationError: {
        marginTop: "-14px",
        marginBottom: "10px",
        color: "red"
    },
})

const ForgottenPassword = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const { forgotsuccess, forgoterrors } = useSelector(state => state.authenticate)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [forgotMsg, setForgotMsg]=useState(false)
    const [data, setData] = useState(
        { 
            email: "" 
        }
    )
    
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const onSubmit = () => {
        // e.preventDefault();
        dispatch(forgotPassword(data));
        setForgotMsg(true);
        // reset();
    };

    return (
        <>
            <Grid className={classes.loginContainer}>
                <div className="mb-6">
                    <img src={logo} alt="" />
                </div>
                <Typography className={classes.subTitle}>Forgot your Password?</Typography>
                {
                    forgotsuccess?.message && 
                    <Alert severity="success" className="mb-24">
                        <AlertTitle>Success</AlertTitle>
                        If there's an account associated with this email address, <br/>we'll send you a link to reset your password.
                    </Alert>
                }
                
                <Card className={classes.loginCard}>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            autoComplete="off"
                            // value={data.email}
                            
                            type="email"
                            variant="outlined"
                            required
                            InputProps={{
                                startAdornment: <MailIcon />
                            }}
                            {...register("email", {
                                required: "Please enter email",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                },
                            })}
                            error={errors.email ? true : false}
                            onChange={handleChange}
                            className={classes.textField}
                        />
                        {/* {errors.email && <span className={classes.validationError} role="alert"> {errors.email.message}</span>} */}

                        <div className={classes.forgotCont}>
                            <Link to="/login" className={classes.forgotText}>Back to Login</Link>
                        </div>
                        {/* <Button variant="contained" color="primary" className={classes.resetBtn} onClick={toggleContainer}> */}
                        <Button variant="contained" formNoValidate  type="submit" color="primary" className={classes.resetBtn} >
                            Send
                        </Button>
                    </form>
                </Card>
            </Grid>
        </>
    )
}

export default ForgottenPassword