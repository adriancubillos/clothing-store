import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './App.css';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import CheckoutPage from './pages/checkout/checkout.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

const HatsPage = () => (
  <div>
    <h1>HATS page</h1>
  </div>
);

const JacketsPage = () => (
  <div>
    <h1>JACKETS page</h1>
  </div>
);

const NotFound = () => (
  <div>
    <h1>NOT FOUND!</h1>
    <Link to='/'>Home</Link> |{' '}
  </div>
);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { onSetCurrentUser } = this.props;
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          onSetCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        }
      } else {
        onSetCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const element = this.props.currentUser ? (
      <Navigate replace to='/' />
    ) : (
      <SignInAndSignUpPage />
    );

    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={element} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='shop/hats' element={<HatsPage />} />
          <Route path='shop/jackets' element={<JacketsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
