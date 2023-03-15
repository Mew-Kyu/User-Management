import NotFound from "../components/404/NotFound";
import Login from "../components/login/Login";

const privateRoutes = [
    {
        path: "*",
        element: <NotFound />
    }
];

const publicRoute = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "*",
        element: <NotFound />
    }
]

export  {privateRoutes, publicRoute}