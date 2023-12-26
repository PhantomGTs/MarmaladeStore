import { Button, Stack, TextField, Paper, Typography } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { createShop } from "../requests/createShop";
import { useShopsContext } from "../context";
import { getShops } from "../requests/getShops";

export const CreateShop = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const { setShops } = useShopsContext();

    const onChangeName = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(e.target.value);
    }, [setName]);

    const onChangeAddress = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAddress(e.target.value);
    }, [setAddress]);

    const onCreate = useCallback(() => {
        createShop(name, address);
        setName("");
        setAddress("");
        getShops().then((res) => {
            setShops(res);
        });
    }, [name, address, setName, setAddress, setShops]);

    const isButtonDisabled = !name.length || !address.length;

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <Paper elevation={3} style={{ padding: 40, width: "30%", textAlign: "center", borderRadius: 16, background: "linear-gradient(to right, #232526, #414345)" }}>
                <Typography variant="h3" gutterBottom style={{ fontFamily: "Montserrat, sans-serif", color: "#fff" }}>
                    Создание магазина
                </Typography>
                <Stack direction="column" spacing={3}>
                    <TextField
                        key="shop-name"
                        fullWidth
                        label="Название"
                        variant="outlined"
                        value={name}
                        onChange={onChangeName}
                        style={{ borderRadius: 8, background: "rgba(255, 255, 255, 0.5)" }}
                        InputProps={{ style: { color: "#000" } }}
                    />
                    <TextField
                        key="shop-address"
                        fullWidth
                        label="Адрес"
                        variant="outlined"
                        value={address}
                        onChange={onChangeAddress}
                        style={{ borderRadius: 8, background: "rgba(255, 255, 255, 0.5)" }}
                        InputProps={{ style: { color: "#000" } }}
                    />
                    <Button
                        variant="contained"
                        onClick={onCreate}
                        disabled={isButtonDisabled}
                        style={{ background: isButtonDisabled ? "#ccc" : "#4CAF50", color: "#fff" }}
                    >
                        Создать магазин
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};
