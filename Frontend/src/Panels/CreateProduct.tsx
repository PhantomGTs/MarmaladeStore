import { Button, Stack, TextField, Paper, Typography } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { createProduct } from "../requests/createProduct";
import { getShops } from "../requests/getShops";
import { useShopsContext } from "../context";

export const CreateProduct = () => {
    const [name, setName] = useState("");
    const { setShops } = useShopsContext();

    const onChangeName = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(e.target.value);
    }, [setName]);

    const onCreate = useCallback(() => {
        createProduct(name);
        setName("");
        getShops().then((res) => {
            setShops(res);
        });
    }, [name, setName, setShops]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30%" }}>
            <Paper elevation={3} style={{ padding: 40, width: "30%", textAlign: "center", borderRadius: 16, background: "linear-gradient(to right, #232526, #414345)" }}>
                <Typography variant="h3" gutterBottom style={{ fontFamily: "Montserrat, sans-serif", color: "#fff" }}>
                    Создание товара
                </Typography>
                <Stack direction="column" spacing={3}>
                    <TextField
                        fullWidth
                        label="Название"
                        variant="outlined"
                        value={name}
                        onChange={onChangeName}
                        style={{ borderRadius: 8, background: "rgba(255, 255, 255, 0.5)" }}
                        InputProps={{ style: { color: "#000" } }}
                    />
                    <Button
                        variant="contained"
                        onClick={onCreate}
                        disabled={!name.length}
                        style={{ background: !name.length ? "#ccc" : "#4CAF50", color: "#fff" }}
                    >
                        Создать товар
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};
