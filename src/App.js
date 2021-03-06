import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Homepage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shop/shop.component";
import { connect } from "react-redux";
import { createStructuredSelector} from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { setCurrentUser } from "./redux/user/user.actions";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";


class App extends React.Component {
    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
          if( userAuth ){ // if the userObj is not 'null'
           const userRef = await createUserProfileDocument(userAuth);

           // basically means 'on state change'
           userRef.onSnapshot(snapShot => {
                setCurrentUser({
                      id: snapShot.id,
                      ...snapShot.data()
                  })
           });
          }
          // if current user signs out
         setCurrentUser( userAuth )
        });
    }

    componentWillUnmount() {
        //unmount
        this.unsubscribeFromAuth();
    }

    render() {

        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path="/signin" render={() =>
                        this.props.currentUser ? (<Redirect to='/' />)
                            : (<SignInAndSignUpPage />) }/>
                </Switch>
            </div>
        );
    }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
