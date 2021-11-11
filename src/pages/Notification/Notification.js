import React,{ useState,useEffect } from 'react'
import {
    Container, Box, Paper, makeStyles, Typography
} from '@material-ui/core';
import ProfileUpdateInfo from '../../components/ProfileUpdateInfo/ProfileUpdateInfo'
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "../../store/action";
import moment from 'moment';

const useStyle = makeStyles(() => ({
    notificationBox: {
        cursor:'pointer',
        width: "100%",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        position: "relative",
        overflow: "hidden",
        '&::after': {
            content: `""`,
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: "100%",
            background: "#184a7b",
        }
    },
    menuHeading: {
        fontSize: 15,
    },
    menuDesc: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.6)",
        '&.isRead':{
            fontWeight:"500",
            color:"#000"
        }
    }
}))

const Notification = () => {
    const dispatch = useDispatch();
    const classes = useStyle();
    // const [notificationList,setNotificationList]=useState([])
    const { notificationList} = useSelector((state)=>state.notification)

    useEffect(() => {
        let signeeId=localStorage.getItem("signeeInfo") ? JSON.parse(localStorage.getItem("signeeInfo") || "{}") : "";
        const requestData={
            signee_id : signeeId.id
        }
        dispatch(actions.getNotification(requestData))
    },[])
    const unReadNotification=notificationList.filter(val => val.is_read == 0).length;

    const readNotification = (e,val) => {
        e.preventDefault();
        const requestData={
            notification_id:val.id,
            is_read:true,
            signee_id:val.signee_id
        }
        dispatch(actions.readNotification(requestData))

    }
    return (
        <>
            <ProfileUpdateInfo />
            <section className="pt-16 pb-32">
                <Container maxWidth="lg">
                    <h1 className="mt-16">Notifications</h1>
                    <Box className="mb-36">
                        {
                            (notificationList.length >0) ? notificationList.map(val => {
                                return (
                                    <Paper elevation={3} onClick={((e) =>readNotification(e,val))} className={classes.notificationBox} style={{background:val.is_read==0?'#e7f2ff':'white'}} >
                                        <div>
                                            {/* <Typography variant="h6" className={classes.menuHeading}>Heading </Typography> */}
                                            <Typography variant="body2" className={`${classes.menuDesc} ${val.is_read==0? 'isRead':''}`} >{val.message} </Typography>
                                        </div>
                                        <span>{moment(val.created_at).format('DD MMM')}</span>

                                    </Paper>
                                )
                            }) :"No Data Found"
                        }

                    </Box>
                </Container>
            </section>
        </>
    )
}

export default Notification
