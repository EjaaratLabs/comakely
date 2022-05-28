-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2021 at 06:41 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hunarmandbo`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `freelancerid` varchar(64) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `cnic` varchar(64) DEFAULT NULL,
  `gender` varchar(64) DEFAULT NULL,
  `status` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `area` varchar(64) DEFAULT NULL,
  `gpslat` float DEFAULT NULL,
  `gpslong` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agents`
--

INSERT INTO `agents` (`id`, `freelancerid`, `name`, `phone`, `cnic`, `gender`, `status`, `email`, `area`, `gpslat`, `gpslong`) VALUES
(1, 'KNbDjdb59S2X3Kz3B6FD', 'Aamir', '03040258189', '562791865271', 'Mard', '0', 'aamirvakeel1@gmail.com', 'Apna ilaqa', 24.8918, 67.0559),
(2, 'JdAUp0FJ5cmq47zkXMoQ', 'Aamir', '+923042048021', '562791865271', 'Mard', '0', 'aamirvakeel1@gmail.com', 'Apna ilaqa', 24.8918, 67.0559),
(3, 'mF3MxBDrQ0QLUpoz9HWQGmbRMsL2', 'Aamir', '+923042048021', '562791865271', 'Mard', '0', 'aamirvakeel1@gmail.com', 'Apna ilaqa', 24.8918, 67.0559);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
