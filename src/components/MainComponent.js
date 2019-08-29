import React, { Component } from 'react';
import DishdetailComponent from './DishdetailComponent ';
import MenuComponent from './MenuComponent';
import { DISHES } from '../shared/dishes';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';


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
        <HeaderComponent></HeaderComponent>
        <MenuComponent dishes={this.state.dishes} onClick={(dishId)=>this.onDishCLickHandler(dishId)}></MenuComponent>
        <DishdetailComponent dish={this.state.dishes.filter((dish) => dish.id===this.state.selectedDish)[0]}></DishdetailComponent>
        <FooterComponent></FooterComponent>
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
