import React, { Component } from 'react'
import {Card, CardImg ,CardText, CardBody, CardTitle} from 'reactstrap'

export class DishdetailComponent  extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        if(this.props.dish != null){
            return this.renderDish();
        } else{
            return(
                <div></div>
            )
        }
    }

    renderDish(){
        return(
            <div className="row">
                <div className="col-6 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.image}></CardImg>
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                {this.renderComments()}
            </div>
        )
    }
    renderComments(){
        const comments = this.props.dish.comments.map((com) => {
            return (
                <div key={com.id} >
                    <div className="pb-2 w-95">{com.comment}</div>
                    <div className="pb-2">-- {com.author} , {new Date(com.date). toDateString().split(' ').slice(1).join(' ')}</div>
                </div>
            )
        });


        if(this.props.dish != null){
        
            return (
                <div className="col-6 col-md-5 m-1 list-unstyled ">
                    <h4>Comments</h4>
                    {comments}

                </div>

            )
        } else{
            return(
                <div></div>
            )
        }
    }
}

export default DishdetailComponent 
