'use strict';

import React from 'react';

import $ from 'jquery';

class ForgotPasswordForm extends React.Component{

    constructor( props ){
        super( props );
    }



    render() {

        return (

            <form className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <input className="form-control inputField" name="email" type="email" placeholder="Type in your email address" />
                    <input className="form-control inputField" name="submit" type="submit" />
                </div>
            </form>

        );
    }

}

export default ForgotPasswordForm;