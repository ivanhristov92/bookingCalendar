
'use strict';

import React from 'react';
import $ from 'jquery';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet


class Calendar extends React.Component{

    constructor( props ){
        super( props );
    }



    render() {

        let today = new Date();

        return(

            <div>
                <InfiniteCalendar
                    width={400}
                    height={600}
                    selectedDate={today}
                    disabledDays={[0,6]}
                    keyboardSupport={true}
                    onSelect={ this.props.onSelect }
                    selectedDate={ this.props.calendarDate }
                />
            </div>

        );
    }

}

export default Calendar;