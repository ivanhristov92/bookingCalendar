
'use strict';

import React from 'react';
import $ from 'jquery';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

class Menu extends React.Component{

    constructor( props ){
        super( props );

        this.logoutUser = this.logoutUser.bind( this );
        this.handleMyProfile = this.handleMyProfile.bind( this );
        this.handleBookARoom = this.handleBookARoom.bind( this );
    }


    logoutUser( e ){
        this.props.logout( e );
    }

    handleMyProfile( e ){
        browserHistory.push( '/myProfile' );
    }

    handleBookARoom( e ){
        e.preventDefault();
        browserHistory.push( '/bookARoom' );
    }


    render() {

        return(

            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/bookARoom">Book A Room</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Link</NavItem>
                        <NavItem eventKey={2} href="#">Link</NavItem>

                    </Nav>
                    <Nav pullRight>

                        <NavItem eventKey={1} href="#" onClick={ this.handleMyProfile }>My Profile</NavItem>
                        <NavItem eventKey={2} href="#" onClick={ this.logoutUser }>Log out</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }

}

export default Menu;


