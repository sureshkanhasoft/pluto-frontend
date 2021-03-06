import React from 'react'
import { Grid, Card, TextField, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

const useStyle = makeStyles({
    loginContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#2b68a4",
        flexDirection: "column"
    },
    loginCard: {
        width: "100%",
        maxWidth: 480,
        padding: "36px 24px 24px",
        background: "#dceeff",
        boxShadow: "0 1px 35px rgba(11, 48, 86, 0.50)",
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        marginBottom: 24,
        color:"#000",
        "& input":{
            paddingLeft:12
        },
        "& svg": {
            color: "#2b68a4"
        }
    },
    forgotCont:{
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:24,
    },
    forgotText:{
        color:"#2b68a4",
        fontSize:13,
        borderBottom:"1px dashed #2b68a4"
    },
    loginBtn:{
        width:140,
        borderRadius: "4px",
        margin:"0 auto",
        background:"#ff8b46",
        "&:hover":{
            background:"#ff8b46"
        }
    }
})

const Register = () => {
    const classes = useStyle();
    return (
        <Grid className={classes.loginContainer}>
                <Card className={classes.loginCard}>
                    <form className={classes.form}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <MailIcon />
                            }}
                            className={classes.textField}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            className={classes.textField}
                        />
                        <div className={classes.forgotCont}>
                            <Link to="#" className={classes.forgotText}>Forgotten your password?</Link>
                        </div>
                        <Button variant="contained" color="primary" className={classes.loginBtn}>
                            login
                        </Button>
                    </form>
                </Card>
            </Grid>
    )
}

export default Register
