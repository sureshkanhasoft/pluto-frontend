import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    makeStyles,
    Select,
    FormControl,
    Button,
    Box,
    MenuItem,
    InputLabel, FormControlLabel, Checkbox,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import { getOrganization } from '../../store/action';
import { useForm } from 'react-hook-form';
import { apiClient } from '../../config/apiClient';


const useStyle = makeStyles(() => ({
    formControl: {
        width: "100%"
    },
    formWidth: {
        maxWidth: 500,
        margin: '0 auto'
    }

}))

const AddOrganization = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [id1, setId1] = useState()
    const [speciality, setSpeciality] = useState([])
    const [anotherSpe, setAnotherSpe] = useState({
        list: [
            {
                id22: "",
                listing: []
            },
        ]
    })
    const [orgId, setOrgId] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { getOrglist } = useSelector(state => state.organization)

    const [data, setData] = useState({
        organization: [
            {
                organization_id: "",
                speciality: []
            },
        ]
    })

    const handleChangeHospital = (index, event, key) => {
        data[key][index][event.target.name] = event.target.value
        anotherSpe['list'][index]['id22'] = index
        // anotherSpe['list'][index]['listing'] = speciality
        setData({ ...data });
        setAnotherSpe({ ...anotherSpe })
        setOrgId(event.target.value)
        setId1(index)

    };
    console.log('anotherSpe: ', anotherSpe);

    const addOrganization = () => {
        const organizationData = JSON.parse(JSON.stringify(data));
        organizationData.organization.push(
            {
                organization_id: "",
                speciality: []
            }
        )
        setData(organizationData)

        const sssData = JSON.parse(JSON.stringify(anotherSpe));
        sssData.list.push(
            {
                id22: "",
                listing: []
            }
        )
        setAnotherSpe(sssData)
    }

    useEffect(() => {
        dispatch(getOrganization())
    }, [])

    const getSpecialities = async () => {
        await apiClient(true).get(`api/signee/get-org-specialities/${orgId}`)
            .then(response => {
                anotherSpe['list'][id1]['listing'] = response.data.data
                setSpeciality(response.data.data)
                // setAnotherSpe(response.data.data)
            }).catch(error => {
                console.log('error: ', error);
            })
    }

    useEffect(() => {
        getSpecialities()
    }, [orgId])

    const handleSubmit1 = () => {
        console.log('data', data)
    }

    const handleChangeCheck = (event) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        if (isChecked) {
            specialityData.organization.speciality.push(parseFloat(event.target.value));
            setData(specialityData)
        } else {
            const newData = (specialityData.organization.speciality).filter(item => item !== parseFloat(event.target.value));
            specialityData.organization.speciality = newData;
            setData(specialityData)
        }

    };

    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Add Organization</h1>
                    <form className={classes.formWidth} onSubmit={handleSubmit(handleSubmit1)}>
                        <Grid container spacing={2}>
                            {
                                data.organization.map((list, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item xs={12} sm={12} >
                                                <FormControl variant="outlined" className={classes.formControl} required
                                                    error={(errors.organization_id ? true : false)}
                                                    {...register("organization_id", {
                                                        required: true,
                                                    })}
                                                >
                                                    <InputLabel>Select Organization</InputLabel>
                                                    <Select
                                                        // value={data?.organization_id || ""}
                                                        label="Select Organization"
                                                        onChange={(e) => handleChangeHospital(index, e, 'organization')}
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
                                                </FormControl>
                                            </Grid>
                                            <Grid>
                                                {
                                                    anotherSpe?.list && anotherSpe?.list.map((list, index1) => {
                                                        console.log('list: ', typeof index1);
                                                        if(list.id22 === index) {

                                                            return (<span>{list?.listing && list?.listing.map((i1, ii) => <p>{i1.speciality_name}</p>)}</span>)
                                                        }
                                                    })
                                                }
                                            </Grid>

                                            {/* <Grid item xs={12} sm={12} style={{ display: "flex", flexWrap: 'wrap' }}>
                                                {
                                                    (speciality && id1 === index) && speciality.map((items, index1) => {
                                                        // console.log('items: ', items);
                                                        return (
                                                            <Grid item xs={3} key={index1} style={{ display: "flex" }}>
                                                                <FormControlLabel style={{ display: "flex" }}
                                                                    control={<Checkbox color="primary" value={items.id} onChange={handleChangeCheck} name="speciality" />}
                                                                    label={items.speciality_name}
                                                                />
                                                            </Grid>
                                                        )

                                                    })
                                                }
                                            </Grid> */}
                                        </React.Fragment>
                                    )
                                })
                            }

                        </Grid>
                        <div>
                            <Button className={classes.btnSecondary} variant="text" onClick={addOrganization}>
                                Add another org
                            </Button>
                        </div>
                        <Box className="mt-16">
                            <Button className={classes.btnSecondary} variant="contained" type="submit" formNoValidate>
                                Add
                            </Button>
                        </Box>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default AddOrganization
