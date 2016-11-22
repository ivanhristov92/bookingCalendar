
'use strict';

import React from 'react';
import $ from 'jquery';

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class MySelect extends React.Component{

    constructor( props ){
        super( props );

        this.onChange = this.onChange.bind( this );
    }

    onChange( data ){
        this.props.onChange( data );
    }


    render() {




        return(

            <Select
                name="form-field-name"
                value={ this.props.value }
                options={ this.props.options }
                onChange={ this.onChange }
                children = { this.props.children }
                optionRenderer ={ this.props.optionRenderer }
            />
        );
    }

}

export default MySelect;



