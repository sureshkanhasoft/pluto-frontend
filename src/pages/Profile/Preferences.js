import React from 'react'
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
} from '@material-ui/core';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPreference } from '../../store/action';

const useStyle = makeStyles(() => ({
    mainContainer:{
        width:"100%",
        maxWidth:"600px"
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

const dataList = [
    {
        "weekday":"Monday",
        "list":[
            "monday_day",
            "monday_night"
        ]
    },
    {
        "weekday":"Tuesday",
        "list":[
            "tuesday_day",
            "tuesday_night"
        ]
    },
    {
        "weekday":"Wednesday",
        "list":[
            "wednesday_day",
            "wednesday_night"
        ]
    },
    {
        "weekday":"Thursday",
        "list":[
            "thursday_day",
            "thursday_night"
        ]
    },
    {
        "weekday":"Friday",
        "list":[
            "friday_day",
            "friday_night"
        ]
    },
    {
        "weekday":"Saturday",
        "list":[
            "saturday_day",
            "saturday_night"
        ]
    },
    {
        "weekday":"Sunday",
        "list":[
            "sunday_day",
            "sunday_night"
        ]
    },
]

const Preferences = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
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
        is_travel:"",
        no_of_shift:""
    })
    const handleChangeCheckbox = (event) => {
        const isChecked = event.target.checked
        if(isChecked) {
            setData({ ...data, [event.target.name]: event.target.value });
        } else {
            setData({ ...data, [event.target.name]: 0 });
        }
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('data', data)
        dispatch(createPreference(data))
    }
   
    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Preference</h1>
                    
                    <div className={classes.mainContainer}>
                        <h3 className="f-900 mb-8">When do you prefer to work?</h3>
                        <p className="f-300">Please provide your general working patterns/preferences. Once you are compliant you can log onto Pluto at any time to see and book available shifts.</p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid container spacing={2}>
                                {
                                    dataList.map((list, index) => {
                                        return (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <Card className={classes.cardBox}>
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <p className="f-500 mb-8"> {list.weekday}</p>
                                                        <div>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={handleChangeCheckbox} value={1} name={list.list[0]} color="primary" />}
                                                                label="Day"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={handleChangeCheckbox} name={list.list[1]} value={1} color="primary" />}
                                                                label="Night"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                               
                                <Grid item xs={12} sm={12}>
                                    <h3 className="f-900 mb-8 mt-24">How many shift are you looking to work per week?</h3>
                                    <p className="f-300">Select number of shifts you are looking to work per week.</p>
                                    <FormControl variant="outlined" style={{width:"100%"}}>
                                        {/* <InputLabel>Shift Type</InputLabel> */}
                                        <Select
                                            value={data.no_of_shift}
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
                                        </Select>
                                    </FormControl>
                                </Grid>

                                
                                <Grid item xs={12} sm={12}>
                                    <FormControl component="fieldset">
                                        <h3 className="f-900 mb-8 mt-24">Would you travel for work?</h3>
                                        {/* <FormLabel component="legend">Would you travel for work?</FormLabel> */}
                                        <RadioGroup name="is_travel" value={data.is_travel} onChange={handleChange} className={classes.radioGroup}>
                                            <FormControlLabel value="1" control={<Radio color="primary" />} label="Yes" />
                                            <FormControlLabel value="0" control={<Radio color="primary" />} label="No" />
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
