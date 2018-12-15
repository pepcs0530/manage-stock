/*
SQLyog Community v12.5.0 (64 bit)
MySQL - 8.0.13 : Database - db_managestock
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_managestock` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_managestock`;

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `customer_id` varchar(10) NOT NULL,
  `customer_name` varchar(40) NOT NULL,
  `customer_phone` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `customer_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_name` (`customer_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `customer` */

insert  into `customer`(`customer_id`,`customer_name`,`customer_phone`,`customer_address`) values 
('C000000001','tom1','2','QW'),
('C000000002','tom3','0800000001','rat'),
('C000000003','วาสนา สุวรรณบำรุงชัย','0911111111','-'),
('C000000004','วาสนา','//','//'),
('C000000005','บีบีบี','111','123\n456'),
('C000000006','เทส จนพัง','0000000000','-'),
('C000000007','ไกรวิท เกิดศักดิ์ ณ แวงน้อย','0000000000','-'),
('C000000008','ปทุมธานี','0912345678','-'),
('C000000009','บี๊บี','0888888888','-'),
('C000000010','อภิวิชญ์ สังข์เมือง','1234567899','12345'),
('C000000011','บีบี๊','0988888888','-'),
('C000000012','บีบีบบีีบี','0988654563','-'),
('C000000013','แดง ดำ','0111111111','-'),
('C000000014','สกานต์ ดีเเก้ว','0986655443','953/856'),
('C000000015','ณัฐชา  เย็นตั้ง','0981245122','365/745'),
('C000000016','อัลฟาน  ดือราแม','0864392753','23/12'),
('C000000017','ณัฐพัชร์  คงทอง','0953642782','785/256'),
('C000000018','ยศวรรธน์  ชาวส้าน','0965379146','36/120'),
('C000000019','ณัฐพงษ์  ศรีเดือนดาว','0869854785','35/95'),
('C000000020','เพิ่มพล กุรัง','080008000','423/9 ratchathewi'),
('C000000021','เพ็ญโฉม  ยาทะเล','0968534786','369/963');

/*Table structure for table `member` */

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `member_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `member_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'รหัสสมาชิก',
  `member_fname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'ชื่อ',
  `member_lname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'นามสกุล',
  `member_license_place` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'ทะะเบียนรถ',
  `telephone` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'เบอร์โทร',
  `address` varchar(100) DEFAULT NULL COMMENT 'ที่อยู่',
  PRIMARY KEY (`member_seq`),
  KEY `member_id` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

/*Data for the table `member` */

insert  into `member`(`member_seq`,`member_id`,`member_fname`,`member_lname`,`member_license_place`,`telephone`,`address`) values 
(1,'00001','วาสนา','สุวรรณบำรุงชัย','กข-1234','0812345678','789/852'),
(2,'00002','อภิวิชญ์','สังข์เมือง','บล-1234','1234567899','12345'),
(7,'00007','ณัฐภัทร','ปนานนท์','ฎถ-8397','0816155053','กรุงเทพ1'),
(15,'00015','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(26,'00016','ทดสอบ','ทดสอบ','ทดสอบ','012345678','ทดสอบ'),
(28,'00017','บีบีบีบีบี','บีบีบีบีบีบี','123456789','0988888888','123456'),
(31,'00031','wassa','null','มม-5','0816123458','152/685'),
(33,'00033','สหรัช ','บุญรังษี   ','ฏฆ-8876','0999987766','127/125 '),
(34,'00034','อรยา ','จันทรธิกานนท์','กก-8','0888188216','89/321'),
(35,'00035','จิราวรรณ ','ผาดไธสง','1ฒม-7736','0812345678','145/24'),
(36,'00036','ชไมพร ','นนทรัตน์','ชช-002','0880008800','302/563'),
(37,'00037','ภัทรา','จรดล','ผบ-555','0911727888','8/987'),
(38,'00038','นิรมล ','วิวรรธน์โภคิน','ตด-888','0658533256','852/256'),
(39,'00039','สกานต์','ดีเเก้ว','งง-555','0986655443','953/856'),
(40,'00040','จิรศักดิ์ ','ทรัพย์เจริญพงศ์    ','ปอ-9635','0876896534','136/65'),
(41,'00041','ณัฐพัชร์ ','คงทอง','ลฃ-6854','0953642782','785/256'),
(42,'00042','เพ็ญโฉม ','ยาทะเล','ถถ-985','0968534786','369/963'),
(43,'00043','ณัฐวดี ','พรหมบุบผา','ยน-589','0986532258','147/852'),
(44,'00044','ศาตนันท์ ','เลาหะธีระพงษ์','นส-7412','0996587412','98/89'),
(45,'00045','ณัฐพงษ์ ','ศรีเดือนดาว','ศณ-8952','0869854785','35/95'),
(46,'00046','อัมฤทธิ์ ','จิระพันธ์วัฒนา ','ฒม-6899','0874596321','75/86'),
(47,'00047','ธีรวัฒน์ ','ชาญจรเข้','ฑพ-7788','0985458987','25/56'),
(48,'00048',' วาริษา ','สาขากร','ทท-7789','0965896589','78/788'),
(49,'00049','วัลวดี ','เหมนิธิ','ทอ-9876','0933256874','96/896'),
(50,'00050','รติกร ','สูงสมสกุล','กด-8561','0832541236','32/56'),
(51,'00051','ณัฐชา ','เย็นตั้ง','นร-9936','0981245122','365/745'),
(52,'00052','ชัชพล ','แซ่เหลียง','ยล-3321','0953247965','64/12'),
(53,'00053','สุพรรษา ','จิตอุทัศน์','หก-6666','0884565456','659/325'),
(54,'00054','ยศวรรธน์ ','ชาวส้าน','ศศ-0632','0965379146','36/120'),
(55,'00055','วสุพล ','ชะนะเทพ','วง-6875','0957496321','832/569'),
(56,'00056','อัลฟาน ','ดือราแม','ถภ-9669','0864392753','23/12'),
(57,'00057','ศิวาพร ','รุ่งเรืองประมง','ลฟ-4512','0613589247','369/963'),
(58,'00058','กฤษณัฏฐา ','วงษ์ปิ่น','พอ-4455','0679583105','225/27'),
(59,'00059','ศุภากร ','ภวัง','ฟด-956','0643005245','39/457'),
(60,'00060','วรัมพร','ศรีเนตร','พท-9966','0623541230','39/84');

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `receipt` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `issuedate` datetime NOT NULL,
  `customer_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  `member_seq` int(11) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `order` */

insert  into `order`(`order_id`,`receipt`,`issuedate`,`customer_id`,`discount`,`member_seq`) values 
('p000000001','R000000001','2018-11-28 23:35:46','c000000001',10,0),
('p000000002','R000000002','2018-11-29 15:01:22','C000000001',0,0),
('p000000003','R000000003','2018-11-30 23:26:24','C000000001',10,0),
('p000000004','R000000004','2018-11-01 11:39:32','C000000001',10,0),
('p000000005','R000000005','2018-11-02 11:40:12','C000000002',15,0),
('P000000006','R000000006','2018-11-29 21:57:35','C000000001',100,1),
('P000000007','R000000007','2018-11-29 23:12:44','C000000001',0,1),
('P000000008','R000000008','2018-11-29 23:36:10','C000000001',0,1),
('P000000009','R000000009','2018-11-30 14:01:24','C000000001',2000,1),
('P000000010','R000000010','2018-11-30 15:35:01','C000000001',0,1),
('P000000011','R000000011','2018-11-30 15:37:18','C000000001',0,1),
('P000000012','R000000012','2018-12-01 21:42:23','C000000001',0,1),
('P000000013','R000000013','2018-12-01 21:44:43','C000000001',200,1),
('P000000014','R000000014','2018-12-01 21:48:22','C000000001',0,1),
('P000000015','R000000015','2018-12-01 22:04:48','C000000001',50000,1),
('P000000016','R000000016','2018-12-02 10:09:36','C000000001',0,1),
('P000000017','R000000017','2018-12-02 10:09:36','C000000001',0,1),
('P000000018','R000000018','2018-12-02 18:50:42','C000000001',0,1),
('P000000019','R000000019','2018-12-02 23:58:40','C000000001',100,1),
('P000000020','R000000020','2018-12-03 10:07:18','C000000002',0,1),
('P000000021','R000000021','2018-12-03 15:15:28','C000000001',0,1),
('P000000022','R000000022','2018-12-03 15:23:43','C000000001',0,1),
('P000000023','R000000023','2018-12-03 15:51:04','C000000001',0,1),
('P000000024','R000000024','2018-12-03 15:54:26','C000000001',0,1),
('P000000025','R000000025','2018-12-03 16:05:06','C000000007',0,1),
('P000000026','R000000026','2018-12-03 16:13:26','C000000008',0,1),
('P000000027','R000000027','2018-12-03 23:12:10','C000000009',0,1),
('P000000028','R000000028','2018-12-03 23:24:30','C000000010',0,1),
('P000000029','R000000029','2018-12-03 23:28:18','C000000011',0,1),
('P000000030','R000000030','2018-12-03 23:34:51','C000000012',0,1),
('P000000031','R000000031','2018-12-04 00:09:04','C000000003',0,1),
('P000000032','R000000032','2018-12-04 00:54:34','C000000003',100,1),
('P000000033','R000000033','2018-12-04 00:56:00','C000000013',200,1),
('P000000034','R000000034','2018-12-05 09:52:04','C000000003',5000,1),
('P000000035','R000000035','2018-12-06 21:28:14','C000000014',5000,1),
('P000000036','R000000036','2018-12-07 01:52:46','C000000015',50,1),
('P000000037','R000000037','2018-12-07 02:05:53','C000000015',50,1),
('P000000038','R000000038','2018-12-07 09:38:34','C000000016',1000,1),
('P000000039','R000000039','2018-12-08 12:49:13','C000000017',110,1),
('P000000040','R000000040','2018-12-08 14:17:03','C000000018',50,1),
('P000000041','R000000041','2018-12-11 21:47:21','C000000019',0,1),
('P000000042','R000000042','2018-12-11 23:53:14','C000000010',0,1),
('P000000043','R000000043','2018-12-12 00:14:13','C000000010',0,1),
('P000000044','R000000044','2018-12-12 00:21:54','C000000010',0,1),
('P000000045','R000000045','2018-12-12 00:30:13','C000000010',0,1),
('P000000046','R000000046','2018-12-13 20:15:00','C000000020',90,1),
('P000000047','R000000047','2018-12-14 09:58:42','C000000021',0,1),
('P000000048','R000000048','2018-12-14 10:01:31','C000000020',40,1),
('P000000049','R000000049','2018-12-14 10:09:12','C000000020',0,1),
('P000000050','R000000050','2018-12-14 11:30:01','C000000010',0,1);

/*Table structure for table `order_item` */

DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
  `item_seq` int(10) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `price` decimal(10,0) NOT NULL DEFAULT '0',
  `order_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `product_seq` int(11) DEFAULT NULL COMMENT 'FK สินค้า',
  PRIMARY KEY (`item_seq`),
  KEY `item_order` (`order_id`),
  KEY `FK_order_item_product` (`product_seq`),
  CONSTRAINT `FK_order_item_product` FOREIGN KEY (`product_seq`) REFERENCES `product` (`product_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

/*Data for the table `order_item` */

insert  into `order_item`(`item_seq`,`quantity`,`price`,`order_id`,`product_seq`) values 
(1,25,100,'p000000001',17),
(2,11,200,'p000000002',16),
(3,15,150,'p000000003',15),
(5,17,170,'p000000004',5),
(6,22,135,'p000000005',17),
(7,6,90,'P000000006',19),
(8,5,150,'P000000007',18),
(9,1,150,'P000000008',18),
(10,5,1200,'P000000009',8),
(11,50,1800,'P000000010',20),
(12,2,300,'P000000011',10),
(13,1,1200,'P000000012',8),
(14,1,1200,'P000000013',8),
(15,1,1200,'P000000014',8),
(16,599,150,'P000000015',18),
(17,10,150,'P000000016',18),
(18,10,150,'P000000017',18),
(19,1,1800,'P000000018',3),
(20,1000,150,'P000000019',24),
(21,500,150,'P000000020',24),
(22,1,1200,'P000000020',8),
(23,500,150,'P000000021',24),
(24,250,150,'P000000022',24),
(25,250,150,'P000000022',24),
(26,700,150,'P000000023',24),
(27,420,150,'P000000024',24),
(28,120,150,'P000000025',24),
(29,150,90,'P000000026',23),
(30,50,1200,'P000000027',8),
(31,430,150,'P000000028',24),
(32,1,150,'P000000029',24),
(33,1,150,'P000000030',24),
(34,1,150,'P000000031',24),
(35,100,150,'P000000032',24),
(36,11,200,'P000000033',8),
(37,1000,150,'P000000034',24),
(38,100,450,'P000000035',23),
(39,1,390,'P000000036',30),
(40,1,390,'P000000037',30),
(41,30,390,'P000000038',20),
(42,10,390,'P000000039',8),
(43,10,450,'P000000040',23),
(44,1,450,'P000000041',4),
(45,5,390,'P000000042',20),
(46,3,390,'P000000043',20),
(47,5,390,'P000000044',20),
(48,5,390,'P000000045',30),
(49,1,390,'P000000046',17),
(50,1,390,'P000000047',20),
(51,1,390,'P000000048',3),
(52,1,390,'P000000049',28),
(53,1,390,'P000000050',20);

/*Table structure for table `pick_up` */

DROP TABLE IF EXISTS `pick_up`;

CREATE TABLE `pick_up` (
  `pick_up_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `pick_up_id` varchar(20) DEFAULT NULL COMMENT 'รหัสใบเสร็จ',
  `product_type_id` varchar(20) DEFAULT NULL COMMENT 'รหัสประเภทสินค้า',
  `product_id` varchar(20) DEFAULT NULL COMMENT 'รหัสสินค้า',
  `member_id` varchar(20) DEFAULT NULL COMMENT 'รหัสสมาชิก',
  `pick_up_date` date DEFAULT NULL COMMENT 'วันที่ซื้อ',
  `pick_up_quality` int(11) DEFAULT NULL COMMENT 'จำนวนที่ซื้อใน 1 product_id',
  `product_seq` int(11) DEFAULT NULL,
  `member_seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`pick_up_seq`),
  KEY `member_id` (`member_id`),
  KEY `pick_up_id` (`pick_up_id`),
  KEY `product_id` (`product_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `product_seq` (`product_seq`),
  KEY `member_seq` (`member_seq`),
  CONSTRAINT `pick_up_ibfk_1` FOREIGN KEY (`product_seq`) REFERENCES `product` (`product_seq`),
  CONSTRAINT `pick_up_ibfk_2` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pick_up` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `product_id` varchar(20) DEFAULT NULL COMMENT 'รหัสสินค้า',
  `product_name` varchar(100) DEFAULT NULL COMMENT 'ชื่อสินค้า',
  `product_type_id` varchar(20) DEFAULT NULL COMMENT 'fk รหัสประเภทสินค้า',
  `time_in` datetime DEFAULT NULL COMMENT 'เวลาเข้า',
  `time_out` datetime DEFAULT NULL COMMENT 'เวลาออก',
  `rice_varieties` varchar(200) DEFAULT NULL COMMENT 'พันธุ์ข้าว',
  `remark` varchar(250) DEFAULT NULL COMMENT 'หมายเหตุ',
  `date` datetime DEFAULT NULL COMMENT 'วันที่บันทึก',
  `lot_id` int(11) DEFAULT NULL COMMENT 'เลข lot',
  `product_quantity` decimal(10,2) DEFAULT NULL COMMENT 'จำนวนกระสอบ',
  `mfd_date` date DEFAULT NULL COMMENT 'วันที่ผลิต',
  `exp_date` date DEFAULT NULL COMMENT 'วันที่หมดอายุ',
  `member_seq` int(11) DEFAULT NULL COMMENT 'fk(member) ผู้ขาย',
  `rice_var_seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_seq`),
  KEY `product_id` (`product_id`),
  KEY `member_seq` (`member_seq`),
  KEY `lot_id` (`lot_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `rice_var_seq` (`rice_var_seq`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`rice_var_seq`) REFERENCES `rice_varieties` (`rice_var_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`product_seq`,`product_id`,`product_name`,`product_type_id`,`time_in`,`time_out`,`rice_varieties`,`remark`,`date`,`lot_id`,`product_quantity`,`mfd_date`,`exp_date`,`member_seq`,`rice_var_seq`) values 
(3,'p0001',NULL,NULL,'2018-10-18 23:28:29','2018-10-18 23:30:29','กข 31','หมายเหตุ','2018-10-18 00:00:00',1549880169,0.00,'2018-11-01','2018-11-30',1,1),
(4,NULL,NULL,NULL,NULL,NULL,'ปทุมธานี 1',NULL,NULL,1539880169,0.00,'2018-10-01','2018-11-02',NULL,10),
(5,NULL,NULL,NULL,'1970-01-01 07:00:00','1970-01-01 07:00:00','ป',NULL,'2018-11-01 00:00:00',1541059136,3.00,NULL,NULL,NULL,9),
(8,NULL,NULL,NULL,'2018-11-04 11:00:00','2018-11-04 11:30:00','สุพรรณบุรี 1','หมายเหตุ','1970-01-01 00:00:00',1541307518,1.00,'2018-11-02','2019-05-09',NULL,8),
(10,NULL,NULL,NULL,'2018-11-23 11:12:39','2018-11-23 11:30:40','กข 71','เทส rice_var_seq','2018-11-26 00:00:00',1542946179,2000.00,'2018-11-21','2018-11-29',NULL,7),
(11,NULL,NULL,NULL,NULL,NULL,'กข 61',NULL,NULL,1549880169,3000.00,'2018-11-26','2019-05-26',NULL,6),
(12,NULL,NULL,NULL,'2018-11-25 23:30:50','2018-11-25 23:30:50','กข 57',NULL,'2018-11-25 00:00:00',1543163450,98.00,'2018-11-03','2019-05-24',NULL,5),
(13,NULL,NULL,NULL,NULL,NULL,'ประทุม',NULL,NULL,1543163450,19.00,'2018-11-25','2019-03-25',NULL,4),
(15,NULL,NULL,NULL,'2018-11-26 23:33:08','2018-11-26 23:33:08','กข 47','1543249987','2018-11-26 23:33:08',1543249987,100.00,'2018-11-02','2019-02-01',NULL,3),
(16,NULL,NULL,NULL,'2018-11-26 23:35:39','2018-11-26 23:35:39','กข 41','1543250139','2018-11-26 23:35:39',1543250139,1.00,'2018-11-01','2018-11-02',2,2),
(17,NULL,NULL,NULL,'2018-11-26 23:40:23','2018-11-26 23:40:23','ข้าวเหนียว','1543250423','2018-11-26 23:40:23',1543250423,3.00,'2018-11-01','2018-11-03',1,1),
(18,NULL,NULL,NULL,'2018-11-29 21:44:52','2018-11-29 21:46:52','สุพรรณบุรี 2',NULL,'2018-11-29 00:00:00',1543502692,380.00,'2018-11-29','2019-05-29',26,9),
(19,NULL,NULL,NULL,'2018-11-29 21:47:00','2018-11-29 21:47:00','ปทุมธานี 1',NULL,'2018-11-29 21:47:00',1543502819,4.00,'2018-11-29','2019-05-29',7,10),
(20,NULL,NULL,NULL,'2018-11-30 15:33:52','2018-11-30 15:33:52','กข 31',NULL,'2018-11-30 15:33:52',1543566832,4.00,'2018-11-01','2019-04-13',28,1),
(21,NULL,NULL,NULL,'2018-12-01 15:44:34','2018-12-01 15:44:34','กข 71','กข 71','2018-12-01 15:44:34',1543653874,1234.00,'2018-12-01','2019-07-01',26,7),
(22,NULL,NULL,NULL,'2018-12-01 22:25:44','2018-12-01 22:25:44','กข 71',NULL,'2018-12-01 22:25:44',1543677944,5000.00,'2018-12-06','2019-07-06',1,7),
(23,NULL,NULL,NULL,'2018-12-02 09:52:59','2018-12-02 10:00:59','ปทุมธานี 1','เทส default datepicker','2018-12-02 09:52:59',1543719178,6390.00,'2018-12-03','2019-07-03',7,10),
(24,NULL,NULL,NULL,'2018-12-02 23:46:53','2018-12-02 23:46:53','สุพรรณบุรี 2',NULL,'2018-12-02 23:46:53',1543769213,5477.00,'2018-12-02','2019-07-02',1,9),
(25,NULL,NULL,NULL,'2018-12-05 09:50:57','2018-12-05 09:50:57','กข 49',NULL,'2018-12-05 09:50:57',1543978257,9500.00,'2018-12-05','2019-07-05',31,4),
(26,NULL,NULL,NULL,'2018-12-06 14:18:18','2018-12-06 14:30:18','กข 41',NULL,'2018-12-06 21:18:18',1544105897,6500.00,'2018-12-06','2019-07-06',60,2),
(27,NULL,NULL,NULL,'2018-12-06 12:19:53','2018-12-06 12:23:53','กข 61',NULL,'2018-12-06 21:19:53',1544105992,8500.00,'2018-12-06','2019-07-06',37,6),
(28,NULL,NULL,NULL,'2018-12-06 14:20:54','2018-12-06 15:20:54','สุพรรณบุรี 1',NULL,'2018-12-06 21:20:54',1544106054,6878.00,'2018-12-06','2019-07-06',54,8),
(29,NULL,NULL,NULL,'2018-12-06 21:24:40','2018-12-06 21:24:40','กข 57',NULL,'2018-12-06 21:24:40',1544106279,5500.00,'2018-12-06','2019-07-06',56,5),
(30,NULL,NULL,NULL,'2018-12-06 21:25:11','2018-12-06 21:25:11','กข 31',NULL,'2018-12-06 21:25:11',1544106311,9615.00,'2018-12-06','2019-07-06',53,1),
(31,NULL,NULL,NULL,'2018-12-06 21:25:27','2018-12-06 21:25:27','กข 47',NULL,'2018-12-06 21:25:27',1544106327,7523.00,'2018-12-06','2019-07-06',33,3),
(32,NULL,NULL,NULL,'2018-12-06 22:44:11','2018-12-06 22:44:11','กข 57',NULL,'2018-12-06 22:44:11',1544111051,10000.00,'2018-12-06','2019-07-06',1,5),
(33,NULL,NULL,NULL,'2018-12-07 09:37:28','2018-12-07 09:37:28','กข 49',NULL,'2018-12-07 09:37:28',1544150247,2500.00,'2018-12-08','2019-07-08',45,4),
(34,NULL,NULL,NULL,'2018-12-08 14:14:58','2018-12-08 14:14:58','กข 41',NULL,'2018-12-08 14:14:58',1544253298,NULL,NULL,NULL,43,2);

/*Table structure for table `product_det` */

DROP TABLE IF EXISTS `product_det`;

CREATE TABLE `product_det` (
  `product_det_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `lot_id` varchar(20) DEFAULT NULL COMMENT 'รหัสล็อต',
  `product_id` varchar(20) DEFAULT NULL COMMENT 'รหัสสินค้า',
  `price` decimal(10,2) DEFAULT NULL COMMENT 'ราคา',
  `mfd_date` date DEFAULT NULL COMMENT 'วันที่ผลิต',
  `exp_date` date DEFAULT NULL COMMENT 'วันหมดอายุ',
  `qty` int(11) DEFAULT NULL COMMENT 'จำนวนที่มีในคลัง',
  PRIMARY KEY (`product_det_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `product_det` */

/*Table structure for table `product_type` */

DROP TABLE IF EXISTS `product_type`;

CREATE TABLE `product_type` (
  `product_type_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `product_type_id` varchar(20) DEFAULT NULL COMMENT 'รหัสประเภทสินค้า',
  `product_type_name` varchar(100) DEFAULT NULL COMMENT 'ชื่อประเภทสินค้า',
  PRIMARY KEY (`product_type_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `product_type` */

/*Table structure for table `rice_varieties` */

DROP TABLE IF EXISTS `rice_varieties`;

CREATE TABLE `rice_varieties` (
  `rice_var_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `rice_var_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'รหัสสายพันธุ์',
  `rice_var_name` varchar(100) DEFAULT NULL COMMENT 'ชื่อสายพันธุ์',
  `price` decimal(10,2) DEFAULT NULL COMMENT 'ราคา',
  `product_type_seq` int(11) DEFAULT NULL COMMENT 'FK ประเภทสินค้า',
  PRIMARY KEY (`rice_var_seq`),
  KEY `rice_var_id` (`rice_var_id`),
  KEY `FK_rice_varieties_product_type` (`product_type_seq`),
  CONSTRAINT `FK_rice_varieties_product_type` FOREIGN KEY (`product_type_seq`) REFERENCES `product_det` (`product_det_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `rice_varieties` */

insert  into `rice_varieties`(`rice_var_seq`,`rice_var_id`,`rice_var_name`,`price`,`product_type_seq`) values 
(1,'00001','กข 31',390.00,NULL),
(2,'00002','กข 41',390.00,NULL),
(3,'00003','กข 47',390.00,NULL),
(4,'00004','กข 49',390.00,NULL),
(5,'00005','กข 57',390.00,NULL),
(6,'00006','กข 61',390.00,NULL),
(7,'00007','กข 71',390.00,NULL),
(8,'00008','สุพรรณบุรี 1',390.00,NULL),
(9,'00009','สุพรรณบุรี 2',390.00,NULL),
(10,'00010','ปทุมธานี 1',450.00,NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_seq` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลข gen',
  `username` varchar(50) DEFAULT NULL COMMENT 'ชื่อผู้ใช้',
  `password` varchar(50) DEFAULT NULL COMMENT 'รหัสผ่าน',
  `user_role` varchar(1) DEFAULT NULL COMMENT 'สิทธิ์ผู้ใช้งาน 1=Admin 2=Superuser 3=user',
  `stat_menu_flg` varchar(1) DEFAULT NULL COMMENT '1=เปิด 0=ปิด เมนูสถิติ',
  `cashier_menu_flag` varchar(1) DEFAULT NULL COMMENT '1=เปิด 0=ปิด เมนูขายสินค้า',
  `product_menu_flag` varchar(1) DEFAULT NULL COMMENT '1=เปิด 0=ปิด เมนูจัดการข้อมูลสินค้า',
  `rice_var_menu_flag` varchar(1) DEFAULT NULL COMMENT '1=เปิด 0=ปิด เมนูจัดการข้อมูลสายพันธุ์ข้าว',
  `member_menu_flag` varchar(1) DEFAULT NULL COMMENT '1=เปิด 0=ปิด เมนูจัดการข้อมูลสมาชิก',
  `noti_menu_flag` varchar(1) DEFAULT NULL COMMENT '1=เปิด 0=ปิด เมนูแจ้งเตือน',
  `user_fname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'ชื่อ',
  `user_lname` varchar(50) DEFAULT NULL COMMENT 'นามสุกล',
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`user_seq`,`username`,`password`,`user_role`,`stat_menu_flg`,`cashier_menu_flag`,`product_menu_flag`,`rice_var_menu_flag`,`member_menu_flag`,`noti_menu_flag`,`user_fname`,`user_lname`) values 
(1,'admin','1234','1','1','1','1','1','1','1','Administrator','Managestock');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
