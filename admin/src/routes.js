import React from 'react';

const Dashboard = React.lazy(() =>
    import('./views/Dashboard'));
const Category = React.lazy(() =>
    import('./views/Category/CategoryList/CategoryList'));
const Product = React.lazy(() =>
    import('./views/Product/ProductList/ProductList'));
const Order = React.lazy(() =>
    import('./views/Order/OrderList/OrderList'));
const User = React.lazy(() =>
    import('./views/User/UserList'));



const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/categories', name: 'Category', component: Category },
    { path: '/products', name: 'Product', component: Product },
    { path: '/orders', name: 'Order', component: Order },
    { path: '/users', name: 'User', component: User }
];

export default routes;
