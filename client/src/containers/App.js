import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from '../components/navigation/navigation.component';
import HomePage from '../pages/homepage/homepage.component';
import ProfilePage from '../pages/profile/profile.component';
import SignInPage from '../pages/signIn/signIn.component';
import SignUpPage from '../pages/signUp/signUp.component';
import CreatePostPage from '../pages/createPost/createPost.component';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact={true} path='/'>       
          <HomePage />
        </Route>
        <Route exact path='/profile'>       
          <ProfilePage />
        </Route>
        <Route exact path='/signin'>
          <SignInPage />
        </Route>
        <Route exact path='/signup'>
          <SignUpPage />
        </Route>
        <Route exact path='/createpost'>
          <CreatePostPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
