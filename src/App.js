import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Homepage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
          if( userAuth ){ // if the userObj is not 'null'
           const userRef = await createUserProfileDocument(userAuth);

           // basically means 'on state change'
           userRef.onSnapshot(snapShot => {
              this.setState( {
                  currentUser: {
                      id: snapShot.id,
                      ...snapShot.data()
                  }
              })

           });


          }
          // if current user signs out
          this.setState({ currentUser: userAuth })
        });
    }

    componentWillUnmount() {
        //unmount
        this.unsubscribeFromAuth();
    }

    render() {

        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }

}

export default App;
