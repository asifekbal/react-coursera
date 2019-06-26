import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishdetailComponent from './DishdetailComponent ';

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
                <DishdetailComponent dish={this.state.selectedDish}></DishdetailComponent>
            </div>
        )
    }

    onDishCLickHandler = (dish)=>{
        this.setState({
            selectedDish : dish
        })
    }
}
