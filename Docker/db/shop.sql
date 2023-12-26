-- Adminer 4.8.1 MySQL 8.2.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` char(30) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Product` (`ID`, `Name`) VALUES
(1,	'Волшебные Шоколадки'),
(2,	'Лимонные Леденцы'),
(3,	'Карамельный Драже'),
(4,	'Мармеладные Конфеты'),
(5,	'Фундуковый Пралине'),
(6,	'Малиновые Жевательные Мармеладки'),
(7,	'Кокосовые Лакрички'),
(8,	'Шоколадные Миндальные Плитки'),
(9,	'Ванильные Печеньки в Глазури'),
(10,	'Фисташковые Конфеты в Голубом Шоколаде'),
(11,	'Клубничный Зефир в Шоколаде'),
(12,	'Шоколадные Коктейльные Трюфели'),
(13,	'Марципановые Фрукты'),
(14,	'Пудровые Пастельные Мармеладки'),
(15,	'Мятно-Шоколадные Лакомства');

DROP TABLE IF EXISTS `Shop`;
CREATE TABLE `Shop` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Address` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Address` (`Address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Shop` (`ID`, `Name`, `Address`) VALUES
(1,	'Кулинарный Эдем',	'Улица Десертовая, 55'),
(2,	'Экзотический Привкус',	'Улица Шефская, 17'),
(3,	'Волшебный Производитель',	'Переулок Ароматный, 38'),
(4,	'Сырная Фантазия',	'Проспект Удовольствий, 19'),
(5,	'Фруктовый Вихрь',	'Перекресток Фруктовый, 4'),
(6,	'Дом Вкусов',	'Проспект Лакомств, 9'),
(7,	'Пекарня Счастья',	'Улица Хлебопечения, 1'),
(12,	'Кофейная Сага',	'Площадь Ароматов, 1'),
(13,	'Сладкая Фантазия',	'Переулок Ароматный, 13');

DROP TABLE IF EXISTS `Shop_Product`;
CREATE TABLE `Shop_Product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Shop` int NOT NULL,
  `ID_Product` int NOT NULL,
  `Price` float NOT NULL,
  `Count` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Product` (`ID_Product`),
  KEY `ID_Shop` (`ID_Shop`),
  CONSTRAINT `shop_product_ibfk_1` FOREIGN KEY (`ID_Product`) REFERENCES `Product` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shop_product_ibfk_2` FOREIGN KEY (`ID_Shop`) REFERENCES `Shop` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Shop_Product` (`ID`, `ID_Shop`, `ID_Product`, `Price`, `Count`) VALUES
(1,	1,	7,	50,	200),
(2,	4,	3,	30,	150),
(3,	5,	13,	40,	180),
(4,	7,	7,	35,	250),
(5,	3,	4,	50,	180),
(6,	5,	3,	25,	160),
(7,	4,	4,	45,	200),
(9,	3,	3,	60,	220),
(10,	1,	4,	70,	200),
(23,	6,	6,	25,	180),
(24,	5,	1,	75,	100),
(25,	4,	4,	40,	150),
(26,	3,	3,	30,	210),
(27,	2,	6,	80,	170);

-- 2023-12-26 01:04:59