import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { SelectShop } from "../components/SelectShop";
import { useShopsContext } from "../context";
import { buyProduct } from "../requests/buyProducts";
import { ModalBuyProducts } from "../components/ModalBuyProducts";
import { IProduct, IProductData } from "../types";

export const BuyProducts = () => {
  const { shops } = useShopsContext();

  const [shop, setShop] = useState<number | undefined>();

  const [listProducts, setListProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const products = shops.find((item) => item.ID === shop)?.Products;
    setListProducts(products ? products.map((pr) => ({ ...pr, Count: undefined })) : []);
  }, [shop, shops]);

  const [checkedProducts, setCheckedProducts] = useState<number[]>([]);

  const onChangeChecked = useCallback(
    (id: number) => {
      if (checkedProducts.indexOf(id) > -1) {
        setCheckedProducts(checkedProducts.filter((item) => item !== id));
      } else {
        setCheckedProducts([...checkedProducts, id]);
      }
    },
    [checkedProducts]
  );

  const onChangeItemProduct = useCallback(
    (id: number, count?: number) => {
      setListProducts((prevState) =>
        prevState.map((item) =>
          item.ID === id ? { ...item, Count: count ? Math.abs(count) : undefined } : item
        )
      );
    },
    [listProducts]
  );

  const [res, setRes] = useState<number | undefined>();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const onBuyProducts = useCallback(() => {
    if (!shop || !listProducts.length || !checkedProducts.length) {
      return;
    }
    const list: IProductData[] = [];
    listProducts.forEach((item) => {
      if (checkedProducts.indexOf(item.ID) > -1) {
        list.push({
          IdProduct: item.ID,
          Count: item.Count && item.Count > 0 ? item.Count : 0,
        });
      }
    });
    buyProduct(shop, list).then((res) => {
      setRes(res);
      setIsOpenModal(true);
    });
  }, [shop, listProducts, checkedProducts]);

  return (
    <Stack spacing={2}>
      <SelectShop shop={shop} setShop={setShop} />

      {listProducts.length ? <Typography sx={{ color: "white" }}>Товары:</Typography> : undefined}
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Количество</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProducts.map((pr) => (
              <TableRow key={pr.ID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <Checkbox
                    checked={checkedProducts.indexOf(pr.ID) > -1}
                    onChange={() => onChangeChecked(pr.ID)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>{pr.Name}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    label="Количество *"
                    value={pr.Count ?? ""}
                    onChange={(e) => onChangeItemProduct(pr.ID, e.target.value ? +e.target.value : undefined)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        onClick={onBuyProducts}
        disabled={!shop || !listProducts.length || !checkedProducts.length}
        sx={{
          ":hover": {
            backgroundColor: "lightblue", // Цвет фона при наведении
          },
          transition: "background-color 0.3s", // Время анимации перехода
        }}
      >
        Заказать поставку
      </Button>
      <ModalBuyProducts summ={res} isOpen={isOpenModal} handleClose={onCloseModal} />
    </Stack>
  );
};
