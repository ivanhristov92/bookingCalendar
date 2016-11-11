'use strict';

import React from 'react';

import $ from 'jquery';

class LoginForm extends React.Component{

    constructor( props ){
        super( props );
    }



    render() {

        return (

            <form className="row">

                <div className="col-sm-6 col-sm-offset-3">
                    <input className="form-control inputField" name="username" type="text" placeholder="Username" onChange={ this.props.onUsernameChange }/>
                    <input className="form-control inputField" name="password" type="password" placeholder="User Password" onChange={ this.props.onPasswordChange }/>
                    <input className="form-control inputField" name="submit" type="submit" onClick={ this.props.onLoginSubmit }/>
                </div>

            </form>

        );
    }

}

export default LoginForm;