import { IProduct } from "../types"
import { ADDRESS_SERVER } from "./contants"

export const getListProductsByPrice = (idShop: number, price: number):Promise<IProduct[]> => {
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS_SERVER}/Server`, {
            method: "post",
            body: JSON.stringify({ 
                "Type": "GET_PRODUCTS_BY_PRICE",
                "IdShop": idShop,
                "Price": price
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