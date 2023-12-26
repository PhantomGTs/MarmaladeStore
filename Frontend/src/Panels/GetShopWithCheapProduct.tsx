import { useCallback, useEffect, useState } from "react";
import { useShopsContext } from "../context";
import { getProducts } from "../requests/getProducts";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { IShop } from "../types";
import { getShopWithCheapProduct } from "../requests/getShopWithCheapProduct";
import { ModalGettingShop } from "../components/ModalGettingShop";

export const GetProductWithCheapProduct = () => {
    const {products, setProducts} = useShopsContext();
    useEffect(()=>{
        if(products.length){
            return;
        }
        getProducts().then((res)=>{
            setProducts(res);
        })
    }, [products, setProducts])

    const [selected, setSelected] = useState<number|undefined>();
    const handleChange = useCallback((event: SelectChangeEvent)=>{
        setSelected(+event.target.value);
    },[setSelected]);


    const [result, setResult] = useState<IShop|null>(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const onCloseModal = useCallback(()=>{
        setIsShowModal(false);
        setResult(null);
    },[]);

    const onGetShop = useCallback(()=>{
        if(!selected){
            return;
        }
        getShopWithCheapProduct(selected).then((res)=>{
            setResult(res);
            setSelected(undefined);
        })
        setIsShowModal(true);
    },[selected]);

    return (
        <Stack spacing={2}>
            <FormControl variant="standard" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Товар</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selected?.toString() || ""}
                    onChange={handleChange}
                    label="Магазин"
                >
                    {
                        products.map((item)=>
                            <MenuItem key={item.ID} value={item.ID}>{item.Name}</MenuItem>
                        )
                    }
                
                </Select>
            </FormControl>
            
            <Button variant="contained" onClick={onGetShop} disabled={!selected} >Найти магазин</Button>

            <ModalGettingShop open={isShowModal} shop={result} handleClose={onCloseModal} />
        </Stack>
    )
}