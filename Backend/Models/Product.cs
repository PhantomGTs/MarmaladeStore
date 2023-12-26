public class Product {

    public int ID {private set; get;}
    public string Name {private set; get;}

    public Product(int _id, string _name){
        ID = _id;
        Name = _name;
    }
}

public class ShopProduct: Product{
    public int Count {set; get;}
    public float Price {private set; get;}
    public int? Id_Shop {private set; get;}

    public ShopProduct(int _id, string _name, int _count, float _price)
    :base(_id, _name){
        Count = _count;
        Price = _price;
    }

    public ShopProduct(int _id, string _name, int _count, float _price, int _idShop)
    :base(_id, _name){
        Count = _count;
        Price = _price;
        Id_Shop = _idShop;
    }
}