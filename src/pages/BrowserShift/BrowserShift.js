import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Divider,
    Menu,
    MenuItem,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Backdrop, CircularProgress
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import ShiftTable from '../ShiftTable/ShiftTable';
import { useDispatch, useSelector } from 'react-redux';
import { filterShiftList, getfilterSpeciality, getHospital, getShift } from '../../store/action';

const dayofWeek = [
    {
        id: 1,
        name: "Monday"
    },
    {
        id: 2,
        name: "Tuesday"
    },
    {
        id: 3,
        name: "Wednesday"
    },
    {
        id: 4,
        name: "Thursday"
    },
    {
        id: 5,
        name: "Friday"
    },
    {
        id: 6,
        name: "Saturday"
    },
    {
        id: 7,
        name: "Sunday"
    },
]



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))


const BrowserShift = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(1);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [specialist, setSpecialist] = React.useState(null);
    const [hospital, setHospital] = React.useState(null);
    const {getShiftList, loading, getHospitalList, getFilterSpeciality} = useSelector(state => state.browseShift)

    const [data, setData] = useState({
        speciality:[],
        hospital:[],
        weekday:[]
    })
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const specialistClick = (event) => {
        setSpecialist(event.currentTarget)
    }
    const specialistClose = () => {
        setSpecialist(null)
    };

    const hospitalClick = (event) => {
        setHospital(event.currentTarget)
    }
    const hospitalClose = () => {
        setHospital(null)
    };

    const handleChangeCheckbox = (event) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        console.log('isChecked: ', isChecked);
        if (isChecked) {
            specialityData.speciality.push(event.target.value);
            setData(specialityData)
        } else {
            const newData = (specialityData.speciality).filter(item => item !== event.target.value);
            specialityData.speciality = newData;
            setData(specialityData)
        }
    };

    const handleHospitalChangeCheckbox = (event) => {
        const hospitalData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        console.log('isChecked: ', isChecked);
        if (isChecked) {
            hospitalData.hospital.push(event.target.value);
            setData(hospitalData)
        } else {
            const newData = (hospitalData.hospital).filter(item => item !== event.target.value);
            hospitalData.hospital = newData;
            setData(hospitalData)
        }
    };
    const handleWeekdayChangeCheckbox = (event) => {
        const weekdayData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        console.log('isChecked: ', isChecked);
        if (isChecked) {
            weekdayData.weekday.push(event.target.value);
            setData(weekdayData)
        } else {
            const newData = (weekdayData.weekday).filter(item => item !== event.target.value);
            weekdayData.weekday = newData;
            setData(weekdayData)
        }
    };

    useEffect(() => {
        dispatch(getShift())
    },[])

    useEffect(() => {
        dispatch(getHospital())
    },[])

    useEffect(() => {
        dispatch(getfilterSpeciality())
    },[])

    const handleChangePage = (event, value) => {
        setPage(value);
        setTimeout(getShiftList1(value), 2000);
        window.scrollTo(0, 0)
    };

    const getShiftList1 = (pageNo = 1) => {
        dispatch(getShift(pageNo))
    }

    const submitFilterData = () => {
        console.log('sdfds', data)
        dispatch(filterShiftList())
    }

    return (
        <>
            {
                loading ?
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> : ""
            }
            <ProfileUpdateInfo />
            <section className="pt-16 pb-16">
                <Container maxWidth="lg">
                    <h1 className="mt-16">Browse Shifts</h1>
                    <p className="f-300">You can browse all shifts available on Pluto. Once you are fully compliant, you will be able to book shifts.</p>
                    <div className="filter-container pt-16">
                        <h2 className="filter-header-text">Filters</h2>
                        <div className="filter-box mb-16">
                            <div className="">
                                <h4 onClick={handleClick}>Day of the week <KeyboardArrowDownIcon /></h4>
                                <Menu
                                    anchorEl={anchorEl}
                                    // keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    className="filter-menuItem-container"
                                >
                                    {
                                        dayofWeek.map((item, index) => (
                                            <MenuItem key={index}>
                                                <FormControlLabel control={<Checkbox onChange={handleWeekdayChangeCheckbox} value={item.id} name="checkedC" color="primary" className="menu-item-checkbox" />} label={item.name} />
                                            </MenuItem>
                                        ))
                                    }
                                    <Divider />
                                    <MenuItem className="menu-item-clear">Clear</MenuItem>
                                </Menu>
                            </div>
                            <div className="">
                                <h4 onClick={hospitalClick}>Hospital <KeyboardArrowDownIcon /></h4>
                                <Menu
                                    anchorEl={hospital}
                                    keepMounted
                                    open={Boolean(hospital)}
                                    onClose={hospitalClose}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    className="filter-menuItem-container"
                                >
                                    {
                                         getHospitalList?.data && getHospitalList?.data.map((item, index) => (
                                            <MenuItem key={index}>
                                                <FormControlLabel control={<Checkbox onChange={handleHospitalChangeCheckbox} value={item.id}  color="primary" className="menu-item-checkbox" />} label={item.hospital_name} />
                                            </MenuItem>
                                        ))
                                    }
                                    <Divider />
                                    <MenuItem className="menu-item-clear">Clear</MenuItem>
                                </Menu>
                            </div>
                            <div className="">
                                <h4 onClick={specialistClick}>Speciality <KeyboardArrowDownIcon /></h4>
                                <Menu
                                    anchorEl={specialist}
                                    keepMounted
                                    open={Boolean(specialist)}
                                    onClose={specialistClose}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    className="filter-menuItem-container"
                                >
                                    {
                                        getFilterSpeciality?.data && getFilterSpeciality?.data.map((item, index) => (
                                            <MenuItem key={index}>
                                                <FormControlLabel control={<Checkbox onChange={handleChangeCheckbox} value={item.id} color="primary" className="menu-item-checkbox" />} label={item.speciality_name} />
                                            </MenuItem>
                                        ))
                                    }
                                    <Divider />
                                    <MenuItem className="menu-item-clear">Clear</MenuItem>
                                </Menu>
                            </div>
                            
                            <div className="">
                                <Button variant="outlined" onClick={submitFilterData}>Filter</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="pb-32">
                <ShiftTable shiftList={getShiftList ? getShiftList : loading}  handleChangePage={handleChangePage} page={page} />
            </section>

        </>
    );
};

export default BrowserShift;