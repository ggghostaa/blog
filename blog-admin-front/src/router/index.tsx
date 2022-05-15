import Login from '../page/Login/index';
import Home from '../page/Home/index'
const routes =  [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Home />
    }
]

export {routes}