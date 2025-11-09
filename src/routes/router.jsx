import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const router = createBrowserRouter([{
    path: '/',
    Component: HomeLayout,
    children: [
        {
            index: true,
            element: <div>Bal</div>
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path: '/register',
            Component: Register
        }
    ]
}])
export default router;