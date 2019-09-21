import React, { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { LoadingComponent } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

export const DishdetailComponent = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <LoadingComponent />
                </div>
            </div>
        )
    } else if (props.errMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        )
    } else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}></RenderDish>
                    <RenderComments comments={props.comments} postComment={props.postComment}
                        dishId={props.dish.id}></RenderComments>
                </div>
            </div>);
    else
        return (
            <div></div>
        );
}

function RenderDish({ dish }) {
    return (
        <div className="col-xs-12 col-sm-12 col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.image}></CardImg>
                <CardBody>
                    <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null)
        return (
            <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </p>
                            </li>
                        )
                    })}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
            </div>);
    else
        return (
            <div><CommentForm dishId={dishId} postComment={postComment}></CommentForm></div>
        );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
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
        this.toggleModal();
        console.log(this.props.dishId);
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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

export default DishdetailComponent  