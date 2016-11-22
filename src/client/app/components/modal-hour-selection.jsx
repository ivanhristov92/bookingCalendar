
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
            booking: {
                startTime: '',
                endTime: '',
                company: '',
                comments: 'aaa'
            },
            error:''
        };

        this.handleStartTimeSelect = this.handleStartTimeSelect.bind( this );
        this.handleEndTimeSelect = this.handleEndTimeSelect.bind( this );
        this.handleCompanyChange = this.handleCompanyChange.bind( this );
        this.handleCommentsChange = this.handleCommentsChange.bind( this );
        this.handleBookingSave = this.handleBookingSave.bind( this );
        this.cleanState = this.cleanState.bind( this );
        this.customSelectRenderer = this.customSelectRenderer.bind( this );
    }

    handleStartTimeSelect( hours, minutes ){
        console.log('start time', hours, minutes );
        let mins = (parseInt( minutes ) < 10) ? ( `0${minutes}` ) : ( minutes );
        let state = $.extend({}, this.state);
        let time = `${ hours }:${ mins }`;
        state.booking.startTime = time;
        this.setState( state );
    }

    handleEndTimeSelect( hours, minutes ){
        console.log('end time', hours, minutes );
        let state = $.extend({}, this.state);
        let mins = (parseInt( minutes ) < 10) ? ( `0${minutes}` ) : ( minutes );
        let time = `${ hours }:${ mins }`;
        state.booking.endTime = time;
        this.setState( state );
    }

    handleCompanyChange( data ){
        console.log('company name change', data.value);
        let state = $.extend({}, this.state);
        state.booking.company = data.value;
        this.setState( state );
    }

    handleCommentsChange( e ){

        console.log( 'comments change', data.value );
        let state = $.extend( {}, this.state );
        state.booking.comments = $( e.currentTarget ).val();
        this.setState( state );
    }

    handleBookingSave ( e ){
        let booking = $.extend( {}, this.state.booking ),
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
        this.props.save( booking )
        .then( ( parsedResponse )=>{
            console.log( 'parsedResponse from booking save @ hrSelection modal', parsedResponse );
                if( parsedResponse.error ){

                    let state = $.extend({}, this.state);
                    state.error = parsedResponse.parsedResponse;
                    this.setState( state );
                }

        })
    }


     customSelectRenderer ( option ){

        let backgroundColor = "";

        switch( option['value'] ){
            case "quikfox":
                backgroundColor="orange";
                break;
            case "frox":
                backgroundColor = "rgb(85, 159, 255)";
                break;
            case "stamford":
                backgroundColor = "rgb(85, 159, 255)";
                break;
            case "akros":
                backgroundColor = "rgb(85, 159, 255)";
                break;
            case "quikfoxServices":
                backgroundColor="orange";
                break;
            case "private":
                backgroundColor = "#ff6699";
                break;
        }

        //console.log( 'option', option )
        return (<span className="aaa" >{option['label']}<span style={{float: 'right', width: '1em', height: '1em', background: backgroundColor, borderRadius: '3px'}} ></span></span>)

    }


    cleanState(){
        let state={
            booking: {
                startTime: '',
                endTime: '',
                company: '',
                comments: 'aaa'
            },
            error:''
        };

        this.setState( state );
    }



    componentWillReceiveProps( props ){
        if( !props.shouldShow ){
            this.cleanState();
        }
    }

    render() {

        let room = this.props.roomName.match(/\d/);
        console.log( 'room', room[0] )

        let close = this.props.close;
        let d = this.props.date,
            date = "";

        if( d !== '' ){
            date = ( d[0] < 10 ) ? ( '0' + d[0] + '-' ) : ( d[0] + '-' );
            date +=  ( d[1] < 10 ) ? ( '0' + d[1] + '-' ) : ( d[1] + '-' );
            date += d[2];
        }

        return (

            <div className="modal-container" style={{height: 200}}>

                <Modal
                    show={ this.props.shouldShow }
                    onHide={ close }
                    container={ this.props.container }
                    aria-labelledby="contained-modal-title">


                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title"><span>ROOM { room[0] }</span> <span style={{ float: 'right', marginRight: '1em'}}> { date }</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row">
                        <div className="col-sm-12 text-center">
                            <h4>Start Time <span className="ccRequired">*</span></h4>
                            <Time onSelect={ this.handleStartTimeSelect } ></Time>
                        </div>

                        <div className="col-sm-12 text-center">
                            <h4>End Time <span className="ccRequired">*</span></h4>
                            <Time onSelect={ this.handleEndTimeSelect } ></Time>
                        </div>
                        <div className="col-sm-12 text-left">
                            <label>Comments</label>
                            <inpit className="form-control" name="comments" placeholder="comments"
                                onChange={ this.handleCommentsChange }
                                value={ this.state.booking.comments }
                                />
                        </div>

                        <div className="col-sm-6 text-left">
                            <label>Company <span className="ccRequired">*</span></label>
                            <MySelect options={[
                            { value: 'quikfox', label: 'Quikfox' },
                            { value: 'quikfoxServices', label: 'Quikfox Services' },
                            { value: 'frox', label: 'FROX' },
                            { value: 'stamford', label: 'Stamford' },
                            { value: 'akros', label: 'Akros' },
                            { value: 'private', label: 'Private' }

                            ]}
                            onChange={ this.handleCompanyChange }
                            value={ this.state.booking.company }
                                optionRenderer={ this.customSelectRenderer }
                            >
                            </MySelect>
                        </div>

                        <div className="col-sm-6 text-left">
                            <label>Participants</label><MySelect></MySelect>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-sm-12 text-center">
                            <p className="errorMessage ccRequired">{ this.state.error }</p>
                        </div>
                        <Button className="btn-primary" onClick={ this.handleBookingSave} style={{ backgroundColor: 'rgb(68, 138, 255)' }}>Save Booking</Button>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }


}

export default ModalHRSelecttion;