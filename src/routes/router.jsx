import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import UserProfile from "../components/UserProfile/UserProfile";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import CreatePartner from "../pages/CreatePartner/CreatePartner";
import FindPartners from "../pages/FindPartners/FindPartners";
import PartnerDetails from "../pages/PartnerDetails/PartnerDetails";
import MyConnections from "../pages/MyConnections/MyConnections";
import PrivateRoute from "./privateRoute/PrivateRoute";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

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
                element: <PrivateRoute>
                    <UserProfile></UserProfile>
                </PrivateRoute>
            },
            {
                path: '/create-partner',
                element: <PrivateRoute>
                    <CreatePartner></CreatePartner>
                </PrivateRoute>
            },
            {
                path: '/partners',
                Component: FindPartners
            },
            {
                path: '/partners/:id',
                element: <PartnerDetails></PartnerDetails>
            },
            {
                path: "/connections",
                element: <PrivateRoute>
                    <MyConnections></MyConnections>
                </PrivateRoute>
            },
            {
                path: "/about",
                Component: About
            },
            {
                path: "/contact",
                Component: Contact
            }
        ]
    },
    {
        path: "*",
        Component: NotFound
    }
])
export default router;