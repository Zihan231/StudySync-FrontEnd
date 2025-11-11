import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import UserProfile from "../components/UserProfile/UserProfile";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import CreatePartner from "../pages/CreatePartner/CreatePartner";

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/profile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/create-partner',
                Component: CreatePartner
            }
        ]
    },
    {
        path: "*",
        Component: NotFound
    }
])
export default router;