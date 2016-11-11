'use strict';

import React from 'react';


import { Link } from 'react-router';
import ForgotPasswordForm from './../components/forgot-password-form.jsx';

class ForgotPassword extends React.Component{

    constructor( props ){
        super( props );
    }



    render() {

        console.log( 'context', this.context )


        this.context.userServices.logUser({ username: 'Ivan', password: '1234' })
        .then( ( response )=>{

                console.log( 'response ___', response );

            });

        return (

            <div name="" className="row forgotPasswordForm">
                <div className="col-sm-12 text-center">
                    <h2>Forgot Pass?</h2>
                </div>
                <ForgotPasswordForm></ForgotPasswordForm>

                <div className="col-sm-12 text-center">
                    <Link to="/login">Back To Login</Link>
                </div>

            </div>

        );
    }

}

ForgotPassword.contextTypes = {
    userServices: React.PropTypes.object
}

export default ForgotPassword;