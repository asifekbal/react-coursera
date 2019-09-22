import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import AboutComponent from './AboutComponent';
import ContactComponent from './ContactComponent';
import DishdetailComponent from './DishdetailComponent ';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponent from './MenuComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStoreToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (values) => dispatch(postFeedback(values)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});
class MainComponent extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return (
        <HomeComponent dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          postComment={this.props.postComment} commentsErrMess={this.props.comments.errMess}
        ></DishdetailComponent>
      )
    }

    return (
      <div>
        <HeaderComponent />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <MenuComponent dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={() => <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm}  postFeedback={this.props.postFeedback} />} />
              <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.props.leaders} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
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
