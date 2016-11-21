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
            confirmNewPassword: '',
            errorMessages:[]
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


        if( this.state.newPassword !== "" ){
            if( this.state.confirmNewPassword !== this.state.newPassword ){

                let state = $.extend( {}, this.state );
                state.errorMessages = [];
                state.errorMessages.push('the two passwords do not match!!!');
                console.log( 'the two passwords do not match!!!' );
                this.setState( state );
                return;
            }


            if( !this.state.password ){
                let state = $.extend( {}, this.state );
                state.errorMessages = [];
                state.errorMessages.push('please provide the original password');
                console.log( 'please provide the original password' );
                this.setState( state );
                return;
            }
        }

        this.context.userServices.editUser ({
            username: this.state.name,
            email: this.state.email,
            newPassword: this.state.newPassword,
            oldPassword: this.state.password
        })
        .then( ( response )=>{
                console.log( response );
            });

    }

    render() {
        let id = 0;
        let errors = this.state.errorMessages.map( ( err )=>{
            return (
              <p key={id++}>{ err }</p>
            );
        });

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
                        <div className="col-sm-12 text-center">
                            {errors}
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