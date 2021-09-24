import React, { useState } from 'react'
import {
    Grid, Card, TextField, Button, makeStyles,
    FormControl, Select, MenuItem, InputLabel,
    FormLabel, FormControlLabel, Checkbox
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import logo from '../../assets/images/logo.svg'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganization, registerUser } from '../../store/action';
import { apiClient } from '../../config/apiClient';
import { useForm } from 'react-hook-form';
import UtilService from '../../helper/service';
import Notify from '../../components/Notify/Notify';

const useStyle = makeStyles({
    loginContainer: {
        width: "100%",
        height: "100vh",
        overflow: "auto",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        background: "#2b68a4",
        flexDirection: "column"
    },
    logoContainer: {
        marginBottom: '16px',
        paddingTop: 40,
        '& img': {
            margin: '0 auto',
            display: "block"
        }
    },
    loginCard: {
        width: "100%",
        maxWidth: 600,
        padding: "36px 24px 24px",
        background: "#dceeff",
        boxShadow: "0 1px 35px rgba(11, 48, 86, 0.50)",
        margin: '0 auto 30px'
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        marginBottom: 16,
        color: "#000",
        width: "100%",
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
    loginBtn: {
        width: 140,
        borderRadius: "4px",
        // margin:"0 auto",
        background: "#ff8b46",
        "&:hover": {
            background: "#ff8b46"
        }
    },
    formControl: {
        width: "100%"
    },
    bottomBtn: {
        display: "flex",
        justifyContent: "space-between"
    },
    arroWForIcon: {
        width: 16,
        position: "absolute",
        right: 12,
        top: 6
    },
    arroWBackIcon: {
        width: 16,
        position: "absolute",
        left: 0,
        top: 6
    },
    inputHide: {
        display: "none"
    },
    bottomLink: {
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontSize: 14
    },
    registerBtn: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: "500",
        color: "#2b68a4"
    }
})

const Register = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    const [speciality, setSpeciality] = useState([])
    const { getOrglist } = useSelector(state => state.organization)
    const { registerErrors, registerSuccess } = useSelector(state => state.authenticate)
    console.log('registerErrors: ', registerErrors);
    const [registerNotify, setRegisterNotify]=useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm();

    const [orgId, setOrgId] = useState()
    const [getCandidateReferrredForm, setGetCandidateReferrredForm] = useState([])
    const disFutureDate = UtilService.disabledPastDate()

    const [data, setData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        organization_id: "",
        speciality: [],

        contact_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
        nmc_dmc_pin: "",
        candidate_referred_from: "",
        candidate_id: "",
        nationality: "",
        date_of_birth: "",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleOrgChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        setOrgId(event.target.value)
    }

    useEffect(() => {
        dispatch(getOrganization())
    }, [])

    const handleChangeCheck = (event) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        if (isChecked) {
            specialityData.speciality.push(parseFloat(event.target.value));
            setData(specialityData)
        } else {
            const newData = (specialityData.speciality).filter(item => item !== parseFloat(event.target.value));
            specialityData.speciality = newData;
            setData(specialityData)
        }

    };

    const uploadImage = (e) => {
        const formData = new FormData();
        const logoFile = e.target.files[0];
        // console.log('logoFile: ', logoFile);
        formData.append('file', logoFile)
    }

    const getSpecialities = async () => {
        await apiClient(true).get(`api/signee/get-org-specialities/${orgId}`)
            .then(response => {
                setSpeciality(response.data.data)
            }).catch(error => {
                console.log('error: ', error);
            })
    }

    useEffect(() => {
        getSpecialities()
    }, [orgId])

    const getCandidateId = async () => {
        await apiClient(true).get(`api/signee/generate-candidateId`)
            .then(response => {
                setData({ ...data, candidate_id: parseFloat(response.data.data.candidate_id) })
            }).catch(error => {
                console.log("error.message", error.message);
            });
    }
    useEffect(() => {
        getCandidateId()
    }, [])

    const getCandidateReferredFrom = async () => {
        await apiClient(true).get(`api/signee/candidate-referred-from`)
            .then(response => {
                const dataItem = response.data
                if (dataItem.status === true) {
                    setGetCandidateReferrredForm(dataItem)
                }
            }).catch(error => {
                console.log('error: ', error);
            })
    }
    useEffect(() => {
        getCandidateReferredFrom()
    }, [])

    const handleSubmit1 = () => {
        setCount(count + 1)
    }

    const handleSubmit4 = () => {
        dispatch(registerUser(data))
        setRegisterNotify(true)
    }

    return (
        <>
            {registerNotify && (registerErrors?.message || registerErrors) &&
                <Notify
                    data={registerErrors?.message}
                    status="error"
                />
            }
            {registerNotify && registerSuccess?.message &&
                <Notify
                    data={registerSuccess?.message}
                    status="success"
                />
            }
            <Grid className={classes.loginContainer}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt="pluto logo" />
                </div>
                <Card className={classes.loginCard}>
                    {
                        count === 0 &&
                        <form className={classes.form} onSubmit={handleSubmit(handleSubmit1)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        name="first_name"
                                        label="First name"
                                        variant="outlined"
                                        error={(errors.first_name ? true : false)}
                                        {...register("first_name", {
                                            required: true,
                                        })}
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="last_name"
                                        label="Last Name"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={(errors.last_name ? true : false)}
                                        {...register("last_name", {
                                            required: true,
                                        })}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={(errors.email ? true : false)}
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Enter a valid e-mail address",
                                            },
                                        })}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="contact_number"
                                        label="Contact Number"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={(errors.contact_number ? true : false)}
                                        {...register("contact_number", {
                                            required: true,
                                        })}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="address_line_1"
                                        label="Address line 1"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={(errors.address_line_1 ? true : false)}
                                        {...register("address_line_1", {
                                            required: true,
                                        })}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="address_line_2"
                                        label="Address line 2"
                                        variant="outlined"
                                        className={classes.textField}
                                        {...register("address_line_2")}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="city"
                                        label="City"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={(errors.city ? true : false)}
                                        {...register("city", {
                                            required: true,
                                        })}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="postcode"
                                        label="Postcode"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={(errors.postcode ? true : false)}
                                        {...register("postcode", {
                                            required: true,
                                        })}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="nationality"
                                        label="Nationality"
                                        variant="outlined"
                                        className={classes.textField}
                                        onChange={handleChange}
                                        fullWidth
                                        {...register("nationality")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="date_of_birth"
                                        label="Date of birth"
                                        type="date"
                                        name="date_of_birth"
                                        variant="outlined"
                                        {...register("date_of_birth")}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        inputProps={{
                                            max: disFutureDate
                                        }}
                                    />
                                </Grid>


                            </Grid>
                            <div className={classes.bottomBtn}>
                                <span></span>

                                <Button type="submit" variant="contained" color="primary" className={classes.loginBtn} formNoValidate>
                                    Next <ArrowForwardIosIcon className={classes.arroWForIcon} />
                                </Button>
                            </div>

                        </form>
                    }

                    {
                        count === 1 &&
                        <form className={classes.form} onSubmit={handleSubmit2(handleSubmit4)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <FormControl variant="outlined" className={classes.formControl} required
                                        error={(errors2.organization_id ? true : false)}
                                        {...register2("organization_id", {
                                            required: true,
                                        })}
                                    >
                                        <InputLabel>Select Organization</InputLabel>
                                        <Select
                                            value={data?.organization_id || ""}
                                            label="Select Organization"
                                            onChange={handleOrgChange}
                                            name="organization_id"
                                        >
                                            <MenuItem value="">
                                                Select a shift time
                                            </MenuItem>
                                            {
                                                getOrglist?.data && getOrglist?.data.map((list, index) => {
                                                    return (
                                                        <MenuItem value={list.id} key={index}>{list.organization_name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        <small className="mt-8 mb-8">Select an organization wherein you want to work</small>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" className={classes.formControl}
                                     {...register2("speciality")} >
                                        {
                                            (!!speciality && orgId) && <FormLabel component="legend">Specialities</FormLabel>
                                        }

                                        <Grid container>
                                            {
                                                speciality && speciality.map((items, index) => {
                                                    // console.log('items: ', items);
                                                    return (
                                                        <Grid item key={index}>
                                                            <FormControlLabel
                                                                control={<Checkbox color="primary" value={items.id} onChange={handleChangeCheck} name="speciality" />}
                                                                label={items.speciality_name}
                                                            />
                                                        </Grid>
                                                    )

                                                })
                                            }
                                        </Grid>
                                        {/* <FormHelperText>{updateBookingError?.message?.speciality ? "The specialities field is required." :""}</FormHelperText> */}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        name="nmc_dmc_pin"
                                        label="NMC DMC Pin"
                                        variant="outlined"
                                        className={classes.textField}
                                        onChange={handleChange}
                                        {...register2("nmc_dmc_pin")}
                                    />
                                </Grid>

                                {/* <Grid item xs={12}>
                                        <div className="mb-24">
                                            <input accept="image/*,.pdf" className={classes.inputHide} id="contained-button-file" multiple type="file" onChange={(e) => uploadImage(e)}/>
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                Upload CV
                                                </Button>
                                            </label>
                                        </div>
                                    </Grid> */}

                            </Grid>
                            <div className={classes.bottomBtn}>
                                <Button variant="text" color="primary" onClick={() => setCount(count - 1)}>
                                    <ArrowBackIosIcon className={classes.arroWBackIcon} />
                                    Back
                                </Button>

                                <Button variant="contained" color="primary" className={classes.loginBtn} type="submit" formNoValidate>
                                    Register
                                </Button>
                            </div>
                        </form>
                    }

                    <div className={classes.bottomLink}>
                        <p className="mb-0">Already have an account?</p>
                        <Link to="login" className={classes.registerBtn}>Login</Link>
                    </div>
                </Card>
            </Grid>
        </>
    )
}

export default Register
