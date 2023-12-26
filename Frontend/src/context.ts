import { useContext, createContext } from "react";
import { IProduct, IShop } from "./types";

export interface IShopContext{
    shops: IShop[];
    setShops: (v: IShop[])=> void;
    products: IProduct[];
    setProducts: (v: IProduct[])=>void;
}

export const ShopsContext = createContext<IShopContext>({
    shops:[], 
    setShops: ()=>{},
    products: [],
    setProducts: ()=>{}
});
export const useShopsContext = () => useContext(ShopsContext);