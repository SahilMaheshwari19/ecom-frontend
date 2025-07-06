import type { Product } from "@/types/ProductList";
import { createContext } from "react";

type cartContextType = {
    productInCart : Product[];
    setProductInCart : React.Dispatch<React.SetStateAction<Product[]>>;
}

export const cartContext = createContext<cartContextType>({
    productInCart : [],
    setProductInCart : () => {},
});