import React, {Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import {DISHES} from './shared/dishes'
import MenuComponent from './components/MenuComponent';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dishes : DISHES
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
        <MenuComponent dishes={this.state.dishes}></MenuComponent>
      </div>
    );
  }
}

export default App;
