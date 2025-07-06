import { cartContext } from "@/Context/context";
import { useContext } from "react";

const AddToCart = () => {
  const { productInCart, setProductInCart } = useContext(cartContext);

  const handleRemove = (id: number) => {
    setProductInCart((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Your Cart
        </h1>

        {productInCart.length === 0 ? (
          <p className="text-center text-lg text-purple-600">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="space-y-4">
            {productInCart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden border border-purple-200 hover:shadow-lg transition p-4"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-purple-900 mb-1">
                    {product.name}
                  </h2>
                  <div className="flex gap-6 ">
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Brand : </span>
                      {product.brand}
                    </p>
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Category : </span>
                      {product.category}
                    </p>
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Price : ₹</span>
                      {product.price}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition w-full sm:w-auto"
                  >
                    Remove from Cart
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

export default AddToCart;
