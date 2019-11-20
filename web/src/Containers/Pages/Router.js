import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const HomePage = React.lazy(() => import('./HomePage/HomePage'));
const NotFound = React.lazy(() => import('./NotFound/NotFound'));
const Contacts = React.lazy(() => import('./Contacts/Contants'));
const Registration = React.lazy(() => import('./Registration/Register'));
const Login = React.lazy(() => import("./Login/Login"))
const ListProducts = React.lazy(() => import('./ListProducts/ListProducts'))
const Cart = React.lazy(() => import('./Cart/Cart'))
const Order = React.lazy(() => import('./Order/Order'))
const ManageOrders = React.lazy(() => import('./manageOrders/manageOrders'))
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route exact path="/" name="HomePage" render={props => <HomePage {...props} />} />
                        <Route path="/Registration" name="Registration" render={props => <Registration {...props} />} />
                        <Route path="/Login" name="Login" render={props => <Login {...props} />} />
                        <Route path="/Products" name="ListProducts" render={props => <ListProducts {...props} />} />
                        <Route path="/Contacts" name="Contacts" render={props => <Contacts {...props} />} />
                        <Route path="/Cart" name="Cart" render={props => <Cart {...props} />} />
                        <Route path="/Order" name="Order" render={props => <Order {...props} />} />
                        <Route path="/ManageOrders" name="ManageOrders" render={props => <ManageOrders {...props} />} />
                        <Route path="" name="NotFound" render={props => <NotFound {...props} />} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        )
    }
}
