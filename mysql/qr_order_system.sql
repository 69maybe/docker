-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 13, 2025 at 10:53 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qr_order_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `ban_an`
--

DROP TABLE IF EXISTS `ban_an`;
CREATE TABLE IF NOT EXISTS `ban_an` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_ban` varchar(10) NOT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `trang_thai` enum('trong','co_nguoi') DEFAULT 'trong',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_ban` (`ma_ban`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ban_an`
--

INSERT INTO `ban_an` (`id`, `ma_ban`, `qr_code`, `trang_thai`) VALUES
(1, 'B01', 'http://localhost:8386/dat-mon?ban=B01', 'co_nguoi'),
(2, 'B02', 'http://localhost:8386/dat-mon?ban=B02', 'co_nguoi'),
(3, 'B03', 'http://localhost:8386/dat-mon?ban=B03', 'trong'),
(4, 'B04', 'http://localhost:8386/dat-mon?ban=B04', 'trong'),
(5, 'B05', 'http://localhost:8386/dat-mon?ban=B05', 'trong');

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_don_hang`
--

DROP TABLE IF EXISTS `chi_tiet_don_hang`;
CREATE TABLE IF NOT EXISTS `chi_tiet_don_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `don_hang_id` int DEFAULT NULL,
  `mon_an_id` int DEFAULT NULL,
  `so_luong` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `don_hang_id` (`don_hang_id`),
  KEY `mon_an_id` (`mon_an_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chi_tiet_don_hang`
--

INSERT INTO `chi_tiet_don_hang` (`id`, `don_hang_id`, `mon_an_id`, `so_luong`) VALUES
(1, 1, 1, 2),
(2, 1, 3, 1),
(3, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `don_hang`
--

DROP TABLE IF EXISTS `don_hang`;
CREATE TABLE IF NOT EXISTS `don_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ban_id` int DEFAULT NULL,
  `trang_thai` enum('cho_xu_ly','dang_chuan_bi','da_phuc_vu','huy') DEFAULT 'cho_xu_ly',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tong_tien` decimal(10,2) DEFAULT '0.00',
  `da_thanh_toan` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_donhang_banan` (`ban_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `don_hang`
--

INSERT INTO `don_hang` (`id`, `ban_id`, `trang_thai`, `ngay_tao`, `tong_tien`, `da_thanh_toan`) VALUES
(1, 1, 'cho_xu_ly', '2025-10-23 09:02:41', 130000.00, 0),
(2, 2, 'dang_chuan_bi', '2025-10-23 09:02:41', 50000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `mon_an`
--

DROP TABLE IF EXISTS `mon_an`;
CREATE TABLE IF NOT EXISTS `mon_an` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_mon` varchar(100) NOT NULL,
  `mo_ta` text,
  `gia` decimal(10,2) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '1',
  `loai_mon` enum('mon_chinh','nuoc_uong','phu_kien') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mon_an`
--

INSERT INTO `mon_an` (`id`, `ten_mon`, `mo_ta`, `gia`, `hinh_anh`, `trang_thai`, `loai_mon`) VALUES
(1, 'Phở bò', 'Món truyền thống Việt Nam', 45000.00, 'pho-bo.jpg', 1, 'mon_chinh'),
(2, 'Bún chả', 'Đặc sản Hà Nội', 50000.00, 'bun-cha.jpg', 1, 'mon_chinh'),
(3, 'Cơm tấm', 'Cơm tấm sườn bì chả', 40000.00, 'com-tam.jpg', 1, 'mon_chinh'),
(4, 'Trà đá', 'S-tier nước giải khát, vua của mọi loại đồ uống', 2000.00, 'tra-da.jpg', 1, 'nuoc_uong'),
(5, 'Nước suối', 'Nước suối 500ml', 10000.00, 'nuoc-suoi.jpg', 1, 'nuoc_uong'),
(6, 'Coca-Cola', 'Giải khát cực mạnh', 15000.00, 'coca.jpg', 1, 'nuoc_uong'),
(7, 'Khăn ướt', 'Khăn ướt Negav dùng một lần', 3000.00, 'khan-uot.jpg', 1, 'phu_kien'),
(8, 'Khăn giấy', 'Khăn giấy lau mồm', 2000.00, 'khan-giay.jpg', 1, 'phu_kien'),
(9, 'Muỗng nhựa', 'Muỗng dùng một lần', 1000.00, 'muong.jpg', 1, 'phu_kien');

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE IF NOT EXISTS `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_dang_nhap` varchar(50) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `vai_tro` enum('admin','nhanvien') NOT NULL,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ten_dang_nhap` (`ten_dang_nhap`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`id`, `ten_dang_nhap`, `mat_khau`, `vai_tro`, `ngay_tao`) VALUES
(1, 'admin', '$2a$10$abc1234567890abcdefghi1234567890abcdefghi1234567890', 'admin', '2025-10-23 08:59:07'),
(2, 'nhanvien1', '$2a$10$xyz1234567890abcdefghi1234567890abcdefghi1234567890', 'nhanvien', '2025-10-23 08:59:07');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
