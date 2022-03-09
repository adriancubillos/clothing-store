import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

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
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        }
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignInAndSignUpPage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='shop/hats' element={<HatsPage />} />
          <Route path='shop/jackets' element={<JacketsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;
