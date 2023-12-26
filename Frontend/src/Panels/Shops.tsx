import { useEffect, useState } from "react";
import { getShops } from "../requests/getShops";
import { IShop } from "../types";
import { Stack } from "@mui/material";
import { ShopCard } from "../components/ShopCard";
import { useShopsContext } from "../context";
import { ShopItem } from "../components/ShopItem";

export const Shops = () => {
    const {shops, setShops} = useShopsContext();

    const [selectedShop, setSelectedShop] = useState<IShop|null>(null);


    useEffect(()=>{
        if(shops.length){
            return;
        }
        getShops().then((res)=>{
            setShops(res);
        })
    })
    
    return selectedShop ?
    <ShopItem shop={selectedShop} onToBack={()=>{setSelectedShop(null)}} /> : 
    (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{ overflowY: "auto"}}
        >
            {
                shops.map((item)=> <ShopCard key={item.ID} shop = {item} setShop={setSelectedShop} />)
            }
        </Stack>
    )
}