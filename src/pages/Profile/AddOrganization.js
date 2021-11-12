import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid,
    makeStyles,
    Select,
    FormControl,
    Button,
    Box,
    MenuItem,
    InputLabel, FormControlLabel, Checkbox, FormLabel, Backdrop, CircularProgress
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo';
import { addAnotherOrganization, getOrganizationList } from '../../store/action';
import { useForm } from 'react-hook-form';
import { apiClient } from '../../config/apiClient';
import Notify from '../../components/Notify/Notify';
import CloseIcon from '@material-ui/icons/Close';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};


const useStyle = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    formWidth: {
        maxWidth: 600,
        // margin: '0 auto'
    },
    checkboxList: {
        display: "flex"
    },
    orgContainer: {
        background: "#f4f5ff",
        borderRadius: 12,
        padding: 12,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        margin: '0 0 16px 0',
        position:"relative",
    },
    addOrg: {
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        marginLeft: 'auto',
        color: "#ff8b46",
        '& .MuiButton-label': {
            display: "flex",
            alignItems: "center",
        },
        '& .MuiSvgIcon-root': {
            width: 18,
            height: "auto"
        }
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
    formControlBox: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row"
    },
    removeOrg:{
        position: "absolute",
        top: -9,
        right: -9,
        cursor: "pointer",
        background:"#ff8b46",
        borderRadius:"50%",
        width:26,
        height:26,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        '& svg':{
            fontSize:16
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}))

const AddOrganization = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [id1, setId1] = useState()
    const [speciality1, setSpeciality] = useState([])
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
    const { getOrglist, addOrgSuccess, addOrgError, loading } = useSelector(state => state.organization)
    const [addOrgNotify, setAddOrgNotify] = useState(false)

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
    // console.log('anotherSpe: ', anotherSpe);

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

    const removeOrg = (index) => {
        const org = JSON.parse(JSON.stringify(data));
        if (org.organization.length > 1) {
            org.organization.splice(index, 1)
            setData(org)
        }
    }

    useEffect(() => {
        dispatch(getOrganizationList())
    }, [])

    const getSpecialities = async () => {
        await apiClient(true).get(`api/signee/get-org-specialities/${orgId}`)
            .then(response => {
                anotherSpe['list'][id1]['listing'] = response.data.data
                setSpeciality(response.data.data)
            }).catch(error => {
                console.log('error: ', error);
            })
    }

    useEffect(() => {
        getSpecialities()
    }, [orgId])

    const handleSubmit1 = () => {
        // console.log('data', data)
        dispatch(addAnotherOrganization(data))
        setAddOrgNotify(true)
    }

    const handleChangeCheck = (event, index, speIndex) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        if (isChecked) {
            // specialityData.organization.[index2].speciality.push(parseFloat(event.target.value));
            // setData(specialityData)
            specialityData.organization.map((list, indexii) => {
                if (index == indexii)
                    return (
                        list.speciality.push(parseFloat(event.target.value))
                    )
            })
            setData(specialityData)
        } else {
            specialityData.organization.map((list, indexii) => {
                if (index == indexii) {
                    return (
                        list.speciality = list.speciality.filter(item => item !== parseFloat(event.target.value))
                    )
                }
            })
            setData(specialityData)
        }

    };

    return (
        <>
         {
                loading  ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {addOrgNotify && (addOrgError?.message || addOrgError) &&
                <Notify
                    data={addOrgError?.message ? addOrgError?.message : addOrgError}
                    status="error"
                />
            }
            {addOrgNotify && (addOrgSuccess?.message || addOrgSuccess) &&
                <Notify
                    data={addOrgSuccess?.message ? addOrgSuccess?.message : addOrgSuccess}
                    status="success"
                />
            }
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mb-16">Add Organization</h1>
                    <form className={classes.formWidth} onSubmit={handleSubmit(handleSubmit1)}>
                        {
                            data.organization.map((list, index) => {
                                return (
                                    <Grid container spacing={2} key={index} className={classes.orgContainer}>
                                        <Grid item xs={12} sm={12} >
                                            {
                                                index !== 0 && <div className={classes.removeOrg}><CloseIcon onClick={() => removeOrg(index)} /></div>
                                            }
                                            <FormControl variant="outlined" className={classes.formControl} required
                                                error={(errors.organization_id ? true : false)}
                                                {...register("organization_id", {
                                                    required: true,
                                                })}
                                            >
                                                <InputLabel>Select Organization</InputLabel>
                                                <Select
                                                    label="Select Organization"
                                                    name="organization_id"
                                                    onChange={(e) => handleChangeHospital(index, e, 'organization')}
                                                    value={list?.organization_id || ""}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="">
                                                        Select Organization
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
                                        <Grid item xs={12} >
                                            <FormControl required
                                                {...register('speciality', {
                                                    required: "The speciality field is required.",
                                                })}
                                                error={(errors.speciality ? true : false)}  >
                                                {
                                                    anotherSpe?.list && <FormLabel component="legend">Specialities</FormLabel>
                                                }
                                                <div className={classes.formControlBox}>
                                                    {
                                                        anotherSpe?.list && anotherSpe?.list.map((list, index1) => {
                                                            if (list.id22 === index) {

                                                                return (
                                                                    list?.listing && list?.listing.map((i1, speIndex) =>
                                                                        // <span>{i1.speciality_name}</span>
                                                                        // <div key={ii} className={classes.checkboxList}>
                                                                        <FormControlLabel key={speIndex}
                                                                            control={<Checkbox color="primary" value={i1.id} onChange={e => handleChangeCheck(e, index, speIndex)} name="speciality" />}
                                                                            label={i1.speciality_name}
                                                                        />
                                                                        // </div>
                                                                    )
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </FormControl>
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
                                    </Grid>
                                )
                            })
                        }

                        <div>
                            <Button onClick={addOrganization} color="secondary" className={classes.addOrg}>
                                <AddCircleOutlineIcon className="mr-3" />
                                <span> Add another org</span>
                            </Button>
                            {/* <Button className={classes.btnSecondary} variant="text" >
                                Add another org
                            </Button> */}
                        </div>
                        <Box className="mt-16">
                            <Button className={classes.btnSecondary} variant="contained" type="submit" formNoValidate>
                                Register
                            </Button>
                        </Box>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default AddOrganization
