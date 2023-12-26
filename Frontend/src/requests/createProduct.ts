import { ADDRESS_SERVER } from "./contants"

export const createProduct = (name: string) => {
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS_SERVER}/Server`, {
            method: "post",
            body: JSON.stringify({ 
                "Type": "ADD_PRODUCT",
                "NameProduct": name
            }),
        }).then((res)=>{
            resolve(true)
        }).catch((e)=>{
            // alert("Ошибка HTTP: " + e)
            reject("Ошибка HTTP: " + e);
        })
    })
}