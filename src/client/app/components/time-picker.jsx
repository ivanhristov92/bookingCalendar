

'use strict';

import React from 'react';
import $ from 'jquery';

import Timepicker from 'react-timepicker';
import 'react-timepicker/timepicker.css'

class Time extends React.Component {

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind( this );
    }

    onChange (hours, minutes) {
        this.props.onSelect( hours, minutes );
    }

    componentDidMount(){

        $( 'p.timepicker-info' ).css( 'width', '' );

    }

    render () {
        return (
            <Timepicker onChange={ this.onChange } />
        );
    }
}

export default Time;

