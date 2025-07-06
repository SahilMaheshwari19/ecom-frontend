import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./scenes/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "./types/ProductList";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <div className="text-center mt-40 text-purple-700 text-xl">
          Loading Products
        </div>
      ) : (
        <Outlet context={{ products, setProducts, searchQuery }} />
      )}
    </>
  );
}

export default App;
