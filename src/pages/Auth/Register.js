import React, {useState} from 'react'
import { 
    Grid, Card, TextField, Button, makeStyles,
    FormControl,Select,MenuItem, InputLabel,
    FormLabel,FormControlLabel,Checkbox
 } from '@material-ui/core';
 import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
 import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import logo from '../../assets/images/logo.svg'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganization } from '../../store/action';
// import { apiClient } from '../../config/apiClient';

const useStyle = makeStyles({
    loginContainer: {
        width: "100%",
        height: "100vh",
        overflow:"auto",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        background: "#2b68a4",
        flexDirection: "column"
    },
    logoContainer:{
        marginBottom:'16px',
        paddingTop:40,
        '& img':{
            margin:'0 auto',
            display:"block"
        }
    },
    loginCard: {
        width: "100%",
        maxWidth: 600,
        padding: "36px 24px 24px",
        background: "#dceeff",
        boxShadow: "0 1px 35px rgba(11, 48, 86, 0.50)",
        margin:'0 auto 30px'
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        marginBottom: 16,
        color:"#000",
        width:"100%",
        "& input":{
            paddingLeft:12
        },
        "& svg": {
            color: "#2b68a4"
        }
    },
    forgotCont:{
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:24,
    },
    forgotText:{
        color:"#2b68a4",
        fontSize:13,
        borderBottom:"1px dashed #2b68a4"
    },
    loginBtn:{
        width:140,
        borderRadius: "4px",
        // margin:"0 auto",
        background:"#ff8b46",
        "&:hover":{
            background:"#ff8b46"
        }
    },
    formControl:{
        width:"100%"
    },
    bottomBtn:{
        display:"flex",
        justifyContent:"space-between"
    },
    arroWForIcon:{
        width:16,
        position:"absolute",
        right:12,
        top:6
    },
    arroWBackIcon:{
        width:16,
        position:"absolute",
        left:0,
        top:6
    },
    inputHide:{
        display:"none"
    }
})

const Register = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    const [speciality, setSpeciality] = useState(['Specilaity 1', 'Specilaity 2'])
    const {getOrglist} = useSelector(state => state.organization)
    const [errors, setErrors] = useState({})

    const [data, setData] = useState({
        email: "",
        first_name: "",
        last_name:"",
        organization_id:"",
        speciality: [],

        mobile_number:"",
        address_line_1:"",
        address_line_2:"",
        city:"",
        zipcode:"",
        nmc_dmc_pin:"",
        candidate_referred_from:"",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        dispatch(getOrganization())
    },[])

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

    // const getSpecialities = async () => {
    //     await apiClient(true).get(`api/organization/get-all-speciality`)
    //     .then(response => {
    //         console.log('response: ', response);
    //         setSpeciality(response.data.data)
    //     }).catch(error => {
    //         console.log('error: ', error);
    //     })
    // }

    // useEffect(() => {
    //     getSpecialities()
    // }, [])

    // const isValidate = () => {
        
    // }

    const handleNext = () => {
        setCount(count + 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('data', data);
    }

    return (
        <Grid className={classes.loginContainer}>
            <div className={classes.logoContainer}>
                <img src={logo} alt="" />
            </div>
            <Card className={classes.loginCard}>
                <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                    {
                        count === 0 && 
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="first_name"
                                    label="First name"
                                    variant="outlined"
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
                                    error={errors.last_name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="mobile_number"
                                    label="Contact Number"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel>Select Organization</InputLabel>
                                    <Select
                                        value={data.organization_id}
                                        label="Select Organization"
                                        onChange={handleChange}
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
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Specialities</FormLabel>
                                    <Grid container>
                                        {
                                            speciality && speciality.map((items, index) => {
                                                return (
                                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                                        <FormControlLabel
                                                            control={<Checkbox color="primary" value={items} onChange={handleChangeCheck} name="speciality" />}
                                                            label={items}
                                                        />
                                                    </Grid>
                                                )

                                            })
                                        }
                                    </Grid>
                                    {/* <FormHelperText>{updateBookingError?.message?.speciality ? "The specialities field is required." :""}</FormHelperText> */}
                                </FormControl>
                            </Grid>
                        </Grid>
                    }

                    {
                        count === 1 && 
                        <Grid container spacing={2}>
                        
                            <Grid item xs={12}>
                                <TextField
                                    name="address_line_1"
                                    label="Address line 1"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="address_line_2"
                                    label="Address line 2"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="city"
                                    label="city"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="postcode"
                                    label="Postcode"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nmc_dmc_pin"
                                    label="NMC DMC Pin"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel>Candidate Referred From</InputLabel>
                                    <Select
                                        value={data?.candidate_referred_from || ''}
                                        name="candidate_referred_from"
                                        label="Candidate Referred From"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            Select a ward
                                        </MenuItem>
                                        <MenuItem value="wrwer">
                                            wrwer
                                        </MenuItem>
                                        {/* {
                                            getCandidateReferrredForm?.data && getCandidateReferrredForm?.data.map((list, index) => {
                                                return (
                                                    <MenuItem value={list.id} key={index}>{list.name}</MenuItem>
                                                )
                                            })
                                        } */}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <div className="mb-24">
                                    <input accept="image/*,.pdf" className={classes.inputHide} id="contained-button-file" multiple type="file" onChange={(e) => uploadImage(e)}/>
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                        Upload CV
                                        </Button>
                                    </label>
                                </div>
                            </Grid>
                            
                        </Grid>
                    }

                    {
                        count === 0 ?  
                        <div className={classes.bottomBtn}>
                            <span></span>
                            <Button variant="contained" color="primary" className={classes.loginBtn} onClick={ handleNext}>
                                Next <ArrowForwardIosIcon className={classes.arroWForIcon}/>
                            </Button> 
                        </div>:""
                    }

                    {
                        count === 1 ? 
                        <div className={classes.bottomBtn}>
                            <Button variant="text" color="primary" onClick={ () => setCount(count - 1) }>
                                <ArrowBackIosIcon className={classes.arroWBackIcon} />
                                Back
                            </Button> 
                            <Button variant="contained" color="primary" className={classes.loginBtn} type="submit">
                                Register
                            </Button> 
                        </div> :""
                    }


                    
                    
                </form>
            </Card>
        </Grid>
    )
}

export default Register
