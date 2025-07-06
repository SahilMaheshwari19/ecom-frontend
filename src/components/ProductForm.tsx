import type { ProductDTO } from "@/types/ProductList";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: ProductDTO, imageFile: File | null) => void;
  defaultValues?: ProductDTO;
  buttonLabel?: string;
  requireImage?: boolean;
};

const ProductForm = ({
  onSubmit,
  defaultValues,
  buttonLabel = "Submit",
  requireImage = false,
}: Props) => {
  const inputStyles = `mb-4 w-full rounded-lg px-4 py-2 bg-blue-100 placeholder-purple-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductDTO>({ defaultValues });

  const onSubmitHandler = (data: ProductDTO) => {
    if (requireImage && !imageFile) {
      alert("Please upload an image before submitting.");
      return;
    }
    onSubmit(data, imageFile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {/* NAME */}
      <div>
        <label htmlFor="name" className="text-black font-semibold">
          Name:
        </label>
        <input
          id="name"
          className={inputStyles}
          type="text"
          placeholder="Product Name"
          {...register("name", { required: true, maxLength: 100 })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.type === "required" && "Name is required."}
            {errors.name.type === "maxLength" &&
              "Max length is 100 characters."}
          </p>
        )}
      </div>

      {/* BRAND */}
      <div>
        <label htmlFor="brand" className="text-black font-semibold">
          Brand:
        </label>
        <input
          id="brand"
          className={inputStyles}
          type="text"
          placeholder="Brand"
          {...register("brand", { required: true, maxLength: 20 })}
        />
        {errors.brand && (
          <p className="text-red-500 text-sm mt-1">
            {errors.brand.type === "required" && "Brand is required."}
            {errors.brand.type === "maxLength" &&
              "Max length is 20 characters."}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label htmlFor="description" className="text-black font-semibold">
          Description:
        </label>
        <input
          id="description"
          className={inputStyles}
          type="text"
          placeholder="Description"
          {...register("description", {
            required: true,
            maxLength: 1000,
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.type === "required" &&
              "Description is required."}
            {errors.description.type === "maxLength" &&
              "Max length is 1000 characters."}
          </p>
        )}
      </div>

      {/* PRICE */}
      <div>
        <label htmlFor="price" className="text-black font-semibold">
          Price(Rs) :
        </label>
        <input
          id="price"
          className={inputStyles}
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">Price is required.</p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <label htmlFor="category" className="text-black font-semibold">
          Category:
        </label>
        <input
          id="category"
          className={inputStyles}
          type="text"
          placeholder="Category"
          {...register("category", { required: true, maxLength: 20 })}
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.type === "required" && "Category is required."}
            {errors.category.type === "maxLength" &&
              "Max length is 20 characters."}
          </p>
        )}
      </div>

      {/* QUANTITY */}
      <div>
        <label htmlFor="quantity" className="text-black font-semibold">
          Stock Quantity:
        </label>
        <input
          id="quantity"
          className={inputStyles}
          type="number"
          placeholder="Quantity"
          {...register("quantity", { required: true, min: 0, max: 1000 })}
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.quantity.type === "required" && "Quantity is required."}
          </p>
        )}
      </div>

      {/* RELEASE DATE */}
      <div>
        <label htmlFor="releaseDate" className="text-black font-semibold">
          Release Date:
        </label>
        <input
          id="releaseDate"
          className={inputStyles}
          type="date"
          placeholder="Release Date"
          {...register("releaseDate", { required: true })}
        />
        {errors.releaseDate && (
          <p className="text-red-500 text-sm mt-1">Release date is required.</p>
        )}
      </div>
      {/* Image Upload */}
      <div>
        <label htmlFor="uploadImage" className="text-black font-semibold">
          Upload Image:
        </label>
        <input
          id="uploadImage"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }}
          className="mb-4 w-full rounded-lg px-4 py-2 bg-purple-100 placeholder-purple-400 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />
        {requireImage && !imageFile && (
          <p className="text-red-500 text-sm mt-1">Please upload an image.</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default ProductForm;
