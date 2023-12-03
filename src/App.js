import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root";
import ShopPage from "./pages/Shop";
import DetailPage from "./pages/Detail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";
import RegisterPage from "./pages/Register";
import HomeAllPage from "./pages/HomeAll";
import { loader as RootLoader } from "./pages/root";
import IphoneProduct from "./component/Shop/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <HomeAllPage />,
        id: "home",
      },
      {
        path: "shop",
        element: <ShopPage />,
        id: "shop",
        children: [{ path: ":shopId", element: <IphoneProduct /> }],
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
      },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
