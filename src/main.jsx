import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import Contact from "./Contact";
import Home from "./Home.jsx";
import ErrorPage from "./ErrorPage.jsx";
import SingleProduct from "./SingleProduct.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ThemeContext from "./Utility/ThemeContext";
import AppStore from "./Utility/AppStore";
import { Provider } from "react-redux";
import ProtectedRoute from "./Utility/ProtectedRoute.jsx";
// import Food from './Food.jsx'

let HomeProtected = ProtectedRoute(Home)
let AboutProtected = ProtectedRoute(About)
let CartProtected = ProtectedRoute(Cart)

let Food = lazy(() => import("./Food.jsx"));

let Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeProtected></HomeProtected>,
      },
      {
        path: "/about",
        element: <AboutProtected></AboutProtected>,
      },
      {
        path: "/cart",
        element: <CartProtected></CartProtected>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/product/:id",
        element: <SingleProduct></SingleProduct>,
      },
      {
        path: "/food",
        element: (
          <Suspense fallback={<h1> ....Loading </h1>}>
            <Food></Food>
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
  <ThemeContext>
  <RouterProvider router={Router}> </RouterProvider>
  </ThemeContext>
  </Provider>
);
