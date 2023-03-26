import NotFound from "../components/404/NotFound";
import ManagePage from "../components/layout/ManagePage";
import Login from "../components/login/Login";
import { Register } from "../components/registration/Register";
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
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <NotFound />
    }
]

export  {privateRoutes, publicRoutes}