import NotFound from "../components/404/NotFound";
import ManagePage from "../components/layout/admin/ManagePage";
import Login from "../components/login/Login";
import Registration from "../components/registration/Registration";
import ProfilePage from "../components/layout/admin/ProfilePage"

const adminRoutes = [
    {
        path: "/",
        element: <ManagePage />
    },
    {
        path: "*",
        element: <NotFound />
    }
];

const userRoutes = [
    {
        path: "/",
        element: <ManagePage />
    },
    {
        path: "*",
        element: <NotFound />
    }
];

const publicRoutes = [
    {
        path: "/",
        element: <ManagePage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/registration",
        element: <Registration />
    },
    {
        path: "*",
        element: <NotFound />
    }
]

export  {adminRoutes, userRoutes, publicRoutes}