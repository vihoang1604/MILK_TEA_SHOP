import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <>
        <ToastContainer />
        <Router>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/login" name="Login Page" component={Login} />
                <Route exact path="/register" name="Register Page" component={Register} />
                <Route exact path="/404" name="Page 404" component={Page404} />
                <Route exact path="/500" name="Page 500" component={Page500} />
                <Route path="/" name="Home" component={DefaultLayout} />
              </Switch>
            </React.Suspense>
        </Router>
      </>
    );
  }
}

export default App;
