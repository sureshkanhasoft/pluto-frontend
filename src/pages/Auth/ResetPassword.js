import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid, Card, TextField, Button, makeStyles, Typography 
} from '@material-ui/core';
import logo from '../../assets/images/logo.svg';
import LockIcon from '@material-ui/icons/Lock';
import { resetPassword } from '../../store/action';
import { useForm } from 'react-hook-form';
import Notify from '../../components/Notify/Notify';

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
    changeCont: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 24,
    },
    changeText: {
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

const ResetPassword = ({ history }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [resetMsg, setReset]=useState(false)
    const dId = params.get('query');
    const { resetSuccess, resetErrors } = useSelector(state => state.authenticate)
    const [data, setData] = useState({
        password: "",
        confirm_password: "",
        decode_id: dId,
    })
    const onSubmit = () => {
        // e.preventDefault();
        dispatch(resetPassword(data));
        setReset(true)
        // reset();
    };
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    return (
        <>
            <Grid className={classes.loginContainer}>
                <div className="mb-6">
                    <img src={logo} alt="" />
                </div>
                <Typography className={classes.subTitle}>Reset your password</Typography>
                <Card className={classes.loginCard}>
                    {resetMsg && resetErrors?.message &&
                        <Notify
                            data={resetErrors?.message}
                            status="error"
                        />
                    }
                    {resetMsg && resetSuccess?.message &&
                        <Notify
                            data={resetSuccess?.message}
                            status="success"
                        />
                    }
                    <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            autoComplete="off"
                            value={data?.password || ""}
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            // aria-invalid={errors.password ? "true" : "false"}
                            required
                            {...register("password", {
                                required: "Please enter password",
                                minLength: {
                                    value: 5,
                                    message: "min length is 5"
                                }
                            })}
                            error={errors.password ? true : false}
                            onChange={handleChange}
                            className={classes.textField}
                        />
                        {/* {errors.password && <span className={classes.validationError} role="alert"> {errors.password.message}</span>} */}

                        <TextField
                            id="confirm_password"
                            name="confirm_password"
                            label="Confirm password"
                            value={data?.confirm_password || ""}
                            autoComplete="off"
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            className={classes.textField}
                            required
                            {...register("confirm_password", {
                                required: "Please enter confirm password",
                                minLength: {
                                    value: 5,
                                    message: "min length is 5"
                                }
                            })}
                            error={errors.confirm_password ? true : false}
                            onChange={handleChange}
                        />
                        {/* {errors.confirm_password && <span className={classes.validationError} role="alert">{errors.confirm_password.message}</span>} */}
                        <Button variant="contained" color="primary" type="submit" className={classes.resetBtn} formNoValidate>
                            Reset Password
                        </Button>
                    </form>
                </Card>

            </Grid>
        </>
    )
}

export default ResetPassword