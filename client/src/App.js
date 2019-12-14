import React from 'react';
import './App.css';
import SignInSide from './components/Pages/SignIn';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import UserPage from './components/Pages/UserPage';
import RegistrationSide from './components/Pages/Register';

function App() {
  return (
    <Router>
      <div>       
        <Route exact path= {[ "/", "/SignIn"]} component={SignInSide} />
        <Route exact path="/User" component={UserPage} />
        <Route exact path="/Register" component={RegistrationSide} />        
      </div>
    </Router>
  );
}

export default App;
