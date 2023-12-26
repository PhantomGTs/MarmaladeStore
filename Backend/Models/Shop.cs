public class Shop {
    public int ID {private set; get;}
    public string Address {private set; get;}
    public string Name {private set; get;}

    public List<ShopProduct> Products {private set; get;}

    public Shop(){}

    public Shop(int _id, string _address, string _name, List<ShopProduct> _products){
        ID = _id;
        Address = _address;
        Name = _name;
        Products = _products;
    }

    public Shop(int _id, string _address, string _name){
        ID = _id;
        Address = _address;
        Name = _name;
        Products = new List<ShopProduct>();
    }

    public void AddProduct(ShopProduct _product){
        Products.Add(_product);
    }

    public void AddProduct(int _id, string _name, int _count, float _price){
        Products.Add(new ShopProduct(_id, _name, _count, _price));
    }
}