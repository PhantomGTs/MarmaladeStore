import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { useShopsContext } from "../context";
import { ChangeEvent, useCallback, useState } from "react";
import { IProduct } from "../types";
import { getListProductsByPrice } from "../requests/getListProductsByPrice";
import { ProductCard } from "../components/ProductCard";
import { SelectShop } from "../components/SelectShop";

export const GetListProductsByPrice = () => {
    const [shop, setShop] = useState<number|undefined>();

    const [summ, setSumm] = useState<number|undefined>();
    const handleChangeSumm = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSumm(e.target.value ? +e.target.value : undefined)
    },[setSumm]);

    const [res, setRes] = useState<IProduct[]|undefined>();
console.log(res)
    const onGetListProducts = useCallback(()=>{
        if(!shop || !summ){
            return;
        }
        getListProductsByPrice(shop, summ).then((res)=>{
            setRes(res);

        })

    },[shop, summ]);

    return (
        <Stack spacing={2}>
            <SelectShop shop={shop} setShop={setShop} />

            <TextField 
                size="small" 
                type="number" 
                label="Сумма покупки" 
                value={summ ?? ""} 
                onChange={handleChangeSumm}
            />
            <Button variant="contained" onClick={onGetListProducts} disabled={!shop || !summ} >Найти товары</Button>

            {
                (res && res.length) ?
                    res.map((item)=> <ProductCard key={item.ID} name={item.Name} count={item.Count} />)
                    : (res && !res.length) ?
                    <Typography sx={{color:'white'}}>Товары не найдены</Typography>
                    : null
            }

        </Stack>
    )
}