import React, { Component } from 'react'
// import {Media} from 'reactstrap'
import {Card, CardImg, CardImgOverlay,CardText, CardBody, CardTitle} from 'reactstrap'

export default class MenuComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            selectedDish : null
        }
    }
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=>this.onDishCLickHandler(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.image}></CardImg>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        )
    }

    onDishCLickHandler = (dish)=>{
        this.setState({
            selectedDish : dish
        })
    }
    
    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.image}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        } else{
            return(
                <div></div>
            );
        }
    }
}
