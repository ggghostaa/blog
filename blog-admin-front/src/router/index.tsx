import Login from '../page/Login/index';
import Home from '../page/Home/Index'
import ArticleMgr from "../components/article/ArticleMgr";
import ArticleForm from "../components/article/ArticleForm";
const routes =  [
    {
        path: '/login',
        element: <Login />,
        name: '登录'
    },
    {
        path: '/*',
        element: <Home />,
        name: '主页',
        children: [
            {
                path:'articleMgr',
                element: <ArticleMgr />
            },
            {
                path: 'articleForm',
                element: <ArticleForm />
            }
        ]
    }
]

export {routes}