import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "@/types/ProductList";

const Details = () => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Product>(`http://localhost:8080/api/products/${productId}`)
      .then((response) => {
        setProductDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching product with product id : ",
          productId,
          error
        );
        setLoading(false);
      });
  }, [productId]);

  const handleUpdate = (id: number) => {
    navigate(`/updateProduct/${id}`);
    // alert(`Updating product with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      axios.delete(`http://localhost:8080/api/product/${id}`);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-semibold text-purple-600 animate-pulse">
            Loading Product...
          </p>
        </div>
      </>
    );
  }

  if (!productDetail) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-semibold text-red-500">
            Product not found.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section
        id="details"
        className="bg-gradient-to-b from-slate-200 via-slate-400 to-slate-900 min-h-screen pt-28 pb-10 flex justify-center"
      >
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={`http://localhost:8080/api/products/${productDetail.id}/image`}
              alt={productDetail.name}
              className="rounded-xl max-h-[400px] object-contain shadow-md"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-purple-800">
              {productDetail.name}
            </h1>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-purple-700">Brand:</span>{" "}
              {productDetail.brand}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-purple-700">Category:</span>{" "}
              {productDetail.category}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-purple-700">
                Description:
              </span>{" "}
              {productDetail.description}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-purple-700">Available:</span>{" "}
              {productDetail.available ? "Yes" : "No"}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-purple-700">
                Release Date:{" "}
              </span>{" "}
              {productDetail.releaseDate
                ? new Date(productDetail.releaseDate).toLocaleDateString(
                    "en-GB"
                  )
                : ""}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-purple-700">Price:</span> ₹{" "}
              {productDetail.price}
            </p>
            <div className="flex gap-4">
              <button
                className="w-full mt-4 bg-purple-700 hover:bg-yellow-500 text-white font-semibold py-2 rounded transition"
                onClick={() => handleUpdate(productDetail.id)}
              >
                Update
              </button>
              <button
                className="w-full mt-4 bg-purple-700 hover:bg-red-500 text-white font-semibold py-2 rounded transition"
                onClick={() => handleDelete(productDetail.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
