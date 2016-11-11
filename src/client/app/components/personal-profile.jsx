'use strict';

import React from 'react';
import { Icon } from 'react-fa';

class PersonalProfile extends React.Component{

    constructor( props ){
        super( props );


        this.nameChange = this.nameChange.bind( this );
        this.emailChange = this.emailChange.bind( this );
        this.passwordChange = this.passwordChange.bind( this );
        this.newPasswordChange = this.newPasswordChange.bind( this );
        this.confirmNewPasswordChange = this.confirmNewPasswordChange.bind( this );
        this.submitChanges = this.submitChanges.bind( this );
    }


    nameChange( e ){
        this.props.nameChange( e );
    }

    emailChange( e ){
        this.props.emailChange( e );
    }

    passwordChange( e ){
        this.props.passwordChange( e );
    }

    newPasswordChange( e ){
        this.props.newPasswordChange( e );
    }

    confirmNewPasswordChange( e ){
        this.props.confirmNewPasswordChange( e );
    }


    submitChanges( e ){
        this.props.submitChanges( e );
    }

    render() {


        let Props = this.props.properties,
            name = Props.name,
            email = Props.email,
            password = Props.password,
            newPassword = Props.newPassword,
            confirmNewPassword = Props.confirmNewPassword;


        return (
            <div name="" className="row">
                <div className="col-sm-12">
                    <img src="/src/client/images/avatar.png" />
                </div>

                <div className="col-sm-12 details">
                    <div className="row">
                        <label className="col-sm-2 col-sm-offset-2 text-right">Name</label>

                        <div className="col-sm-4">
                            <input type="text" className="form-control" value={ name } onChange={ this.nameChange }/>
                        </div>
                    </div>

                    <div className="row">

                        <label className="col-sm-2 col-sm-offset-2 text-right">Email</label>

                        <div className="col-sm-4">
                            <input type="text" className="form-control" value={ email } onChange={ this.emailChange }/>
                        </div>

                    </div>

                    <div className="row">

                        <label className="col-sm-2 col-sm-offset-2 text-right">Password</label>

                        <div className="col-sm-4">
                            <input type="password" className="form-control" value={ password } onChange={ this.passwordChange }/>
                        </div>
                    </div>

                    <div className="row">

                        <label className="col-sm-2 col-sm-offset-2 text-right">New Password</label>

                        <div className="col-sm-4">
                            <input type="password" className="form-control" value={ newPassword } onChange={ this.newPasswordChange }/>
                        </div>
                    </div>

                    <div className="row">

                        <label className="col-sm-2 col-sm-offset-2 text-right">Repeat New Password</label>

                        <div className="col-sm-4">
                            <input type="password" className="form-control" value={ confirmNewPassword } onChange={ this.confirmNewPasswordChange }/>
                        </div>
                    </div>


                    <div className="row submitChangesButton">

                        <div className="col-sm-12">
                            <button className="btn btn-primary" onClick={ this.submitChanges }>Submit Changes</button>
                            <Icon name="refresh" spin />
                        </div>
                    </div>
                </div>

            </div>

        );
    }

}

PersonalProfile.contextTypes = {
    userServices: React.PropTypes.object
}

export default PersonalProfile;