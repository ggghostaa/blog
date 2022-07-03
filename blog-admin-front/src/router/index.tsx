import Login from '../page/Login/index';
import Home from '../page/Home/Index'
import ArticleMgr from "../components/article/ArticleMgr";
import ArticleForm from "../components/article/ArticleForm";
import TagMgr from "../components/article/TagMgr";
import CategoryMgr from "../components/article/CategoryMgr";
import ImageMgr from "../components/file/ImageMgr";
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
            },
            {
                path: 'tagMgr',
                element: <TagMgr />
            },
            {
                path: 'categoryMgr',
                element: <CategoryMgr />
            },
            {
                path: 'imgMgr',
                element: <ImageMgr />
            }
        ]
    },
]

export {routes}