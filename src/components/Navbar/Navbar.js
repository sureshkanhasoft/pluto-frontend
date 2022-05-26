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
import { MyShiftAccessCheck } from '../../components/MyShiftAccessInfo/MyShiftAccessInfo'
import { notificationClear } from "../../../src/store/action/notificationMsg";
import ApiConfig from '../../../src/config/ApiConfig';

// import SwitchAccountIcon from '@material-ui/icons/SwitchAccount';
// import SwitchAccountRoundedIcon from '@material-ui/icons/SwitchAccountRounded';
import * as actions from "../../store/action";

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
        },
        '& img':{
            width:"100%",
            height:"100%",
            objectFit:"cover"
        }
    },
    menuBox: {
        '& .MuiMenu-list': {
            padding: 0,
            minWidth: 175,
            minHeight:"28px"
        },
        '& .MuiListItem-root': {
            borderBottom: '1px solid #dcdcdc',
            // width: 300,
            minWidth:190,
            maxWidth:350,
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
        fontSize: 13,
        whiteSpace:'normal',
        color: "rgba(0, 0, 0, 0.7)",
        '&.isRead':{
            fontWeight:"500",
            color:"#000"
        }
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
    var signeeInfo = JSON.parse(window.localStorage.getItem('signeeInfo'));
    const baseUrl = ApiConfig.API_URL + "uploads/signee_profile_pic/";

    // const baseUrl = "http://backendbooking.kanhasoftdev.com/public/uploads/signee_profile_pic/";
    const [msg, setMsg] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [switchTrust, setSwitchTrust] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(switchTrust);
    const [emailAccount, setEmailAccount] = useState()
    const getProfilerName = JSON.parse(window.localStorage.getItem('signeeInfo'));
    const getToken = JSON.parse(window.localStorage.getItem('token'));
    const { swtichAccSuccess } = useSelector(state => state.switchAccount)
    const { notificationList} = useSelector((state)=>state.notification)
    var notificationInfo = useSelector((state)=>state.notificationMsg)
    const [data, setData] = useState({
        email: getProfilerName.email
    })

    const handleClickNotification = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickAccount = (event) => {
        setSwitchTrust(event.currentTarget);
    };
    useEffect(() => {
        // let signee=localStorage.getItem("signeeInfo") ? JSON.parse(localStorage.getItem("signeeInfo") || "{}") : "";
        // const requestData={
        //     signee_id : signee.id
        // }
        dispatch(actions.getNotification(1))
    },[dispatch])
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
                localStorage.clear();
                    setTimeout(() => {
                        history.push('/login')
                    }, 2000);
            });
    }

    const handleSwitchAccount = (id) => {
        if (getProfilerName.parent_id !== id) {
            dispatch(switchAccount(id))
        }
    }

    const unReadNotification=notificationList?.data && notificationList?.data.filter(val => val.is_read == 0).length;
    
    const readNotification = (e,val) => {
        e.preventDefault();
        const requestData={
            notification_id:val.id,
            is_read:true,
            signee_id:val.signee_id
        }
        dispatch(actions.readNotification(requestData))

    }

    const clearNotificationMsg = () => {
        let reqParam = { message: null, status: null, type: null }
        setTimeout(() => {
            dispatch(notificationClear(reqParam))
        }, 4000);
    }
    const ReadAllNotification = () => {
        const requestData={
            notification_id:"All",
            is_read:true,
        }
        dispatch(actions.readNotification(requestData))
    }

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
            {notificationInfo?.message &&
                (
                    <>
                        <Notify
                            data={notificationInfo?.message}
                            status= {notificationInfo?.status ? "success" : "error" }
                        />
                        {clearNotificationMsg()}
                    </>
                )
            }
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters className={classes.toolbar}>
                        <Link to="/shifts" className={classes.logo}>
                            <Typography variant="h4">Pluto</Typography>
                        </Link>
                        <div className={classes.grow}></div>
                        <Typography variant="h6">{getProfilerName.organization_name}</Typography>
                        <div className={classes.grow}></div>
                        <NavLink to="/shifts" color="inherit" className="menu-link">BROWSE SHIFTS</NavLink>
                        {MyShiftAccessCheck() &&
                            <NavLink to="/my-shifts/upcoming" color="inherit" className="menu-link">MY SHIFTS</NavLink>
                        }
                        <NavLink to="/profile/documents" color="inherit" className="menu-link">COMPLIANCE</NavLink>
                        <Tooltip title={<span className={classes.tooltipCon}>Notification</span>}>
                            <Button color="inherit" onClick={handleClickNotification}>
                                <Badge badgeContent={unReadNotification} color="primary" >
                                    <NotificationsIcon />
                                </Badge>
                            </Button>
                        </Tooltip>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            // onClick={handleClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            className={classes.menuBox}
                        >
                            {
                                notificationList?.data && notificationList?.data.length > 0  ? 
                                
                                 notificationList?.data.map((val,index) => {
                                    if(index < 5 ){
                                        return (
                                            <MenuItem onClick={((e) =>readNotification(e,val))} style={{background:val.is_read==0?'#e7f2ff':'white'}} key={index}>
                                                <div>
                                                    {/* <Typography variant="h6" className={classes.menuHeading}>{val.message} </Typography> */}
                                                    <Typography variant="body2" className={`${classes.menuDesc} ${val.is_read==0? 'isRead':''}`}>{val.message} </Typography>
                                                </div>
                                            </MenuItem>
                                        )
                                    }
                                }) :  
                                <MenuItem >
                                    <div> 
                                        <Typography variant="h6" className={classes.menuHeading}>No Data Found </Typography>
                                    </div>
                                </MenuItem>
                            }
                            { notificationList?.data && notificationList?.data.length > 0  ? 
                            <MenuItem>
                            <>
                                <Link to="/notification">
                                    <Typography variant="caption">Show all notification</Typography>
                                </Link>
                                <span style={{marginLeft:"auto"}} onClick={ReadAllNotification}>
                                    <Typography variant="caption">Read all</Typography>
                                </span>
                                </>

                            </MenuItem> :""
                            }
                        </Menu>

                        <Link to="/profile/information" color="inherit" className={classes.userIconCont}>
                            <div className={classes.userProfile}>
                                {/* <PersonIcon className={classes.userIcon} /> */}
                                {
                                    signeeInfo.profile_pic !== null ? <img src={baseUrl + signeeInfo.profile_pic} alt="" /> : <PersonIcon className={classes.userIcon} />
                                }
                                
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