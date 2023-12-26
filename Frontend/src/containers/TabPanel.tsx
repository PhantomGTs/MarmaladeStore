import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CreateShop } from '../Panels/CreateShop';
import { Shops } from '../Panels/Shops';
import { CreateProduct } from '../Panels/CreateProduct';
import { AddProductInShop } from '../Panels/AddProductInShop';
import { GetProductWithCheapProduct } from '../Panels/GetShopWithCheapProduct';
import { GetListProductsByPrice } from '../Panels/GetListProductsByPrice';
import { BuyProducts } from '../Panels/BuyProducts';
import { GetShopWithListCheapProducts } from '../Panels/GetShopWithListCheapProducts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, overflowY: "auto" }}
    >
      {value === index && (
        <Box sx={{ m: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ value, setValue }: { value: number, setValue: (val: number) => void }) {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Set the minimum height to cover the entire viewport
        bgcolor: '#282c34', // Set the background color for the entire page
        color: 'white',
      }}
    >
<Typography variant="h4" color="primary" sx={{ textAlign: 'center', my: 2, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
      Магазин Европейских Сладостей
    </Typography>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiTabs-scroller': {
            backgroundColor: '#333', // Set the background color for the tab scroller
          },
        }}
      >
        <Tab label="Показать точки" {...a11yProps(0)} />
        <Tab label="Создать точку" {...a11yProps(1)} />
        <Tab label="Создать товар" {...a11yProps(2)} />
        <Tab label="Добавить товары в точку" {...a11yProps(3)} />
        <Tab label="Найти самый дешевый товар в точке" {...a11yProps(4)} />
        <Tab label="Поиск товаров на сумму" {...a11yProps(5)} />
        <Tab label="Заказать партию товаров" {...a11yProps(6)} />
        <Tab label="Найти наименьшую сумму товаров" {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Shops />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateShop />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreateProduct />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddProductInShop />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GetProductWithCheapProduct />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <GetListProductsByPrice />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <BuyProducts />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <GetShopWithListCheapProducts />
      </TabPanel>
    </Box>
  );
}
