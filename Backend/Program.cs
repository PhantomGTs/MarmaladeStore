class Programm {
    private static bool _keepRunning = true;
    static void Main() {
        Console.CancelKeyPress += delegate(object sender, ConsoleCancelEventArgs e) {
            e.Cancel = true;
            _keepRunning = false;
        };

        String line = "";
        try{
            StreamReader sr = new StreamReader("./.property");
            line = sr.ReadLine();
            sr.Close();
        }catch(Exception e){
            Console.WriteLine("Ошибка при чтении конфигурационного файла \nException: " + e.Message);
        }
        if(line == "DataBase"){
            ConnectionDataBase dataHandler = new ConnectionDataBase();
            Console.WriteLine("Starting HTTP listener...");

            HttpServer httpServer = new HttpServer(dataHandler);
            httpServer.Start();

            while (_keepRunning) { }

            httpServer.Stop();

            Console.WriteLine("Exiting gracefully...");
        }else if(line == "FileCSV"){

        }else{
            Console.WriteLine("Ошибка при чтении конфигурационного файла. \nДля получения данных из БД должно быть указано значение DataBase. \nДля получения данных из csv файла должно быть указано значение FileCSV.");

        }
        
    }
}