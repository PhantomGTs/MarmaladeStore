import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { IShop } from "../types"
import { useCallback } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ShopCard = ({ shop, setShop }: {shop: IShop, setShop: (val: IShop)=>void}) => {
    const {ID, Name, Address} = shop;
    const handlerSetShop = useCallback(()=>{
        setShop(shop);
    },[shop, setShop]);

    return(
<Box sx={{
  display: "flex", // Устанавливаем контейнеру flex-режим
  alignItems: "center", // Выравниваем элементы по центру
  width: "40%",
  backgroundColor: "#333", // Цвет фона
  borderRadius: "10px", // Радиус углов
  padding: "16px", // Внутренний отступ
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Тень
}}>
  <Card variant="elevation" sx={{ flex: 1 }}>
    <CardContent>
      <Typography sx={{ fontSize: 16, color: 'white' }} color="text.secondary" gutterBottom>
        ID: {ID}
      </Typography>
      <Typography sx={{ color: 'white' }} variant="h5" component="div">
        {Name}
      </Typography>
      <Typography sx={{ color: 'white' }} variant="body2">
        Адрес: {Address}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={handlerSetShop} endIcon={<ArrowForwardIosIcon />}>Товары</Button>
    </CardActions>
  </Card>
</Box>


    )
}
