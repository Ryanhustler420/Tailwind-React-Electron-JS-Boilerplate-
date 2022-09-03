const _ = require('lodash');

const routes = {
    "/login": {
        path: "/login",
        fallback: false,
    },
    "/register": {
        path: "/register",
        fallback: false,
    },
    "/product/:id": {
        path: "/product/:id",
        fallback: false,
    },
    "/company/:id": {
        path: "/company/:id",
        fallback: false,
    },
    "/settings": {
        path: "/settings",
        fallback: true,
    },
    "/mystocks": {
        path: "/mystocks",
        fallback: true,
    },
    "/library": {
        path: "/library",
        fallback: true,
    },
    "/": {
        path: "/",
        fallback: true,
    },
}

const allowToGoBackRoutes = (pathname) => !_.includes([routes['/'].path, routes['/settings'].path, routes['/mystocks'].path, routes['/library'].path, routes['/login'].path], pathname);
const getAnyRandomFallbackRoute = (currentRoute) => {
    const available = Object.values(routes).filter(e => e.fallback === true && e.path !== currentRoute);
    const goto = available[Math.floor(Math.random() * available.length)].path;
    return goto;
}

module.exports = {
    routes,
    allowToGoBackRoutes,
    getAnyRandomFallbackRoute
}