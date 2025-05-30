import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Error from "./Components/Error";
import CountryDetail from "./Components/CountryDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/:country",
                element: <CountryDetail />,                
            },
        ]
    },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
