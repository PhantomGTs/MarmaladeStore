import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useShopsContext } from "../context";

export const SelectShop = ({shop, setShop}: {shop: number|undefined, setShop:(e: number)=>void}) => {
    const {shops} = useShopsContext();
    const handleChange = (event: SelectChangeEvent) => {
        setShop(+event.target.value);
    };
    return(
        <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-standard-label">Магазин</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={shop?.toString() || ""}
                onChange={handleChange}
                label="Магазин"
            >
                {
                    shops.map((item)=>
                        <MenuItem key={item.ID} value={item.ID}>{item.Name} - {item.Address}</MenuItem>
                    )
                }
            
            </Select>
        </FormControl>
    )
}