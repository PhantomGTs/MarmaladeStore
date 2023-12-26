public interface DataHandler {
    public List<Shop> GetShops();
    public void AddShop(string _name, string _address);
    public void AddProduct(string _name);
    public void AddProductInShop(List<IProductsShop> products);
    public Shop GetShopWithCheapProduct(int _idProduct);
    public List<ShopProduct> GetProductsByPrice(int _idShop, float _price);
    public float BuyProducts(int _idShop, List<IListProduct> _products);
    public IShopByListProducts GetShopWithCheapListProduct(List<IListProduct> _products);
    public List<Product> GetAllProducts();
}