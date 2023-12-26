import { IProductData } from "../types";
import { ADDRESS_SERVER } from "./contants";


export const buyProduct = (idShop: number, listProduct: IProductData[]):Promise<number> => {
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS_SERVER}/Server`, {
            method: "post",
            body: JSON.stringify({ 
                "Type": "BUY_PRODUCTS",
                "IdShop": idShop,
                "Products": listProduct
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