import React from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>HATS page</h1>
  </div>
);

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
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop/hats' element={<HatsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
