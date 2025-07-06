import { createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Home from "./scenes/home";
import Details from "./scenes/Details";
import AddProduct from "./scenes/AddProduct";
import UpdateProduct from "./scenes/UpdateProduct";
import AddToCart from "./scenes/Cart";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="productDetails/:productId" element={<Details />} />
    <Route path="addProduct" element={<AddProduct />} />
    <Route path="updateProduct/:productId" element={<UpdateProduct />} />
    <Route path="cart" element={<AddToCart />} />
  </Route>
);

export default routes;
