using System.Net;
using System.Text;
using Newtonsoft.Json;

public class HttpServer {
    private int port;
    private HttpListener listener;
    private DataHandler handler;
    public HttpServer(DataHandler _handler, int _port = 2406) {
        port = _port;
        listener = new HttpListener();
        handler = _handler;
    }

    public void Start() {
        listener.Prefixes.Add("http://127.0.0.1:" + port.ToString() + "/");
        listener.Start();
        Receive();
    }

    public void Stop() {
        listener.Stop();
    }

    private void Receive() {
        listener.BeginGetContext(new AsyncCallback(ListenerCallback), listener);
    }

    private void ListenerCallback(IAsyncResult result) {
        if (listener.IsListening) {
            
            HttpListenerContext context = listener.EndGetContext(result);
            
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            if (request.HasEntityBody) {
                Stream body = request.InputStream;
                StreamReader reader = new StreamReader(request.InputStream);
                string requestBody = reader.ReadToEnd();
                var requestJson = JsonConvert.DeserializeObject<Request>(requestBody);
                Console.WriteLine(requestBody);
                string resp = "";
                try{
                    switch(requestJson?.Type){
                        case "GET_ALL_SHOPS":{
                            resp = JsonConvert.SerializeObject(handler.GetShops());
                            break;
                        }
                        case "ADD_SHOP": {
                            RequestAddShop req = JsonConvert.DeserializeObject<RequestAddShop>(requestBody);
                            if(req.NameShop != null && req.AddressShop != null){
                                handler.AddShop(req.NameShop, req.AddressShop);
                            }
                            resp = "";
                            break;
                        }
                        case "ADD_PRODUCT": {
                            RequesAddProduct req = JsonConvert.DeserializeObject<RequesAddProduct>(requestBody);

                            if(req.NameProduct != null){
                                handler.AddProduct(req.NameProduct);
                            }
                            resp = "";
                            break;
                        }
                        case "ADD_PRODUCT_IN_SHOP": {
                            RequestAddProductInShop req = JsonConvert.DeserializeObject<RequestAddProductInShop>(requestBody);

                            if(req.Products != null){
                                handler.AddProductInShop(req.Products);
                            }
                            resp = "";
                            break;
                        }
                        case "GET_SHOP_WITH_CHEAP_PRODUCT": {
                            RequestGetShopWithCheapProduct req = JsonConvert.DeserializeObject<RequestGetShopWithCheapProduct>(requestBody);
                            resp = JsonConvert.SerializeObject(handler.GetShopWithCheapProduct(req.IdProduct));
                            break;
                        }
                        case "GET_PRODUCTS_BY_PRICE": {
                            RequestGetProductsByPrice req = JsonConvert.DeserializeObject<RequestGetProductsByPrice>(requestBody);
                            resp = JsonConvert.SerializeObject(handler.GetProductsByPrice(req.IdShop, req.Price));
                            break;
                        }
                        case "BUY_PRODUCTS": {
                            RequestBuyProducts req = JsonConvert.DeserializeObject<RequestBuyProducts>(requestBody);
                            resp = JsonConvert.SerializeObject(handler.BuyProducts(req.IdShop, req.Products));
                            break;
                        }
                        case "GET_SHOP_WITH_CHEAP_LIST_PRODUCT":{
                            RequestGetShopWithCheapListProduct req = JsonConvert.DeserializeObject<RequestGetShopWithCheapListProduct>(requestBody);
                            resp = JsonConvert.SerializeObject(handler.GetShopWithCheapListProduct(req.Products));
                            break;
                        }
                        case "GET_ALL_PRODUCTS": {
                            resp = JsonConvert.SerializeObject(handler.GetAllProducts());
                            break;
                        }
                    }

                    // Construct a response.
                response.StatusCode = (int) HttpStatusCode.OK;
                response.StatusDescription = "OK";
                
                }catch(Exception e){
                    response.StatusCode = (int) HttpStatusCode.Conflict;
                    response.StatusDescription = e.Message;
                }
                byte[] buffer = Encoding.UTF8.GetBytes(resp);
                response.ContentLength64 = buffer.Length;
                response.ContentType = "application/json";
                response.ContentEncoding = Encoding.UTF8;
                Stream output = response.OutputStream;
                output.Write(buffer, 0, buffer.Length);
                output.Close();

                reader.Close();
                body.Close();
            }
            Receive();
        }
    }
}

