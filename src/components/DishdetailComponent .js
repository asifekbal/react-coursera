import React from 'react'
import {Card, CardImg ,CardText, CardBody, CardTitle} from 'reactstrap'

    
    const DishdetailComponent=(props) => {
        if(props.dish != null)
        return(
        <div className="container">
            <div className="row">
                <RenderDish dish={props.dish}></RenderDish>
                <RenderComments comments={props.dish.comments}></RenderComments>
            </div>
        </div>);
        else
        return(
            <div></div>
        );
    }

    function RenderDish({dish}){
        return(
            <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.image}></CardImg>
                        <CardBody>
                            <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            </div>
        )
    }
    
    function RenderComments({comments}){
        if(comments != null)
            return(
                <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return(
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',{year : 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                            </li>
                        )
                    })}
                    </ul>
                </div>);
            else
                return(
                    <div></div>
                );
    }

export default DishdetailComponent 