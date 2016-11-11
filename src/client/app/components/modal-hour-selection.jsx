
'use strict';

import React from 'react';
import $ from 'jquery';

import { Button, Modal } from 'react-bootstrap';
import Time from './time-picker.jsx';
import MySelect from './select2.jsx';

class ModalHRSelecttion extends React.Component{

    constructor( props ){
        super( props );

        this.state={

            startTime: '',
            endTime: '',
            company: '',
            comments: 'aaa'

        };

        this.handleStartTimeSelect = this.handleStartTimeSelect.bind( this );
        this.handleEndTimeSelect = this.handleEndTimeSelect.bind( this );
        this.handleCompanyChange = this.handleCompanyChange.bind( this );
        this.handleCommentsChange = this.handleCommentsChange.bind( this );
        this.handleBookingSave = this.handleBookingSave.bind( this );
    }

    handleStartTimeSelect( hours, minutes ){
        console.log('start time', hours, minutes );
        let mins = (parseInt( minutes ) < 10) ? ( `0${minutes}` ) : ( minutes );
        let state = $.extend({}, this.state);
        let time = `${ hours }:${ mins }`;
        state.startTime = time;
        this.setState( state );
    }

    handleEndTimeSelect( hours, minutes ){
        console.log('end time', hours, minutes );
        let state = $.extend({}, this.state);
        let mins = (parseInt( minutes ) < 10) ? ( `0${minutes}` ) : ( minutes );
        let time = `${ hours }:${ mins }`;
        state.endTime = time;
        this.setState( state );
    }

    handleCompanyChange( data ){
        console.log('company name change', data.value);
        let state = $.extend({}, this.state);
        state.company = data.value;
        this.setState( state );
    }

    handleCommentsChange( e ){

        console.log( 'comments change', data.value );
        let state = $.extend( {}, this.state );
        state.comments = $( e.currentTarget ).val();
        this.setState( state );
    }

    handleBookingSave ( e ){
        let booking = $.extend( {}, this.state ),
            date,
            d = this.props.date,
            room = this.props.roomName.match(/\d/)[0];

        if( d !== '' ){
                date = ( d[0] < 10 ) ? ( '0' + d[0] + '-' ) : ( d[0] + '-' );
                date +=  ( d[1] < 10 ) ? ( '0' + d[1] + '-' ) : ( d[1] + '-' );
                date += d[2];
        }

        booking.date = date;
        booking.room = room;
        this.props.save( booking );
    }


    render() {

        let room = this.props.roomName.match(/\d/);
        console.log( 'room', room[0] )

        let close = this.props.close;


        return (

            <div className="modal-container" style={{height: 200}}>

                <Modal
                    show={ this.props.shouldShow }
                    onHide={ close }
                    container={ this.props.container }
                    aria-labelledby="contained-modal-title">


                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Booking Time: Room { room[0] }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row">
                        <div className="col-sm-12 text-center">
                            <h4>Start Time</h4>
                            <Time onSelect={ this.handleStartTimeSelect } ></Time>
                        </div>

                        <div className="col-sm-12 text-center">
                            <h4>End Time</h4>
                            <Time onSelect={ this.handleEndTimeSelect } ></Time>
                        </div>
                        <div className="col-sm-12 text-left">
                            <label>Comments</label>
                            <inpit className="form-control" name="comments" placeholder="comments"
                                onChange={ this.handleCommentsChange }
                                value={ this.state.comments }
                                />
                        </div>

                        <div className="col-sm-6 text-left">
                            <label>Company</label>
                            <MySelect options={[
                            { value: 'quikfox', label: 'Quikfox' },
                            { value: 'frox', label: 'FROX' },
                            { value: 'quikfoxServices', label: 'Quikfox Services' }
                            ]}
                            onChange={ this.handleCompanyChange }
                                value={ this.state.company }
                            >
                            </MySelect>
                        </div>

                        <div className="col-sm-6 text-left">
                            <label>Participants</label><MySelect></MySelect>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-primary" onClick={ this.handleBookingSave}>Save Booking</Button>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }


}

export default ModalHRSelecttion;