'use strict';

import React from 'react';
import $ from 'jquery';
import LoginForm from './../components/login-form.jsx';
import { Link, browserHistory } from 'react-router';


class Login extends React.Component{


    constructor( props ){
        super( props );

        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind( this );
        this.handlePasswordChange = this.handlePasswordChange.bind( this );
        this.handleLoginSubmit = this.handleLoginSubmit.bind( this );
    }

    handleUsernameChange( e ){
        let username = { username: $( e.currentTarget ).val() },
            newState = $.extend( {}, this.state, username );
        this.setState( newState )

    }


    handlePasswordChange( e ){
        let password = { password: $( e.currentTarget ).val() },
            newState = $.extend( {}, this.state, password );
        this.setState( newState )
    }

    handleLoginSubmit( e ){

        e.preventDefault();
        this.context.userServices.logUser( this.state )
        .then( ( response )=>{
            console.log( 'response from logging the user through the form', response );
            if( response === 'cookie created' ){
                console.log( 'redirect now' );
                browserHistory.push('/bookARoom');

            }
        });
    }


    render() {

        return (
            <div name="background" className="row">
                <div className="col-sm-12 text-center" name="qfoxLogo">Quikfox Logo</div>
                <div className="row">
                    <h2 className="col-sm-12 text-center">Book A Meeting Room</h2>
                </div>
                <div className="row">
                    <LoginForm onUsernameChange={ this.handleUsernameChange } onPasswordChange={ this.handlePasswordChange } onLoginSubmit={ this.handleLoginSubmit } ></LoginForm>
                    <div className="col-sm-12 text-center">
                        <Link to="/forgotPassword">
                            <p className="errorMessage">Forgot password?</p>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }

}

Login.contextTypes = {
    userServices: React.PropTypes.object
}
export default Login;