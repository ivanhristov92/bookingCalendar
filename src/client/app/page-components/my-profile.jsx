'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import Menu from './../components/menu.jsx';
import PersonalProfile from './../components/personal-profile.jsx';

class MyProfile extends React.Component{

    constructor( props ){
        super( props );




        this.state={

            name: '',
            email: '',
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        };


        this.handleLogoutUser = this.handleLogoutUser.bind( this );
        this.handleNameChange = this.handleNameChange.bind( this );
        this.handleEmailChange = this.handleEmailChange.bind( this );
        this.handlePasswordChange = this.handlePasswordChange.bind( this );
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind( this );
        this.handleConfirmNewPasswordChange = this.handleConfirmNewPasswordChange.bind( this );
        this.handleSubmitChanges = this.handleSubmitChanges.bind( this );
        this.updateProperty = this.updateProperty.bind( this );
    }

    updateProperty( e, propName ){
        let state = $.extend( {}, this.state );
        state[propName] = $( e.currentTarget ).val();
        this.setState( state );
    }


    handleLogoutUser( e ){
        this.context.userServices.logoutUser()
        .then( ( response )=>{
            browserHistory.push( '/login' );
        });
    }

    handleNameChange( e ){
        this.updateProperty( e, 'name' );
    }

    handleEmailChange( e ){
        this.updateProperty( e, 'email' );
    }

    handlePasswordChange( e ){
        this.updateProperty( e, 'password' );
    }

    handleNewPasswordChange( e ){
        this.updateProperty( e, 'newPassword' );
    }

    handleConfirmNewPasswordChange( e ){
        this.updateProperty( e, 'confirmNewPassword' );
    }

    handleSubmitChanges( e ){

        this.context.userServices.editUser ({
            username: this.state.name,
            email: this.state.email,
            newPassword: this.state.newPassword
        })
        .then( ( response )=>{
                console.log( response );
            });

    }

    render() {
        return (
            <div name="" className="row myProfilePage">
                <Menu logout={this.handleLogoutUser} ></Menu>

                <div className="container pageContent">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h3>My Profile Page</h3>
                        </div>

                        <div className="col-sm-12 text-center">
                            <PersonalProfile
                                properties={ this.state }

                            nameChange={ this.handleNameChange }
                            emailChange={ this.handleEmailChange }
                            passwordChange={ this.handlePasswordChange }
                            newPasswordChange={ this.handleNewPasswordChange }
                            confirmNewPasswordChange={ this.handleConfirmNewPasswordChange }
                            submitChanges={ this.handleSubmitChanges }
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

MyProfile.contextTypes = {
    userServices: React.PropTypes.object
}

export default MyProfile;