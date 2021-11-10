import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Button,
    Typography,
    makeStyles,
    Badge,
    MenuItem, Avatar, Divider, ListItemIcon, Menu, Tooltip, IconButton
} from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../utils/HistoryUtils';
import { apiClient } from '../../config/apiClient';
import Notify from '../Notify/Notify';
import { useDispatch, useSelector } from 'react-redux';
import { switchAccount } from '../../store/action';
import { MyShiftAccessInfoComponent, MyShiftAccessCheck } from '../../components/MyShiftAccessInfo/MyShiftAccessInfo'

// import SwitchAccountIcon from '@material-ui/icons/SwitchAccount';
// import SwitchAccountRoundedIcon from '@material-ui/icons/SwitchAccountRounded';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    toolbar: {
        minHeight: 80,
        "& > .menu-link": {
            fontSize: 16,
            fontWeight: "500",
            padding: "6px 16px",
            color: "rgba(255,255,255,0.70)",
            "&.active": {
                color: "#fff"
            }
        }
    },
    logo: {
        color: "#fff"
    },
    userIconCont: {
        height: "80px",
        borderLeft: "1px solid #2b6399",
        borderRight: "1px solid #2b6399",
        padding: "6px 24px !important",
        marginLeft: "16px",
        textTransform: "capitalize",
        display: "flex",
        alignItems: 'center',
        color: "rgba(255,255,255,0.70)",
        transition: "all 0.3s ease-in-out",
        '&:hover': {
            backgroundColor: "#2b6399"
        }
    },
    userIcon: {
        marginRight: 12
    },
    userProfile: {
        width: "32px",
        height: "32px",
        backgroundColor: "#437bb2",
        borderRadius: "12px",
        overflow: "hidden",
        marginRight: 10,
        '& svg': {
            width: "38px",
            height: "auto",
            color: "#0c2f51",
            position: "relative",
            top: "2px",
            left: "-3px"
        }
    },
    menuBox: {
        '& .MuiMenu-list': {
            padding: 0,
        },
        '& .MuiListItem-root': {
            borderBottom: '1px solid #dcdcdc',
            width: 250,
            '&:last-child': {
                borderBottom: 'none'
            }
        },
        '& .active': {
            backgroundColor: '#f78b46',
            color: "#fff",
            pointerEvent: 'none',
            cursor: "default"
        }
    },
    menuHeading: {
        fontSize: 15,

    },
    menuDesc: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.6)",
    },
    tooltipCon: {
        letterSpacing: '0.8px',
        fontWeight: "300",
        fontSize: 12
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [msg, setMsg] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [switchTrust, setSwitchTrust] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(switchTrust);
    const [emailAccount, setEmailAccount] = useState()
    const getProfilerName = JSON.parse(window.localStorage.getItem('signeeInfo'));
    const getToken = JSON.parse(window.localStorage.getItem('token'));
    const { swtichAccSuccess } = useSelector(state => state.switchAccount)
    const [data, setData] = useState({
        email: getProfilerName.email
    })

    const handleClickNotification = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickAccount = (event) => {
        setSwitchTrust(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSwitchTrust(null)
    };

    const getEmailAccount = async () => {
        // setEmailNotify("")
        await apiClient(true).post(`api/signee/get-email-organisation`, data)
            .then(response => {
                const dataItem = response.data
                setEmailAccount(dataItem)
            }).catch(error => {
                console.log('error: ', error);
            })
    }

    useEffect(() => {
        dispatch(getEmailAccount)
    }, [])

    const logout = () => {
        apiClient(true).get(`api/signee/logout`)
            .then(response => {
                if (response) {
                    setMsg(response.data.message)
                    localStorage.clear();
                    setTimeout(() => {
                        history.push('/login')
                        window.location.reload()

                    }, 2000);
                }

            }).catch(error => {
                console.log("error.message", error.message);
            });
    }

    const handleSwitchAccount = (id) => {
        if (getProfilerName.parent_id !== id) {
            dispatch(switchAccount(id))
            // if (getProfilerName.token !== getToken) {
            //     console.log('sdfsdf');
            //     // window.open("about:blank", "_self");
            //     // window.close();
            // }
        }
    }

    // window.onbeforeunload = (event) => {
    //     const e = event || window.event;
    //     // Cancel the event
    //     e.preventDefault();
    //     if (e) {
    //         e.returnValue = ''; // Legacy method for cross browser support
    //     }
    //     return ''; // Legacy method for cross browser support
    // };

    return (
        <>
            {msg && msg !== "" &&
                <Notify
                    data={msg}
                    status="success"
                />
            }
            {swtichAccSuccess && swtichAccSuccess?.message &&
                <Notify
                    data={swtichAccSuccess?.message}
                    status="success"
                />
            }
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters className={classes.toolbar}>
                        <Link to="/shifts" className={classes.logo}>
                            <Typography variant="h4">Pluto</Typography>
                        </Link>
                        <div className={classes.grow}></div>
                        <NavLink to="/shifts" color="inherit" className="menu-link">BROWSE SHIFTS</NavLink>
                        {dispatch(MyShiftAccessCheck) &&
                            <NavLink to="/my-shifts/upcoming" color="inherit" className="menu-link">MY SHIFTS</NavLink>
                        }
                        <NavLink to="/profile/documents" color="inherit" className="menu-link">COMPLIANCE</NavLink>
                        <Tooltip title={<span className={classes.tooltipCon}>Notification</span>}>
                            <Button color="inherit" onClick={handleClickNotification}>
                                <Badge badgeContent={1} color="primary" >
                                    <NotificationsIcon />
                                </Badge>
                            </Button>
                        </Tooltip>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            className={classes.menuBox}
                        >
                            {
                                [1, 2, 3, 4].map((index) => {
                                    return (
                                        <MenuItem key={index}>
                                            <div>
                                                <Typography variant="h6" className={classes.menuHeading}>Heading {index}</Typography>
                                                <Typography variant="body2" className={classes.menuDesc}>Notification demo item {index}</Typography>
                                            </div>
                                        </MenuItem>
                                    )
                                })
                            }
                            <MenuItem>
                                <Link to="/notification">
                                    <Typography variant="caption">Show all notification</Typography>
                                </Link>

                            </MenuItem>
                        </Menu>

                        <Link to="/profile/information" color="inherit" className={classes.userIconCont}>
                            <div className={classes.userProfile}>
                                <PersonIcon className={classes.userIcon} />
                            </div>
                            <Typography variant="subtitle1">{getProfilerName.first_name}</Typography>
                        </Link>
                        <Tooltip title={<span className={classes.tooltipCon}>Switch Organization</span>} style={{ backgroundColor: "transparent" }}>
                            <Button color="inherit" onClick={handleClickAccount}>
                                <span className="material-icons">
                                    switch_account
                                </span>
                            </Button>
                        </Tooltip>

                        <Menu
                            anchorEl={switchTrust}
                            open={open2}
                            onClose={handleClose}
                            onClick={handleClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            className={classes.menuBox}
                        >
                            {
                                emailAccount?.data && emailAccount?.data.map((list, index) => {
                                    const activeClass = getProfilerName.organization_name === list.organization_name
                                    return (
                                        <MenuItem key={index} onClick={() => handleSwitchAccount(list.organization_id)} className={activeClass ? 'active' : ""}>
                                            <div>
                                                <Typography variant="h6" className={classes.menuHeading}>{list.organization_name}</Typography>
                                            </div>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                        <Tooltip title="Sign out">
                            <Button color="inherit" onClick={logout}>
                                <ExitToAppIcon />
                            </Button>
                        </Tooltip>

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Navbar;