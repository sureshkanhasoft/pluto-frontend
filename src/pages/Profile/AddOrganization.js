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
    const [orgId, setOrgId] = useState()
    const [orgIndex, setOrgIndex] = useState(0)
    const { getOrglist, addOrgSuccess, addOrgError, loading } = useSelector(state => state.organization)
    const [addOrgNotify, setAddOrgNotify] = useState(false)

    const [formError, setFormError] = useState([]);
    const [data, setData] = useState({
        organization: [
            {
                organization_id: "",
                speciality: [],
                other_speciality_list: []
            },
        ]
    })

    const handleChangeHospital = (index, event, key) => {
        const organizationData = JSON.parse(JSON.stringify(data));

        organizationData[key][index][event.target.name] = event.target.value
        organizationData[key][index].speciality = []
        organizationData[key][index].other_speciality_list = []

        let formErrorList = JSON.parse(JSON.stringify(formError));
        if(event.target.value){
            // remove organization id error 
            const removeIndex = formErrorList.indexOf(`organization_id_error_${index}`);
            if (removeIndex > -1) {
                formErrorList.splice(removeIndex, 1);
            }
        }else{
            // create organization id error
            formErrorList.push(`organization_id_error_${index}`)
            // remove speciality error
            const removeIndex = formErrorList.indexOf(`speciality_error_${index}`);
            if (removeIndex > -1) {
                formErrorList.splice(removeIndex, 1);
            }
        }
        setOrgIndex(index);
        setData(organizationData);
        setOrgId(event.target.value)
        setFormError(formErrorList)
    };

    const addOrganization = () => {
        const organizationData = JSON.parse(JSON.stringify(data));
        organizationData.organization.push(
            {
                organization_id: "",
                speciality: [],
                other_speciality_list: []
            }
        )
        setData(organizationData)
    }

    const removeOrg = (index) => {
        const org = JSON.parse(JSON.stringify(data));
        if (org.organization.length > 1) {
            org.organization.splice(index, 1)
            setData(org)
        }

        const formErrorList = JSON.parse(JSON.stringify(formError));

        const removeIndex1 = formErrorList.indexOf(`organization_id_error_${index}`);
        if (removeIndex1 > -1) {
            formErrorList.splice(removeIndex1, 1);
        }
        const removeIndex = formErrorList.indexOf(`speciality_error_${index}`);
        if (removeIndex > -1) {
            formErrorList.splice(removeIndex, 1);
        }
        setFormError(formErrorList);
    }

    useEffect(() => {
        dispatch(getOrganizationList())
    }, [])

    const getSpecialities = async () => {
        await apiClient(true).get(`api/signee/get-org-specialities/${orgId}`)
            .then(response => {
            if(response.data.status === true){
                const specialityData = JSON.parse(JSON.stringify(data));
                specialityData.organization[orgIndex].other_speciality_list = response.data.data;
                setData(specialityData)
            }    
            }).catch(error => {
                console.log('error: ', error);
            })
    }

    useEffect(() => {
        getSpecialities()
    }, [orgId])

    const formValidate = () => {
        let allError = []

        data && data.organization.map((list, index) => {
            if(list.organization_id === ""){
                allError.push(`organization_id_error_${index}`)
            }
            if(list.speciality.length === 0){
                allError.push(`speciality_error_${index}`)
            }
        })
        return allError;
    }

    const handleSubmit = () => {
        let allError = formValidate();
        if(allError.length === 0){
            dispatch(addAnotherOrganization(data))
            setAddOrgNotify(true)
        }else{
            setFormError(allError);
        }
    }

    const handleChangeCheck = (event, index, speIndex) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        const formErrorList = JSON.parse(JSON.stringify(formError));

        if (isChecked) {
            specialityData.organization[index].speciality.push(parseFloat(event.target.value));
        } else {
            let newSpeData =  specialityData.organization[index].speciality.filter(item => item !== parseFloat(event.target.value))
            specialityData.organization[index].speciality = newSpeData
        }

        // hide show error msg for speciality
        if(specialityData.organization[index].speciality.length === 0){
            // create speciality error
            formErrorList.push(`speciality_error_${index}`)
        }else{
            // remove speciality error
            const removeIndex = formErrorList.indexOf(`speciality_error_${index}`);
            if (removeIndex > -1) {
                formErrorList.splice(removeIndex, 1);
            }
        }
        setData(specialityData)
        setFormError(formErrorList);
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
                    <div className={classes.formWidth}>
                        {
                            data.organization.map((list, index) => {
                                return (
                                    <Grid container spacing={2} key={index} className={classes.orgContainer}>
                                        <Grid item xs={12} sm={12} >
                                            {
                                                index !== 0 && <div className={classes.removeOrg}><CloseIcon onClick={() => removeOrg(index)} /></div>
                                            }
                                            <FormControl variant="outlined" className={classes.formControl} required
                                                error={(formError.includes(`organization_id_error_${index}`) ? true : false)}
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
                                                                <MenuItem value={list.id} disabled={data.organization.filter(val => val.organization_id === list.id).length > 0 ? true : false } key={index}>{list.organization_name}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} >
                                            <FormControl required
                                                error={(formError.includes(`speciality_error_${index}`) ? true : false)}
                                                >
                                                <FormLabel>Select Speciality</FormLabel>
                                                <div className={classes.formControlBox}>
                                                    {
                                                        list.other_speciality_list && list.other_speciality_list.map((spec, speIndex) => {
                                                            return (
                                                                    <FormControlLabel key={speIndex}
                                                                        control={<Checkbox color="primary" value={spec.id} checked={list.speciality && list.speciality.includes(spec.id)} onChange={e => handleChangeCheck(e, index, speIndex)} name="speciality" />}
                                                                        label={spec.speciality_name}
                                                                    />
                                                                )
                                                        })
                                                    }
                                                </div>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        <div>
                            <Button onClick={addOrganization} color="secondary" className={classes.addOrg}>
                                <AddCircleOutlineIcon className="mr-3" />
                                <span> Add another org</span>
                            </Button>
                        </div>
                        <Box className="mt-16">
                            <Button className={classes.btnSecondary} variant="contained" type="submit" onClick={()=>handleSubmit()}>
                                Register
                            </Button>
                        </Box>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default AddOrganization
