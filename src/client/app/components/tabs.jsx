
'use strict';

import React from 'react';
import $ from 'jquery';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


class Tabs extends React.Component{

    constructor( props ){
        super( props );

        this.state= {
          page: 1
        };

        this.handleSelect = this.handleSelect.bind( this );
    }

    handleSelect( key ) {
        this.props.onRoomChange( key )
    }



    render() {

        return(

            <Nav bsStyle="tabs" activeKey={ this.props.page } onSelect={this.handleSelect}>
                <NavItem eventKey="1" href="/home">Room 1</NavItem>
                <NavItem eventKey="2" title="Item">Room 2</NavItem>
                <NavItem eventKey="3">Both Rooms</NavItem>
            </Nav>
        );
    }

}

export default Tabs;


