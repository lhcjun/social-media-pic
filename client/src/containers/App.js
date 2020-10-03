import React, { useEffect, useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { ModalProvider } from '../contexts/modal/modal.context';

import Navigation from '../components/navigation/navigation.component';
import Spinner from '../components/spinner/spinner.component';
import ErrorBoundary from '../components/error-boundary/error-boundary.component';
import { setCurrentUser } from '../reducers/user/user.reducer';
import UserContext from '../contexts/user/user.context';
import './App.css';

// code splitting > lazy component
const HomePage = lazy(() => import('../pages/homepage/homepage.component'));
const SignInPage = lazy(() => import('../pages/sign-in-page/sign-in-page.component'));
const SignUpPage = lazy(() => import('../pages/sign-up-page/sign-up-page.component'));
const CreatePostPage = lazy(() => import('../pages/create-post-page/create-post-page.component'));
const ProfilePage = lazy(() => import('../pages/profile-page/profile-page.component'));
const UserProfilePage = lazy(() => import('../pages/user-profile-page/user-profile-page.component'));
const PostPage = lazy(() => import('../pages/post-page/post-page.component'));
const EmptyPostPage = lazy(() => import('../pages/empty-post-page/empty-post-page.component'));
const EditPage = lazy(() => import('../pages/edit-page/edit-page.component'));
const ResetPasswordPage = lazy(() => import('../pages/reset-password-page/reset-password-page.component'));
const NewPasswordPage = lazy(() => import('../pages/new-password-page/new-password-page.component'));
const LikedPostPage = lazy(() => import('../pages/liked-post-page/liked-post-page.component'));
const SavedPostPage = lazy(() => import('../pages/saved-post-page/saved-post-page.component'));


const App = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext); // get the value passed by the nearest Context.Provider
  const { user } = state; // to get current state in reducer

  useEffect(() => {
    // check if user has signed in
    const currentUser = JSON.parse(sessionStorage.getItem('user')); // can only store string
    if (currentUser) {
      dispatch(setCurrentUser(currentUser)); // wrapped in dispatch
    } else {
      if(!history.location.pathname.startsWith('/reset-password')){
        history.push('/signin');
      }
    }
  }, [dispatch, history]); // componentDidMount

  return (
    <ModalProvider>
      <Router>
        <Navigation />
        <ErrorBoundary>
          <Suspense fallback={<Spinner size='large' />}>
            <Switch>
              <Route exact={true} path='/'>
                {user ? <HomePage /> : <Redirect to='/signin' />}
              </Route>
              <Route exact path='/signin'>
                {user ? <Redirect to='/' /> : <SignInPage />}
              </Route>
              <Route exact path='/signup'>
                {user ? <Redirect to='/' /> : <SignUpPage />}
              </Route>
              <Route exact path='/createpost'>
                {user ? <CreatePostPage /> : <Redirect to='/signin' />}
              </Route>
              <Route exact path='/profile'>
                {user ? <ProfilePage /> : <Redirect to='/signin' />}
              </Route>
              <Route path='/profile/:userId'>
                <UserProfilePage />
              </Route>
              <Route path='/post/:postId'>
                {user ? <PostPage /> : <Redirect to='/signin' />}
              </Route>
              <Route exact path='/empty'>
                <EmptyPostPage />
              </Route>
              <Route exact path='/edit'>
                {user ? <EditPage /> : <Redirect to='/signin' />}
              </Route>
              <Route exact path='/reset-password'>
                <ResetPasswordPage />
              </Route>
              <Route path='/reset-password/:token'>
                <NewPasswordPage />
              </Route>
              <Route exact={true} path='/liked-post'>
                {user ? <LikedPostPage /> : <Redirect to='/signin' />}
              </Route>
              <Route exact={true} path='/saved-post'>
                {user ? <SavedPostPage /> : <Redirect to='/signin' />}
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ModalProvider>
  );
};

export default App;
