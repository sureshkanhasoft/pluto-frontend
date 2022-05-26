import React, { useEffect } from 'react'
import {
    Container,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    makeStyles,
    Button,
    Card,
    Box,
    MenuItem,
    Select,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPreference, getPreference } from '../../store/action';
import Notify from '../../components/Notify/Notify';

const useStyle = makeStyles((theme) => ({
    mainContainer:{
        width:"100%",
        maxWidth:"600px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    cardBox:{
        background:"#cae0f7",
        padding:12
    },
    radioGroup:{
        flexDirection:"row"
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
}))


const Preferences = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const {getPreferenceList, loading, createPreferenceSuccess} = useSelector(state => state.preference)
    const [preferencetMsg, setPreferencetMsg]=useState(false)
    const [data, setData] = useState({
        monday_day:0,
        monday_night:0,
        tuesday_day:0,
        tuesday_night:0,
        wednesday_day:0,
        wednesday_night:0,
        thursday_day:0,
        thursday_night:0,
        friday_day:0,
        friday_night:0,
        saturday_day:0,
        saturday_night:0,
        sunday_day:0,
        sunday_night:0,
        is_travel:0,
        no_of_shift:0
    })
    const handleChangeCheckbox = (event) => {
        const isChecked = event.target.checked
        if(isChecked) {
            setData({ ...data, [event.target.name]:1 });
        } else {
            setData({ ...data, [event.target.name]:0 });
        }
    };

    const handleChange = (event) => {
        // console.log('event11: ', parseInt(event.target.value));
        setData({ ...data, [event.target.name]: parseInt(event.target.value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPreference(data))
        setPreferencetMsg(true)
    }

    useEffect(() => {
        if(getPreferenceList?.data){
            setData(getPreferenceList?.data)
        }
        // console.log('getPreferenceList: ', getPreferenceList);
    },[getPreferenceList])

    useEffect(() => {
        dispatch(getPreference())
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
   
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> 
                    : ""
            }
            {preferencetMsg && createPreferenceSuccess?.message &&
                <Notify
                    data= {createPreferenceSuccess?.message}
                    status="success"
                />
            }
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Preference</h1>
                    
                    <div className={classes.mainContainer}>
                        <h3 className="f-900 mb-8">When do you prefer to work?</h3>
                        <p className="f-300">Please provide your general working patterns/preferences. Once you are compliant you can log onto Pluto at any time to see and book available shifts.</p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8"> Monday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.monday_day === 1 ? true : false} name="monday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.monday_night === 1 ? true : false} name="monday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8"> Tuesday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.tuesday_day === 1 ? true : false} name="tuesday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.tuesday_night === 1 ? true : false} name="tuesday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8"> Wednesday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.wednesday_day === 1 ? true : false} name="wednesday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.wednesday_night === 1 ? true : false} name="wednesday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8">Thursday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.thursday_day === 1 ? true : false} name="thursday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.thursday_night === 1 ? true : false} name="thursday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8">Friday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.friday_day === 1 ? true : false} name="friday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.friday_night === 1 ? true : false} name="friday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8">Saturday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.saturday_day === 1 ? true : false} name="saturday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.saturday_night === 1 ? true : false} name="saturday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Card className={classes.cardBox}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <p className="f-500 mb-8">Sunday</p>
                                            <div>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.sunday_day === 1 ? true : false} name="sunday_day" color="primary" />}
                                                    label="Day"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={handleChangeCheckbox} checked={data?.sunday_night === 1 ? true : false} name="sunday_night" color="primary" />}
                                                    label="Night"
                                                />
                                            </div>
                                        </FormControl>
                                    </Card>
                                </Grid>
                               
                                <Grid item xs={12} sm={12}>
                                    <h3 className="f-900 mb-8 mt-24">How many shift are you looking to work per week?</h3>
                                    <p className="f-300">Select number of shifts you are looking to work per week.</p>
                                    <FormControl variant="outlined" style={{width:"100%"}}>
                                        {/* <InputLabel>Shift Type</InputLabel> */}
                                        <Select
                                            value={data?.no_of_shift || ""}
                                            // label=""
                                            name="no_of_shift"
                                            onChange={handleChange}
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                Select a shift
                                            </MenuItem>
                                            <MenuItem value="1">1 shift</MenuItem>
                                            <MenuItem value="2">2 shift</MenuItem>
                                            <MenuItem value="3">3 shift</MenuItem>
                                            <MenuItem value="4">4 shift</MenuItem>
                                            <MenuItem value="5">5 shift</MenuItem>
                                            <MenuItem value="6">6 shift</MenuItem>
                                            <MenuItem value="7">7 shift</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                
                                <Grid item xs={12} sm={12}>
                                    <FormControl component="fieldset">
                                        <h3 className="f-900 mb-8 mt-24">Would you travel for work?</h3>
                                        {/* <FormLabel component="legend">Would you travel for work?</FormLabel> */}
                                        <RadioGroup name="is_travel" value={data?.is_travel} onChange={handleChange} className={classes.radioGroup}>
                                            <FormControlLabel value={1} control={<Radio color="primary" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio color="primary" />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Box className="mt-16">
                                <Button className={classes.btnSecondary} variant="contained" type="submit" formNoValidate>
                                    Update
                                </Button>
                            </Box>
                        </form>
                    </div>
                </Container>

            </section>
            
        </>
    )
}

export default Preferences
