import { IProductData, IShopByListProducts } from "../types"
import { ADDRESS_SERVER } from "./contants"

export const getShopWithListCheapProducts = (products: IProductData[]): Promise<IShopByListProducts> => {
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS_SERVER}/Server`, {
            method: "post",
            body: JSON.stringify({ 
                "Type": "GET_SHOP_WITH_CHEAP_LIST_PRODUCT",
                "Products": products
            }),
        }).then((res)=>{
            if(res.ok){
                resolve(res.json())
            }
            
        }).catch((e)=>{
            // alert("Ошибка HTTP: " + e)
            reject("Ошибка HTTP: " + e);
        })
    })
}