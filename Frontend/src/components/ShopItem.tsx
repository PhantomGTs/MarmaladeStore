import { IShop } from "../types";
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function createData(
    id: number,
    name: string,
    price?: number,
    count?: number
    
  ) {
    return { id, name, price, count };
  }

export const ShopItem = ({shop, onToBack}: {shop: IShop, onToBack:()=>void}) => {
    const { Products } = shop;
    const rows = Products?.map((item)=>createData(item.ID, item.Name, item.Price, item.Count))
    return (
        <Stack spacing={2}>
            <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={onToBack} >
                Вернуться к списку магазинов
            </Button>
            {
                rows ? (
                    <TableContainer component={Paper}>
                        <Table  size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell >Название</TableCell>
                                    <TableCell >Цена(руб.)</TableCell>
                                    <TableCell >Колличество</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell >{row.price || ""}</TableCell>
                                    <TableCell >{row.count || ""}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null
            }
        </Stack>
    )
}