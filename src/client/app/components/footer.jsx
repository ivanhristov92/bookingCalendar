
'use strict';

import React from 'react';
import $ from 'jquery';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

class Footer extends React.Component{

    constructor( props ){
        super( props );

    }


    render() {

        return(

            <div className="container-fluid footer">

                <div>footer baby</div>
            </div>

        );
    }

}
export default Footer;


