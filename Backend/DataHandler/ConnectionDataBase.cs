using System.Data;
using MySql.Data.MySqlClient;

public class ConnectionDataBase : DataHandler {
    private string connectionStr = "server=localhost,port=3306;user=root;database=shop;password=root;";
    public MySqlConnection connection ;
        public ConnectionDataBase(){
        connection = new MySqlConnection(connectionStr);
    }
    public ConnectionDataBase(string _strConnection){
        connectionStr = _strConnection;
        connection = new MySqlConnection(connectionStr);
    }

    public List<Shop> GetShops(){
        connection.Open();
        string sql = "SELECT * FROM `Shop`;";
        MySqlCommand command = new MySqlCommand(sql, connection);
        MySqlDataReader reader = command.ExecuteReader();

        DataTable dataTable = new DataTable();
        dataTable.Load(reader);
        connection.Close();

        List<Shop> ListShop = new List<Shop>();

        foreach(DataRow row in dataTable.Rows){
            connection.Open();
            int idShop = (int)row["Id"];
            string sqlProducts = $"SELECT p.ID, p.Name, sp.Count, sp.Price FROM `Shop_Product` as sp INNER JOIN `Product` as p ON sp.ID_Product=p.ID WHERE sp.ID_Shop=\"{idShop}\"";
            MySqlCommand commandPr = new MySqlCommand(sqlProducts, connection);
            MySqlDataReader readerPr = commandPr.ExecuteReader();

            DataTable dataTablePr = new DataTable();
            dataTablePr.Load(readerPr);
            connection.Close();
            List<ShopProduct> ListPr = new List<ShopProduct>();
            ListPr = (from DataRow dr in dataTablePr.Rows
                select new ShopProduct(
                    (int)dr["ID"],
                    dr["Name"].ToString(),
                    (int)dr["Count"],
                    (float)dr["Price"]
                ){}
            ).ToList();
            ListShop.Add(new Shop(
                (int)row["ID"],
                row["Address"].ToString(),
                row["Name"].ToString(),
                ListPr
            ));
            

        }
        
        return ListShop;
    }

    public void AddShop(string _name, string _address){
        connection.Open();
        string sql = $"INSERT INTO `Shop` (Name, Address) VALUES (\"{_name}\", \"{_address}\")";
        MySqlCommand command = new MySqlCommand(sql, connection);
        MySqlDataReader reader = command.ExecuteReader();
        connection.Close();
    }

    public void AddProduct(string _name){
        connection.Open();
        string sql = $"INSERT INTO `Product` (Name) VALUES (\"{_name}\")";
        MySqlCommand command = new MySqlCommand(sql, connection);
        MySqlDataReader reader = command.ExecuteReader();
        connection.Close();
    }

    public void AddProductInShop(List<IProductsShop> products){

        products.ForEach((product)=>{
            connection.Open();
            string sql = $"SELECT COUNT(*) as count FROM Shop_Product WHERE ID_Shop={product.IdShop} AND ID_Product={product.IdProduct}";
            MySqlCommand command = new MySqlCommand(sql, connection);
            string? res = command.ExecuteScalar().ToString();
            connection.Close();
            connection.Open();
            string sqlC = "";
            if(res != null && int.Parse(res) == 0){
                sqlC = $"INSERT INTO `Shop_Product` (ID_Shop, ID_Product, Price, Count) VALUES ({product.IdShop}, {product.IdProduct}, {product.PriceProduct}, {product.CountProduct})";
            }else{
                if(product.PriceProduct != null){
                    sqlC = $"UPDATE `Shop_Product` SET Price={product.PriceProduct}, Count=Count+{product.CountProduct} WHERE ID_Shop={product.IdShop} AND ID_Product={product.IdProduct}";
                }else{
                    sqlC = $"UPDATE `Shop_Product` SET Count=Count+{product.CountProduct} WHERE ID_Shop={product.IdShop} AND ID_Product={product.IdProduct}";

                }
                
            }

            MySqlCommand com = new MySqlCommand(sqlC, connection);
            
            com.ExecuteReader();
            connection.Close();
        });
        
    }

    public Shop GetShopWithCheapProduct(int _idProduct){
        connection.Open();
        string sql = $"SELECT s.ID, s.Name, s.Address FROM `Shop` AS s INNER JOIN `Shop_Product` AS sp ON s.ID = sp.ID_Shop WHERE Price = ( SELECT MIN(Price) FROM `Shop_Product` WHERE ID_Product = {_idProduct} );";
        MySqlCommand command = new MySqlCommand(sql, connection);
        MySqlDataReader reader = command.ExecuteReader();
        DataTable dataTable = new DataTable();
        dataTable.Load(reader);
        connection.Close();

        
        if(dataTable.Rows.Count == 0){
            return null;
        }

        var row = dataTable.Rows[0];
        Shop Shop = new Shop(
            (int)row["ID"],
                row["Address"].ToString(),
                row["Name"].ToString()
        );

        connection.Open();
        string sqlProduct = $"SELECT p.ID, p.Name, sp.Count, sp.Price FROM `Shop_Product` as sp INNER JOIN `Product` as p ON sp.ID_Product=p.ID WHERE sp.ID_Product=\"{_idProduct}\"";
        MySqlCommand commandPr = new MySqlCommand(sqlProduct, connection);
        MySqlDataReader readerPr = commandPr.ExecuteReader();

        DataTable dataTablePr = new DataTable();
        dataTablePr.Load(readerPr);
        var rowPr = dataTablePr.Rows[0];
        connection.Close();
        ShopProduct product = new ShopProduct(
            (int)rowPr["ID"],
            rowPr["Name"].ToString(),
            (int)rowPr["Count"],
            (float)rowPr["Price"]
        );

        
        Shop.AddProduct(product);
        return Shop;
    }

    public List<ShopProduct> GetProductsByPrice(int _idShop, float _price){
        connection.Open();
        string sqlProducts = $"SELECT p.ID, p.Name, sp.Count, sp.Price FROM `Shop_Product` as sp INNER JOIN `Product` as p ON sp.ID_Product=p.ID WHERE sp.Price<=\"{_price}\" AND sp.ID_Shop={_idShop}";
        MySqlCommand commandPr = new MySqlCommand(sqlProducts, connection);
        MySqlDataReader readerPr = commandPr.ExecuteReader();

        DataTable dataTablePr = new DataTable();
        dataTablePr.Load(readerPr);
        connection.Close();
        List<ShopProduct> ListPr = new List<ShopProduct>();
        ListPr = (from DataRow dr in dataTablePr.Rows
            select new ShopProduct(
                (int)dr["ID"],
                dr["Name"].ToString(),
                (int)dr["Count"],
                (float)dr["Price"]
            ){}
        ).ToList();

        List<ShopProduct> ResPr = new List<ShopProduct>();

        ListPr.ForEach((product)=>{
            int count = 0;
            for(int i = 0; i <= product.Count && product.Price * i <= _price; i++){
                count = i;
            }
            if(count > 0){
                product.Count = count;
                ResPr.Add(product);
            }
        });
        return ResPr;
    }

    public float BuyProducts(int _idShop, List<IListProduct> _products){
        connection.Open();
        List<int> listId = new List<int>();
        _products.ForEach((p)=>{listId.Add(p.IdProduct);});
        string sqlProducts = $"SELECT p.ID, p.Name, sp.Count, sp.Price FROM `Shop_Product` as sp INNER JOIN `Product` as p ON sp.ID_Product=p.ID WHERE sp.ID_Shop={_idShop} AND sp.ID_Product IN({string.Join(",", listId)})";
        MySqlCommand commandPr = new MySqlCommand(sqlProducts, connection);
        MySqlDataReader readerPr = commandPr.ExecuteReader();

        DataTable dataTablePr = new DataTable();
        dataTablePr.Load(readerPr);
        connection.Close();
        List<ShopProduct> ListPr = new List<ShopProduct>();
        ListPr = (from DataRow dr in dataTablePr.Rows
            select new ShopProduct(
                (int)dr["ID"],
                dr["Name"].ToString(),
                (int)dr["Count"],
                (float)dr["Price"]
            ){}
        ).ToList();

        float summ = 0;
        foreach(IListProduct pr in _products){
            ShopProduct product = ListPr.Find((p) => p.ID == pr.IdProduct);

            if(product != null && product.Count >= pr.Count){
                summ += product.Price * pr.Count;
            }else{
                summ = 0;
                break;
            }
        };
        if(summ > 0){
            foreach(IListProduct pr in _products){
                connection.Open();
                string sqlC = $"UPDATE `Shop_Product` SET Count=Count-{pr.Count} WHERE ID_Shop={_idShop} AND ID_Product={pr.IdProduct}";
                MySqlCommand com = new MySqlCommand(sqlC, connection);
                com.ExecuteReader();
                connection.Close();
            }
        }
        return summ;
    }

    public IShopByListProducts GetShopWithCheapListProduct(List<IListProduct> _products){

        List<string> condition= new List<string>();
        foreach(IListProduct pr in _products){
            condition.Add($"(ID_Product = {pr.IdProduct} AND Count >= {pr.Count})");
        }
        connection.Open();
        string sql = $"SELECT * FROM Shop_Product INNER JOIN `Product` as p ON ID_Product=p.ID WHERE {string.Join(" OR ", condition)}";

        MySqlCommand command = new MySqlCommand(sql, connection);
        MySqlDataReader reader = command.ExecuteReader();
        DataTable dataTable = new DataTable();
        dataTable.Load(reader);
        connection.Close();
        if(dataTable.Rows.Count == 0){
            return null;
        }

        List<ShopProduct> ShopPr = new List<ShopProduct>();
        ShopPr = (from DataRow row in dataTable.Rows
            select new ShopProduct(
            (int)row["ID_Product"],
            row["Name"].ToString(),
            (int)row["Count"],
            (float)row["Price"],
            (int)row["ID_Shop"]
        ){}
        ).ToList();

        Dictionary<int, List<ShopProduct>> shops = new Dictionary<int, List<ShopProduct>>();

        foreach(ShopProduct item in ShopPr){
            if(item.Id_Shop != null){
                if(!shops.ContainsKey((int)item.Id_Shop)){
                    shops.Add((int)item.Id_Shop, new List<ShopProduct>());
                }
                shops[(int)item.Id_Shop].Add(item);
            }
        }

        int count = _products.Count();
        Dictionary<int, float> res = new Dictionary<int, float>();

        foreach(var itemShop in shops){
            if(itemShop.Value.Count == count){
                res.Add(itemShop.Key, itemShop.Value.Sum(x => x.Price * _products.Find(y=>y.IdProduct == x.ID).Count));
            }
        }

        float resultMinSumm = res.Values.Min();
        int idShop = res.First(x => x.Value == resultMinSumm).Key;

        connection.Open();
        string sqlShop = $"SELECT * FROM Shop WHERE ID={idShop}";

        MySqlCommand commandShop = new MySqlCommand(sqlShop, connection);
        MySqlDataReader readerShop = commandShop.ExecuteReader();
        DataTable dataTableShop = new DataTable();
        dataTableShop.Load(readerShop);
        connection.Close();
        if(dataTableShop.Rows.Count == 0){
            return null;
        }

        var rowShop = dataTableShop.Rows[0];
        return new IShopByListProducts(
            new Shop(
                (int)rowShop["ID"],
                rowShop["Address"].ToString(),
                rowShop["Name"].ToString()
            ),
            resultMinSumm
        );
    }

    public List<Product> GetAllProducts(){
        connection.Open();
        string sqlProducts = $"SELECT * FROM `Product`";
        MySqlCommand commandPr = new MySqlCommand(sqlProducts, connection);
        MySqlDataReader readerPr = commandPr.ExecuteReader();

        DataTable dataTablePr = new DataTable();
        dataTablePr.Load(readerPr);
        connection.Close();
        List<Product> ListPr = new List<Product>();
        ListPr = (from DataRow dr in dataTablePr.Rows
            select new Product(
                (int)dr["ID"],
                dr["Name"].ToString()
            ){}
        ).ToList();
        return ListPr;
    }
}