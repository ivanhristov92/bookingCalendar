/**
 * Created by qfintern on 11/7/16.
 */
'use strict';

import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles/main.css';

import Main from './page-components/main.jsx';
import Login from './page-components/login.jsx';
import ForgotPassword from './page-components/forgot-password.jsx';
import BookARoom from './page-components/book-a-room.jsx';
import MyProfile from './page-components/my-profile.jsx';


render(
    <Router history={browserHistory}>
        <Route component={ Main }>

            <Route path="/" component={ Login }></Route>

            <Route path="/login" component={ Login }>
            </Route>

            <Route path="/forgotPassword" component={ ForgotPassword }>
            </Route>

            <Route path="/bookARoom" component={ BookARoom }>
            </Route>

            <Route path="/myProfile" component={ MyProfile }>
            </Route>

        </Route>
    </Router>
    , document.getElementById('app'));