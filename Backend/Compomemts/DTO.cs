using System.Security.Cryptography.X509Certificates;



public class RequestAddShop : Request{
        public string NameShop;
        public string AddressShop;
}

public class RequesAddProduct : Request {
        public string NameProduct;
}

public class RequestAddProductInShop: Request {
        public List<IProductsShop> Products;
}

public class RequestGetShopWithCheapProduct: Request{
        public int IdProduct;
}

public class RequestGetProductsByPrice: Request{
        public int IdShop;
        public float Price;
}

public class RequestBuyProducts: Request {
        public int IdShop;
        public List<IListProduct> Products;
}

public class RequestGetShopWithCheapListProduct: Request{
        public List<IListProduct> Products;
}
public class Request 
{
        public string Type; 
}
public class IProductsShop {
        public int IdShop;
        public int IdProduct;
        public int CountProduct;
        public float? PriceProduct;
}

public class IListProduct{
        public int IdProduct;
        public int Count;
}

public class IShopByListProducts{
        public Shop Shop;
        public float Summ; 
        public IShopByListProducts(Shop _shop, float _summ){
                Shop = _shop;
                Summ = _summ;
        }
}