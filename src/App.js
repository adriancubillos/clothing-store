import React from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

const NotFound = () => (
  <div>
    <h1>NOT FOUND!</h1>
    <Link to='/'>Home</Link> |{' '}
  </div>
);

function App() {
  let location = useLocation();
  console.log(location);

  let params = useParams();
  console.log(params);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
