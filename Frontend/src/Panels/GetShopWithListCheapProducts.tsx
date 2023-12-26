import { Button, Checkbox, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material"
import { useShopsContext } from "../context";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../requests/getProducts";
import { IProduct, IProductData, IShop, IShopByListProducts } from "../types";
import { getShopWithListCheapProducts } from "../requests/getShopWithListCheapProducts";
import { ModalGettingShop } from "../components/ModalGettingShop";

export const GetShopWithListCheapProducts = () => {
    const {products, setProducts, setShops} = useShopsContext();
    const [checkedProducts, setCheckedProducts] = useState<number[]>([]);

    const [listProducts, setListProducts] = useState<IProduct[]>([]);

    useEffect(()=>{
        if(products.length){
            setListProducts(products);
            return;
        }
        getProducts().then((res)=>{
            setProducts(res);
            setListProducts(res.map(item=>({ ...item })))
        })
    }, [products, setProducts])

    const onChangeChecked = useCallback((id: number)=>{
        if(checkedProducts.indexOf(id) > -1){
            setCheckedProducts(checkedProducts.filter((item)=>item !== id))
        }else{
            setCheckedProducts([...checkedProducts, id])
        }
    },[checkedProducts]);

    const onChangeItemProduct = useCallback((id: number, count?: number)=>{
        setListProducts(prevState =>
            prevState.map(item =>
                  item.ID === id
                    ? { ...item, Count: count ? Math.abs(count) : undefined}
                    : item
            )    
        )

    },[listProducts])

    const [res, setRes] = useState<IShopByListProducts|null>(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const onCloseModal = useCallback(()=>{
        setIsShowModal(false);
        setRes(null);
    },[]);

    const onGetShop = useCallback(()=>{
        if(!listProducts.length){
            return;
        }
        const list:IProductData[] = [];
        listProducts.forEach((item)=>{
            if(checkedProducts.indexOf(item.ID) > -1){
                list.push({
                    IdProduct: item.ID,
                    Count: item.Count && item.Count > 0 ? item.Count : 0
                })
            }
        })
        getShopWithListCheapProducts(list).then((res)=>{
            setRes(res);
        })
        setIsShowModal(true);
    },[listProducts, checkedProducts]);

    return(
        <Stack spacing={2}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                    {
                        listProducts.map((pr)=>
                            <TableRow 
                                key={pr.ID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                <Checkbox
                                    checked={checkedProducts.indexOf(pr.ID) > -1}
                                    // disabled={!(pr.Count || pr.Count === 0)}
                                    onChange={()=>onChangeChecked(pr.ID)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                </TableCell>
                                <TableCell>{pr.Name}</TableCell>
                                <TableCell>
                                    <TextField 
                                        size="small" 
                                        type="number" 
                                        inputProps={{
                                            min: 0
                                        }}
                                        
                                        label="Колличество *" 
                                        value={pr.Count ?? ""} 
                                        onChange={(e)=>onChangeItemProduct(pr.ID, e.target.value ? +e.target.value : undefined)}
                                    />
                                </TableCell>

                            </TableRow>
                        )
                    }
                    </TableBody>
                </Table>
                
            </TableContainer>

            <Button variant="contained" onClick={onGetShop} disabled={!checkedProducts.length} >Найти магазин</Button>

            <ModalGettingShop open={isShowModal} shop={res?.Shop} summ={res?.Summ} handleClose={onCloseModal} />
        </Stack>
    )
}