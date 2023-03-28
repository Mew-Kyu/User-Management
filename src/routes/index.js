import NotFound from "../components/404/NotFound";
import ManagePage from "../components/layout/ManagePage";
import Login from "../components/layout/login/Login";
import ProfilePage from "../components/layout/ProfilePage"

const privateRoutes = [
    {
        path: "/",
        element: <ManagePage />
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
];

const publicRoutes = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "*",
        element: <NotFound />
    }
]

export  {privateRoutes, publicRoutes}