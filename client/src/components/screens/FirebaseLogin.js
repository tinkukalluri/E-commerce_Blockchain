

import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
// import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Typography } from '@mui/material';

import '@fontsource/roboto/300.css';

import firebase from 'firebase/compat/app';
import { firebaseConfig } from "../../js/firebase_"
import { redirect_url } from '../Firebase/credentials';



// importing css
import '../Firebase/css/FirebaseLogin.css';

var firebaseui = require('firebaseui');
export default function Login(props) {
    const [authResult, setAuthResult] = useState('')
    const [parsedAuthResult, setParsedAuthResult] = useState('')

    function parseAuth(auth_result) {
        return {
            accessToken: auth_result.user.multiFactor.user.stsTokenManager.accessToken,
            refreshToken: auth_result.user.multiFactor.user.stsTokenManager.refreshToken,
            uid: auth_result.user.multiFactor.user.uid,
            photoURL: auth_result.user.multiFactor.user.photoURL,
            phoneNumber: auth_result.user.multiFactor.user.phoneNumber,
            providerId: auth_result.user.multiFactor.user.providerId,
            displayName: auth_result.user.multiFactor.user.displayName,
            email: auth_result.user.multiFactor.user.email,
            emailVerified: auth_result.user.multiFactor.user.emailVerified
        }
    }


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }



    function LogininGoogle() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "authResult": parseAuth(authResult)
            }),
        };
        fetch('/api/loginwithgoogle', requestOptions).then((response) => {
            return response.json()
        }).then(data => {
            if (data.result) {
                //console.log("logged in successfully")
                window.location.replace('/home')
            } else {
                //console.log("opps something when wrong")
                props.history.push('/')
            }
        })
    }

    useEffect(() => {
        //console.log("auth result in useeffect")
        //console.log(authResult)
        if (authResult != "") {
            LogininGoogle()
        }
    }, [authResult])

    function renderLogin() {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        // var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: ((function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    //console.log("authResult", authResult)
                    //console.log("redirectUrl", redirectUrl)
                    setAuthResult(authResult)
                    return false;
                }).bind(this))
                // uiShown: function () {
                //     // The widget is rendered.
                //     // Hide the loader.
                //     document.getElementById('loader').style.display = 'none';
                // }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: redirect_url,
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: 'terms-conditions',
            // Privacy policy url.
            privacyPolicyUrl: 'terms-conditions'
        };

        // make sure u have added a div with #firebaseui-auth-container id
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        //console.log("in use effect")
        if (firebaseui.auth.AuthUI.getInstance()) {
            const ui = firebaseui.auth.AuthUI.getInstance()
            ui.start('#firebaseui-auth-container', uiConfig)
        } else {
            const ui = new firebaseui.auth.AuthUI(firebase.auth())
            ui.start('#firebaseui-auth-container', uiConfig)
        }
        // ui.start('#firebaseui-auth-container', uiConfig);
    }

    useEffect(
        () => {
            renderLogin()
        }, [])

    return (
        <>
            <div className="login-container" >
                <Typography className="app-name" variant="h3" compact="h3">
                    Group Listen-V2
                </Typography>
                <div id="firebaseui-auth-container"></div>
            </div>
        </>
    )

}