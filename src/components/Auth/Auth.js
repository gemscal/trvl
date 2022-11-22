import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Input from "./Input";
import useStyles from './styles';

const Auth = () => {
    const GOOGLE_LOGIN = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = () => {}

    const handleChange = () => {}

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    //successfully login
    function handleCallbackResponse(response) {
        const token = response.credential;
        const result = jwt_decode(response.credential);
        console.log(result);

        dispatch({ type: 'AUTH', data: { result, token } })
        history.push('/');
    }
    
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: GOOGLE_LOGIN,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" }
        )
    })

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} />
                        <Input name="password" label="Password" handleChange={handleChange} type="password" />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <div id="googleSignInDiv"></div>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

// <GoogleLogin
//                         render={(renderProps) => (
//                             <Button 
//                                 className={classes.googleButton} 
//                                 color='primary' 
//                                 fullWidth 
//                                 onClick={renderProps.onClick} 
//                                 disabled={renderProps.disabled} 
//                                 startIcon={<Icon />} 
//                                 variant="contained"
//                             >
//                                 Google Sign In
//                             </Button>
//                         )}
//                         onSuccess={googleSuccess}
//                         onError={googleFailure}
//                         cookiePolicy="single_host_origin"
//                     />
export default Auth;