import { Button, Checkbox, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useShopsContext } from "../context";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../requests/getProducts";
import { IProduct, IProductsShop } from "../types";
import { addProductInShop } from "../requests/addProductInShop";
import { getShops } from "../requests/getShops";
import { SelectShop } from "../components/SelectShop";

export const AddProductInShop = () => {
    const { products, setProducts, setShops } = useShopsContext();
    const [shop, setShop] = useState<number | undefined>();
    const [listProducts, setListProducts] = useState<IProduct[]>([]);
    const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
    const [deleteButtonsState, setDeleteButtonsState] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (products.length) {
            setListProducts(products);
            return;
        }
        getProducts().then((res) => {
            setProducts(res);
            setListProducts(res.map(item => ({ ...item })))
        })
    }, [products, setProducts])

    const onChangeChecked = useCallback((id: number) => {
        if (checkedProducts.indexOf(id) > -1) {
            setCheckedProducts(checkedProducts.filter((item) => item !== id))
        } else {
            setCheckedProducts([...checkedProducts, id])
        }
    }, [checkedProducts]);

    const onChangeItemProduct = useCallback((id: number, count?: number, price?: number) => {
        setListProducts(prevState =>
            prevState.map(item =>
                item.ID === id
                    ? { ...item, Count: count ? Math.abs(count) : undefined, Price: price ? Math.abs(price) : undefined }
                    : item
            )
        )
    }, [listProducts]); //test it


    const onAddProductsInShop = useCallback(() => {
        if (!shop || !listProducts.length || !checkedProducts.length) {
            return;
        }
        const list: IProductsShop[] = [];
        listProducts.forEach((item) => {
            if (checkedProducts.indexOf(item.ID) > -1) {
                list.push({
                    IdShop: shop,
                    IdProduct: item.ID,
                    CountProduct: item.Count || 0,
                    PriceProduct: item.Price || 0
                })
            }
        });

        addProductInShop(list);
        setShop(undefined);
        setCheckedProducts([]);
        getShops().then((res) => {
            setShops(res);
        })
    }, [listProducts, checkedProducts, shop, setShops]);

    const onDeleteCheckedProducts = useCallback(() => {
        setListProducts(prevState =>
            prevState.filter(item => checkedProducts.indexOf(item.ID) === -1)
        );
        setDeleteButtonsState({});
        setCheckedProducts([]);
    }, [checkedProducts]);

    const onToggleDeleteButton = useCallback((productId: number) => {
        setDeleteButtonsState(prevState => ({
            ...prevState,
            [productId]: !prevState[productId],
        }));
    }, []);

    return (
        <Stack spacing={2}>
            <SelectShop shop={shop} setShop={setShop} />

            <Typography sx={{ color: 'white' }}>Товары:</Typography>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {listProducts.map((pr) => (
                            <TableRow
                                key={pr.ID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={deleteButtonsState[pr.ID] ? 'selected' : ''}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={checkedProducts.indexOf(pr.ID) > -1}
                                        onChange={() => {
                                            onChangeChecked(pr.ID);
                                            onToggleDeleteButton(pr.ID);
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell>{pr.Name}</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        label="Количество *"
                                        value={pr.Count ?? ""}
                                        onChange={(e) => onChangeItemProduct(pr.ID, e.target.value ? +e.target.value : undefined, pr.Price)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        label="Цена"
                                        value={pr.Price ?? ""}
                                        onChange={(e) => onChangeItemProduct(pr.ID, pr.Count, e.target.value ? +e.target.value : undefined)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() => onDeleteCheckedProducts()}
                                        disabled={!deleteButtonsState[pr.ID]}
                                        sx={{ backgroundColor: deleteButtonsState[pr.ID] ? 'red' : 'grey', color: 'white' }}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" onClick={onAddProductsInShop} disabled={!shop || !listProducts.length || !checkedProducts.length} >Добавить товары</Button>
        </Stack>
    );
};
