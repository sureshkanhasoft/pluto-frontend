import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid, FormControl, Checkbox, FormControlLabel,
    makeStyles, Box, Button, Backdrop, CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import { getfilterSpeciality, getSigneeSpeciality, updateSpeciality } from '../../store/action';
import Notify from '../../components/Notify/Notify';
import { apiClient } from '../../config/apiClient';


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
    const getId = JSON.parse(window.localStorage.getItem('signeeInfo'));
    const getOrg = JSON.parse(window.localStorage.getItem('signeeInfo'));
    const { getFilterSpeciality, filterLoader } = useSelector(state => state.browseShift)
    const { updateSpeSuccess, updateSpeError, loading } = useSelector(state => state.organization)
    const [msgNotify, setMsgNotify] = useState(false)
    const [data, setData] = useState({
        speciality_id: []
    })

    const handleChangeCheckbox = (event) => {
        const specialData = JSON.parse(JSON.stringify(data))
        const isChecked = event.target.checked
        if (isChecked) {
            specialData.speciality_id.push(parseFloat(event.target.value))
            setData(specialData)
        } else {
            const newData = (specialData.speciality_id).filter(item => item !== parseFloat(event.target.value));
            specialData.speciality_id = newData;
            setData(specialData)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSpeciality(data, getId.id))
        setMsgNotify(true)
    }

    const getSigneeSpeciality = async () => {
        await apiClient(true).get(`api/signee/get-signee-speciality`)
            .then(response => {
                let speciality = [];
                response.data.data.map(val => {
                    speciality.push(val.speciality_id);
                })
                console.log(speciality)
                data.speciality_id = speciality
                dispatch(getfilterSpeciality())
            }).catch(error => {
                console.log('error: ', error);

            })
    }

    useEffect(() => {
        getSigneeSpeciality()
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
            {msgNotify && (updateSpeError?.message || updateSpeError) &&
                <Notify
                    data={updateSpeError?.message ? updateSpeError?.message : updateSpeError}
                    status="error"
                />
            }
            {msgNotify && (updateSpeSuccess?.message || updateSpeSuccess) &&
                <Notify
                    data={updateSpeSuccess?.message ? updateSpeSuccess?.message : updateSpeSuccess}
                    status="success"
                />
            }
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Update specialities</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Grid container spacing={2} className={classes.mainBox}>
                            <Grid item xs={12} sm={4}>
                                <h5 className="f-400 mb-8">Organization name</h5>
                                <h3 className="f-900 mb-8">{getOrg.organization_name}</h3>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container spacing={2}>
                                    {
                                        getFilterSpeciality?.data && getFilterSpeciality?.data.map((list, index) => {
                                            // console.log('list: ', list);
                                            return (
                                                <Grid item xs={12} sm={3} key={index}>
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <FormControlLabel
                                                            control={<Checkbox onChange={handleChangeCheckbox} checked={data.speciality_id.includes(list.id)} value={list?.id} color="primary" name="speciality_id" />}
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
