import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid, Card, FormControl, Checkbox, FormControlLabel,
    makeStyles, Box, Button, Backdrop, CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import { getfilterSpeciality } from '../../store/action';


const useStyle = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    mainBox: {
        background: "#f4f5ff",
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        margin: '0 0 16px 0',
        width: "100%"
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

const Specialities = () => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const { getFilterSpeciality, filterLoader } = useSelector(state => state.browseShift)
    console.log('loading: ', filterLoader);
    const [data, setData] = useState({
        specialities1: []
    })

    const handleChangeCheckbox = (event) => {
        const specialData = JSON.parse(JSON.stringify(data))
        const isChecked = event.target.checked
        if (isChecked) {
            specialData.specialities1.push(event.target.value)
            setData(specialData)
        } else {
            const newData = (specialData.specialities1).filter(item => item !== event.target.value);
            specialData.specialities1 = newData;
            setData(specialData)
        }
    };

    const handleSubmit = () => {
        console.log('data', data)
    }
    console.log('data', data)

    useEffect(() => {
        dispatch(getfilterSpeciality())
    }, [])

    return (
        <>
            {
                filterLoader ?
                    <Backdrop className={classes.backdrop} open={filterLoader}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    : ""
            }
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Update specialities</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Grid container spacing={2} className={classes.mainBox}>
                            <Grid item xs={12} sm={4}>
                                <h5 className="f-400 mb-8">Organization name</h5>
                                <h3 className="f-900 mb-8">Sam trust1</h3>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container spacing={2}>
                                    {
                                        getFilterSpeciality?.data && getFilterSpeciality?.data.map((list, index) => {
                                            return (
                                                <Grid item xs={12} sm={3} key={index}>
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <FormControlLabel
                                                            control={<Checkbox onChange={handleChangeCheckbox} value={list?.speciality_name} color="primary" name="specialities1" />}
                                                            label={list?.speciality_name}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>

                            </Grid>
                        </Grid>
                        {/* <Divider /> */}

                        <Box className="mt-16 text-right">
                            <Button className={classes.btnSecondary} variant="contained" type="submit" formNoValidate>
                                Update
                            </Button>
                        </Box>

                    </form>
                </Container>
            </section>
        </>
    )
}

export default Specialities
