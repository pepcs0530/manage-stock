/*
SQLyog Community v12.5.0 (64 bit)
MySQL - 8.0.12 : Database - db_managestock
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
  PRIMARY KEY (`member_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `member` */

insert  into `member`(`member_seq`,`member_id`,`member_fname`,`member_lname`,`member_license_place`,`telephone`,`address`) values 
(1,'00001','วาสนา','สุวรรณบำรุงชัย','กข-1234','0812345678',NULL),
(2,'00002','อภิวิชญ์','สังข์เมือง','งง-5555','1234567899',NULL);

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
  PRIMARY KEY (`pick_up_seq`)
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
  PRIMARY KEY (`product_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`product_seq`,`product_id`,`product_name`,`product_type_id`,`time_in`,`time_out`,`rice_varieties`,`remark`,`date`,`lot_id`) values 
(3,NULL,NULL,NULL,'2018-10-18 23:28:29','2018-10-18 23:30:29','หอมมะลิ','หมายเหตุ','2018-10-18',1539880169);

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

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
