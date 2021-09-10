import React from 'react';
import {
    Button,
    Container,
    Divider,
    Menu,
    MenuItem,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import ShiftTable from '../ShiftTable/ShiftTable';

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

const speciality = [
    {
        id: 1,
        name: "Cardiologist"
    },
    {
        id: 2,
        name: "Neurosurgeon"
    },
    {
        id: 3,
        name: "Neurologist"
    },
    {
        id: 4,
        name: "Dentist"
    },
    {
        id: 5,
        name: "Psychiatrist"
    },
    {
        id: 6,
        name: "ENT"
    }
]


const hospitalList = [
    {
        id: 1,
        name: "Kent - Maidstone Hospital"
    },
    {
        id: 2,
        name: "Kent - Tunbridge Wells Hospital"
    },
    {
        id: 3,
        name: "Rugby - Hospital of St Cross"
    },
    {
        id: 4,
        name: "Coventry - University Hospital Coventry"
    },
    {
        id: 5,
        name: "Pontprennau - Spire Cardiff Hospital"
    },
    {
        id: 6,
        name: "Wigan - Royal Albert Edward Infirmary"
    }
]

const shiftList=[1,2,3,4,5,6,7,8,9,10]

const BrowserShift = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [specialist, setSpecialist] = React.useState(null);
    const [hospital, setHospital] = React.useState(null);

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
    return (
        <>
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
                                                <FormControlLabel control={<Checkbox name="checkedC" color="primary" className="menu-item-checkbox" />} label={item.name} />
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
                                        speciality.map((item, index) => (
                                            <MenuItem key={index}>
                                                <FormControlLabel control={<Checkbox name="checkedC" color="primary" className="menu-item-checkbox" />} label={item.name} />
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
                                        hospitalList.map((item, index) => (
                                            <MenuItem key={index}>
                                                <FormControlLabel control={<Checkbox name="checkedC" color="primary" className="menu-item-checkbox" />} label={item.name} />
                                            </MenuItem>
                                        ))
                                    }
                                    <Divider />
                                    <MenuItem className="menu-item-clear">Clear</MenuItem>
                                </Menu>
                            </div>
                            <div className="">
                                <Button variant="outlined">Filter</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="pb-32">
                <ShiftTable shiftList={shiftList} />
            </section>

        </>
    );
};

export default BrowserShift;