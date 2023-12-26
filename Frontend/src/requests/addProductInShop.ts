import { IProductsShop } from "../types"
import { ADDRESS_SERVER } from "./contants"

export const addProductInShop = (products: IProductsShop[]) => {
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS_SERVER}/Server`, {
            method: "post",
            body: JSON.stringify({ 
                "Type": "ADD_PRODUCT_IN_SHOP",
                "Products": products
            }),
        }).then((res)=>{
            resolve(true)
        }).catch((e)=>{
            // alert("Ошибка HTTP: " + e)
            reject("Ошибка HTTP: " + e);
        })
    })
}