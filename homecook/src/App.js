import React from 'react';
import './App.css';
import SignInSide from './components/Pages/SignIn'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import UserPage from './components/Pages/UserPage'

function App() {
  return (
    <Router>
      <div>
       
        <Route exact path= {[ "/", "signin"]} component={SignInSide} />
        <Route exact path="/User" component={UserPage} />
        
        
      </div>
    </Router>
  );
}

export default App;
