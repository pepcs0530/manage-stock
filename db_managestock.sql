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
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_managestock` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;

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
('C000000002','tom3','0800000001','rat');

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `member` */

insert  into `member`(`member_seq`,`member_id`,`member_fname`,`member_lname`,`member_license_place`,`telephone`,`address`) values 
(1,'00001','วาสนา','สุวรรณบำรุงชัย','กข-1234','0812345678',NULL),
(2,'00002','อภิวิชญ์','สังข์เมือง','บล-1234','1234567899','12345'),
(7,'00007','ณัฐภัทร','ปนานนท์','ฎถ-8397','0816155053','กรุงเทพ1'),
(8,'00008','Purmpon','Kurung','กก 9999','080008080','Ratchathewi'),
(9,'00009','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(10,'00010','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(11,'00011','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(12,'00012','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(13,'00013','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(14,'14','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(15,'00015','เพิ่มพล','กุรัง','กกก-9999','080008000','423/9 ratchathewi'),
(16,'0001x','x','x','x','x','x');

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receipt` varchar(10) NOT NULL,
  `issuedate` datetime NOT NULL,
  `customer_id` varchar(10) NOT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  `member_seq` int(11) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `order` */

insert  into `order`(`order_id`,`receipt`,`issuedate`,`customer_id`,`discount`,`member_seq`) values 
('p000000001','r000000001','2018-11-05 23:35:46','c000000001',10,0),
('P000000002','R000000002','2018-11-10 15:01:22','C000000001',0,0),
('P000000003','R000000003','2018-11-11 23:26:24','C000000001',10,0);

/*Table structure for table `order_item` */

DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
  `id` varchar(10) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `price` decimal(10,0) NOT NULL DEFAULT '0',
  `order_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_order` (`order_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `order_item` */

insert  into `order_item`(`id`,`product_id`,`quantity`,`price`,`order_id`) values 
('x000000001','test',2,100,'z000000001');

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
  `date` date DEFAULT NULL COMMENT 'วันที่บันทึก',
  `lot_id` int(11) DEFAULT NULL COMMENT 'เลข lot',
  `product_quantity` decimal(10,2) DEFAULT NULL COMMENT 'จำนวนกระสอบ',
  `mfd_date` date DEFAULT NULL COMMENT 'วันที่ผลิต',
  `exp_date` date DEFAULT NULL COMMENT 'วันที่หมดอายุ',
  `member_seq` int(11) DEFAULT NULL COMMENT 'fk(member)',
  PRIMARY KEY (`product_seq`),
  KEY `product_id` (`product_id`),
  KEY `member_seq` (`member_seq`),
  KEY `lot_id` (`lot_id`),
  KEY `product_type_id` (`product_type_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`product_seq`,`product_id`,`product_name`,`product_type_id`,`time_in`,`time_out`,`rice_varieties`,`remark`,`date`,`lot_id`,`product_quantity`,`mfd_date`,`exp_date`,`member_seq`) values 
(3,NULL,NULL,NULL,'2018-10-18 23:28:29','2018-10-18 23:30:29','หอมมะลิ','หมายเหตุ','2018-10-18',1549880169,NULL,NULL,NULL,NULL),
(4,NULL,NULL,NULL,NULL,NULL,'หอมมะลิ',NULL,NULL,1539880169,1.00,'2018-10-01','2018-11-02',NULL),
(5,NULL,NULL,NULL,'1970-01-01 07:00:00','1970-01-01 07:00:00','ป',NULL,'2018-11-01',1541059136,NULL,NULL,NULL,NULL),
(8,NULL,NULL,NULL,'2018-11-04 11:00:00','2018-11-04 11:30:00','หอมมะลิ','หมายเหตุ','1970-01-01',1541307518,NULL,NULL,NULL,NULL),
(9,NULL,NULL,NULL,'2018-11-04 11:00:00','2018-11-04 11:30:00',NULL,'หมายเหตุ','1970-01-01',1541307518,NULL,NULL,NULL,NULL);

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
  PRIMARY KEY (`rice_var_seq`),
  KEY `rice_var_id` (`rice_var_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `rice_varieties` */

insert  into `rice_varieties`(`rice_var_seq`,`rice_var_id`,`rice_var_name`,`price`) values 
(1,'r0001','หอมมะลิ',100.00),
(2,'r0002','ประทุม',150.00),
(3,'r0003','ทาง',111.00),
(7,'r0005','ทดสอบเพิ่ม',777.00),
(8,'r006','ข้าวเหนียว',456.00);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
