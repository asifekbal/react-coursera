import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import DishdetailComponent from './DishdetailComponent ';
import MenuComponent from './MenuComponent';
import { DISHES } from '../shared/dishes';

class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
       dishes : DISHES,
       selectedDish : null
    }
  }
  
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <MenuComponent dishes={this.state.dishes} onClick={(dishId)=>this.onDishCLickHandler(dishId)}></MenuComponent>
        <DishdetailComponent dish={this.state.dishes.filter((dish) => dish.id===this.state.selectedDish)[0]}></DishdetailComponent>
      </div>
    );
  }
  onDishCLickHandler = (dishId)=>{
    this.setState({
        selectedDish : dishId
    })
}
}

export default MainComponent;
