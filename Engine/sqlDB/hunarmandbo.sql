-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2021 at 11:50 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

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

-- --------------------------------------------------------

--
-- Table structure for table `landingpagepost`
--

CREATE TABLE `landingpagepost` (
  `postId` int(11) NOT NULL,
  `title` longtext NOT NULL,
  `body` longtext NOT NULL,
  `imageurl` longtext NOT NULL,
  `target` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `landingpagepost`
--

INSERT INTO `landingpagepost` (`postId`, `title`, `body`, `imageurl`, `target`) VALUES
(1, 'Advertisement', 'If you see this message contact Aamir', 'http://www.hello.com/img_/hellowithwaves.png', '2'),
(2, 'Advertisement', 'If you see this message contact Aamir', '', '1');

-- --------------------------------------------------------

--
-- Table structure for table `landingpageslider`
--

CREATE TABLE `landingpageslider` (
  `sliderId` int(11) NOT NULL,
  `imageurl` longtext NOT NULL,
  `target` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `landingpageslider`
--

INSERT INTO `landingpageslider` (`sliderId`, `imageurl`, `target`) VALUES
(1, 'http://www.hello.com/img_/hellowithwaves.png', '2'),
(2, '', '1');

-- --------------------------------------------------------

--
-- Table structure for table `userreviews`
--

CREATE TABLE `userreviews` (
  `ID` int(11) NOT NULL,
  `ORDERID` varchar(200) NOT NULL,
  `USERID` varchar(200) NOT NULL,
  `REVIEWEEID` varchar(200) NOT NULL,
  `COMMENT` varchar(500) NOT NULL,
  `RATING` decimal(10,0) NOT NULL,
  `DATE` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userreviews`
--

INSERT INTO `userreviews` (`ID`, `ORDERID`, `USERID`, `REVIEWEEID`, `COMMENT`, `RATING`, `DATE`) VALUES
(4, 'gwagwag', 'USERwagwagweagID', 'REVIEedsgdsgrdsgesWEEID', 'COMMgesfdsfesfesENT', '89', '2021-04-27 02:45:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `agentuseridunique` (`freelancerid`);

--
-- Indexes for table `landingpagepost`
--
ALTER TABLE `landingpagepost`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `landingpageslider`
--
ALTER TABLE `landingpageslider`
  ADD PRIMARY KEY (`sliderId`);

--
-- Indexes for table `userreviews`
--
ALTER TABLE `userreviews`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `landingpagepost`
--
ALTER TABLE `landingpagepost`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `landingpageslider`
--
ALTER TABLE `landingpageslider`
  MODIFY `sliderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userreviews`
--
ALTER TABLE `userreviews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
