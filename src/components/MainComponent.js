import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import AboutComponent from './AboutComponent';
import ContactComponent from './ContactComponent';
import DishdetailComponent from './DishdetailComponent ';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponent from './MenuComponent';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators'


const mapStoreToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});
class MainComponent extends Component {

  render() {

    const HomePage = () => {
      return (
        <HomeComponent dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          addComment={this.props.addComment}
        ></DishdetailComponent>
      )
    }

    return (
      <div>
        <HeaderComponent />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <MenuComponent dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={ContactComponent} />
          <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <FooterComponent />
      </div>
    );
  }
  onDishCLickHandler = (dishId) => {
    this.setState({
      selectedDish: dishId
    })
  }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(MainComponent));
