import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_decode from 'jwt-decode';

import Input from "./Input";
import useStyles from './styles';
import Icon from './icon'

const Auth = () => {
    const classes = useStyles();
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

    function handleCallbackResponse(response) {
        console.log("Encoded" + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
    }
    
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "642572922164-3oujt6v6hk8s95ttdjgndeo096j6047l.apps.googleusercontent.com",
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
                    <div id="googleSignInDiv">

                    </div>
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