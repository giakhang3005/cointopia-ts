import { createBrowserRouter } from "react-router-dom";
import Homepage from "./layout/Homepage";
import CoinInfo from "./layout/CoinInfo/CoinInfo";
import Layout from "./layout/Layout";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // All children will be shown as it route called in <Outlet /> of Layout
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/:coinId",
                element: <CoinInfo />,
            },
        ]
    },
])