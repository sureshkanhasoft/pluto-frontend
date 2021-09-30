import React, { useState } from 'react';
import { 
    AppBar,
    Container,
    Toolbar, 
    Button, 
    Typography,
    makeStyles,
    Badge
} from '@material-ui/core';
import { Link, NavLink  } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../utils/HistoryUtils';
import { apiClient } from '../../config/apiClient';
import Notify from '../Notify/Notify';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    toolbar:{
        minHeight:80,
        "& > .menu-link":{
            fontSize:16,
            fontWeight:"500",
            padding:"6px 16px",
            color: "rgba(255,255,255,0.70)",
            "&.active":{
                color:"#fff"
            }
        }
    },
    logo:{
        color:"#fff"
    },
    userIconCont:{
        height:"80px",
        borderLeft:"1px solid #2b6399",
        borderRight:"1px solid #2b6399",
        padding:"6px 24px !important",
        marginLeft:"16px",
        textTransform:"capitalize",
        display:"flex",
        alignItems:'center',
        color: "rgba(255,255,255,0.70)",
        transition:"all 0.3s ease-in-out",
        '&:hover':{
            backgroundColor:"#2b6399"
        }
    },
    userIcon:{
        marginRight:12
    },
    userProfile:{
        width: "32px",
        height: "32px",
        backgroundColor: "#437bb2",
        borderRadius: "12px",
        overflow: "hidden",
        marginRight:10,
        '& svg':{
            width: "38px",
            height: "auto",
            color: "#0c2f51",
            position: "relative",
            top: "2px",
            left: "-3px"
        }
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const [msg, setMsg] = useState()

    const logout = () => {
        apiClient(true).get(`api/signee/logout`)
        .then(response => {
            if(response) {
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

    return (
        <>
        { msg && msg !== "" &&
            <Notify
                data= {msg}
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
                        <NavLink  to="/shifts" color="inherit" className="menu-link">BROWSE SHIFTS</NavLink>
                        <NavLink  to="/my-shifts/upcoming" color="inherit" className="menu-link">MY SHIFTS</NavLink>
                        <NavLink  to="/profile/documents" color="inherit" className="menu-link">COMPLIANCE</NavLink>
                        <Button color="inherit">
                            <Badge badgeContent={1} color="primary">
                                <NotificationsIcon/>
                            </Badge>
                        </Button>
                        <Link to="/profile/information" color="inherit" className={classes.userIconCont}>
                            <div className={classes.userProfile}>
                                <PersonIcon className={classes.userIcon}/>
                            </div>
                            <Typography variant="subtitle1">User 1</Typography>
                        </Link>
                        <Button color="inherit" onClick={logout}>
                            <ExitToAppIcon />
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Navbar;