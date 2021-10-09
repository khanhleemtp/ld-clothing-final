import './App.css';
import { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import HomePage from './pages/homepage/homepage.component';
import Spinner from './components/with-spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import { GlobalStyle } from './global.styles';

const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const ContactPage = lazy(() =>
  import('./pages/contact/contact-page.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  console.log('currentUser: ', currentUser);
  return (
    <>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
