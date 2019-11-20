export default {
    items: [{
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
                text: 'NEW',
            },
        },
        {
            title: true,
            name: 'Managements',
            wrapper: {
                element: '',
                attributes: {}
            },
            class: ''
        },
        {
            name: 'Category',
            url: '/categories',
            icon: 'fas fa-stream',
        },
        {
            name: 'Product',
            url: '/products',
            icon: 'fas fa-th-list',
        },
        {
            name: 'Order',
            url: '/orders',
            icon: 'fas fa-shopping-cart',
        },
        {
            name: 'User',
            url: '/users',
            icon: 'fas fa-users',
        },
        {
            title: true,
            name: 'Statistics',
            wrapper: {
                element: '',
                attributes: {}
            },
            class: ''
        },
        {
            name: 'Revenue',
            url: '/revenues',
            icon: 'fas fa-wallet',
        },
    ],
};