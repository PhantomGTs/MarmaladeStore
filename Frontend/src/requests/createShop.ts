import { ADDRESS_SERVER } from "./contants";

export function createShop(name: string, address: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS_SERVER}/Server`, {
            method: "post",
            body: JSON.stringify({ 
                "Type": "ADD_SHOP",
                "NameShop": name,
                "AddressShop": address
            }),
        }).then((res)=>{
            resolve(true)
        }).catch((e)=>{
            // alert("Ошибка HTTP: " + e)
            reject("Ошибка HTTP: " + e);
        })
    })
}