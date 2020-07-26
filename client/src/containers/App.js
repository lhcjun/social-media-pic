import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from '../components/navigation/navigation.component';
import HomePage from '../pages/homepage/homepage.component';
import ProfilePage from '../pages/profile-page/profile-page.component';
import SignInPage from '../pages/sign-in-page/sign-in-page.component';
import SignUpPage from '../pages/sign-up-page/sign-up-page.component';
import CreatePostPage from '../pages/create-post-page/create-post-page.component';
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
