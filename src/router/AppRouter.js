import React, { useContext, useEffect } from 'react'

import { ChatPage } from "../pages/ChatPage"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { AuthRouter } from './AuthRouter';

import '../css/login-register.css'
import { AuthContext } from '../auth/Auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const { auth, verificaToken } = useContext( AuthContext )

    useEffect( () => {
        verificaToken()
    }, [ verificaToken ])


    if( auth.checking ){
        return <h1>Espere por favor</h1>
    }

    return (
        <Router>
        <div>
            <Switch>
                {/* <Route path="/auth" component={ AuthRouter } /> */}
                <PublicRoute
                    isAuthenticated={ auth.logged }
                    path="/auth"
                    component={ AuthRouter }
                />
                {/* <Route exact path="/" component={ ChatPage } /> */}
                <PrivateRoute
                    isAuthenticated={ auth.logged }
                    exact path="/"
                    component={ ChatPage }
                />

                <Redirect to="/"/>
            </Switch>
        </div>
        </Router>
    )
}
