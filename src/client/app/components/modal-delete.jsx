
'use strict';

import React from 'react';
import $ from 'jquery';

import { Button, Modal } from 'react-bootstrap';


class ModalDelete extends React.Component{

    constructor( props ){
        super( props );

        this.state={};

        this.onDelete = this.onDelete.bind( this );
        this.onClose = this.onClose.bind( this );
    }


    onDelete( e ){
        this.props.onDelete( e );
    }

    onClose(  e ){
        this.props.onClose( e );
    }

    render() {

        return (

            <div className="modal-container">

                <Modal
                    show={ this.props.shouldShow }
                    onHide={ this.props.onClose }
                    aria-labelledby="contained-modal-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title" style={{textAlign: 'center'}}>Are you sure you want to delete this booking?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row text-center">

                        <Button className="btn-danger" onClick={ this.onDelete }>Delete</Button>
                        <Button style={{marginLeft: '0.5em'}} onClick={ this.onClose }>Close</Button>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>

                </Modal>
            </div>
        );
    }


}

export default ModalDelete;