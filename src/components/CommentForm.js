import React, { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

export class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        if (this.state.isModalOpen) {
            return (

                <div className="container">
                    <div className="row row-content">
                        <div className="col-6">
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                        <Row className="form-group">
                                            <Col><Label htmlFor="rating">Rating</Label> </Col>
                                        </Row>
                                        <Row className="form-group">

                                            <Col>
                                                <Control.select model=".rating" className="form-control" name="rating" >
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col><Label htmlFor="author">Your Name</Label> </Col>
                                        </Row>
                                        <Row className="form-group">

                                            <Col >
                                                <Control.text model=".author" id="author" className="form-control" name="author" placeholder="Your Name" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                                <Errors className="test-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }} />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col><Label htmlFor="comment">Comment</Label> </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col>
                                                <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col>
                                                <Button type="submit" color="primary">
                                                    <span className="" />Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div >

            );
        } else {

            return (
                <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                    <Button onClick={this.toggleModal} color="secondary" type="submit"><span className="fa fa-pencil">Submit Comment </span></Button>
                </div>
            )
        }
    }
}

export default CommentForm