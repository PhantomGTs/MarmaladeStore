export interface IProduct{
    ID: number
    Name: string;
    Count?: number;
    Price?: number;
}

export interface IShop {
    ID: number;
    Name: string;
    Address: string;
    Products?: IProduct[];
}

export interface IProductsShop{
    IdShop: number;
    IdProduct: number;
    CountProduct: number;
    PriceProduct: number;
}

export interface IProductData{
    IdProduct: number;
    Count: number;
}

export interface IShopByListProducts{
    Shop: IShop;
    Summ: number;

}