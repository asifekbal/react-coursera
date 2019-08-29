import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import { DISHES } from '../shared/dishes';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import {Switch, Route,Redirect} from 'react-router-dom'
import HomeComponent from './HomeComponent';


class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
       dishes : DISHES
    }
  }
  
  render() {

    const HomePage = () => {
      return (
        <HomeComponent/>
      )
    }
    
    return (
      <div>
        <HeaderComponent/>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact="/menu" component={()=> <MenuComponent dishes={this.state.dishes}/>} />
            <Redirect to ="/home"/>
          </Switch>
        <FooterComponent/>
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
