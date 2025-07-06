import { cartContext } from "@/Context/context";
import type { Product } from "@/types/ProductList";
import { useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

type OutletContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  searchQuery: string;
};

const Home = () => {
  const { products, searchQuery } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const cart = useContext(cartContext);

  const handleCardClick = (id: number) => {
    navigate(`/productDetails/${id}`);
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trcss = "text-lg text-orange-400 font-bold";

  const AddToCart = (product: Product) => {
    cart.setProductInCart((prev) => [...prev, product]);
    alert("Added to cart");
    console.log([...cart.productInCart, product]);
  };

  useEffect(() => {
    console.log("Cart updated:", cart.productInCart);
  }, [cart.productInCart]);

  return (
    <section id="home" className="bg-gray-50 py-10 mt-24 z-10">
      <div className="w-5/6 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>

        {products.length === 0 ? (
          <p className="text-center">NO PRODUCTS AVAILABLE YET</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div className="border-2 border-b-slate-600 bg-fuchsia-100 p-3 rounded shadow hover:bg-fuchsia-200 transition ">
                <div>
                  <div
                    className=" flex items-center cursor-pointer "
                    key={product.id}
                    onClick={() => handleCardClick(product.id)}
                  >
                    <div>
                      <img
                        src={`http://localhost:8080/api/products/${product.id}/image`}
                        alt={product.name}
                        className="rounded size-40 p-4"
                      />
                    </div>
                    <div>
                      <table>
                        <tr>
                          <td className={`${trcss}`}>Name :</td>
                          <td>
                            <span className="text-black">{product.name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className={`${trcss}`}>Price :</td>
                          <td>
                            <span className="text-black">{product.price}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className={`${trcss}`}>Brand :</td>
                          <td>
                            <span className="text-black">{product.brand}</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <button
                    className="w-1/4 bg-purple-700 hover:bg-yellow-500 text-white font-semibold py-1 rounded transition "
                    onClick={() => AddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
