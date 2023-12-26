import React, { useState } from 'react';
import './App.css';
import { MainLayout } from './containers/MainLayout';
import { ShopsContext } from './context';
import { IProduct, IShop } from './types';
import {ThemeProvider} from '@mui/material';
import { theme } from './themeUI';

function App() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <ShopsContext.Provider value={{shops, products, setShops, setProducts}}>
        <MainLayout />
      </ShopsContext.Provider>
    </ThemeProvider>
    
    
  );
}

export default App;
