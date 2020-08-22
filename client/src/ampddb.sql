-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 12, 2020 at 11:52 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ampddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `UserID` int(11) NOT NULL,
  `FName` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `LName` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Username` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `PasswordHash` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `AccountType` int(11) NOT NULL DEFAULT '2',
  `CreatedTimestamp` timestamp NOT NULL,
  `ConsentBool` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`UserID`, `FName`, `LName`, `Username`, `PasswordHash`, `AccountType`, `CreatedTimestamp`, `ConsentBool`) VALUES
(1, 'Kyle', 'Rathman', 'kyle.rathman', '$2b$10$i1/DAYC39YahDvysa4sBOetAL6SDDIm9gNwPEeUXd0BUtIcoQpVkq', 2, '2020-02-12 16:06:29', 0),
(3, 'Bill', 'Pullman', 'bill.pullman', '$2b$10$lLTqo7lqK5.eX9QV8tVDGOXWbJiA01FfwUQVnCXVxdgc5QIfPvtBy', 2, '2020-02-12 17:19:05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `ClassID` int(11) NOT NULL,
  `ClassName` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `ClassCode` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `UniversityID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_question`
--

CREATE TABLE `class_question` (
  `ClassID` int(11) NOT NULL,
  `ClassQID` int(11) NOT NULL,
  `ClassQuestion` varchar(120) COLLATE utf8mb4_general_ci NOT NULL,
  `QuestionAnswer` varchar(120) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_response`
--

CREATE TABLE `class_response` (
  `UserID` int(11) NOT NULL,
  `Timestamp` timestamp NOT NULL,
  `ClassID` int(11) NOT NULL,
  `ClassQID` int(11) NOT NULL,
  `ClassAnswer` varchar(120) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `is_administered_by`
--

CREATE TABLE `is_administered_by` (
  `ClassID` int(11) NOT NULL,
  `AdminID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `is_enrolled_in`
--

CREATE TABLE `is_enrolled_in` (
  `StudentID` int(11) NOT NULL,
  `ClassID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200210005652-create_account_table.js'),
('20200210011613-create_class_table.js'),
('20200210014135-create_classQuestion_table.js'),
('20200210014202-create_classResponse_table.js'),
('20200210014240-create_isAdministeredBy_table.js'),
('20200210014303-create_isEnrolledIn_table.js'),
('20200210014324-create_surveyQuestion_table.js'),
('20200210014351-create_surveyResponse_table.js'),
('20200210014409-create_university_table.js');

-- --------------------------------------------------------

--
-- Table structure for table `survey_question`
--

CREATE TABLE `survey_question` (
  `ClassID` int(11) NOT NULL,
  `SurveyQID` int(11) NOT NULL,
  `SurveyQuestion` varchar(120) COLLATE utf8mb4_general_ci NOT NULL,
  `AnswerRange` int(11) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey_response`
--

CREATE TABLE `survey_response` (
  `UserID` int(11) NOT NULL,
  `Timestamp` timestamp NOT NULL,
  `ClassID` int(11) NOT NULL,
  `SurveyQID` int(11) NOT NULL,
  `SurveyAnswer` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `UID` int(11) NOT NULL,
  `UniveristyName` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `TimeZone` varchar(45) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`ClassID`,`ClassCode`),
  ADD KEY `C_UID` (`UniversityID`);

--
-- Indexes for table `class_question`
--
ALTER TABLE `class_question`
  ADD PRIMARY KEY (`ClassID`,`ClassQID`),
  ADD UNIQUE KEY `CQID` (`ClassQID`);

--
-- Indexes for table `class_response`
--
ALTER TABLE `class_response`
  ADD PRIMARY KEY (`UserID`,`Timestamp`,`ClassID`,`ClassQID`),
  ADD KEY `CR_CID` (`ClassID`),
  ADD KEY `CR_CQID` (`ClassQID`);

--
-- Indexes for table `is_administered_by`
--
ALTER TABLE `is_administered_by`
  ADD PRIMARY KEY (`ClassID`,`AdminID`),
  ADD KEY `IAB_AID` (`AdminID`);

--
-- Indexes for table `is_enrolled_in`
--
ALTER TABLE `is_enrolled_in`
  ADD PRIMARY KEY (`StudentID`,`ClassID`),
  ADD KEY `IEI_CID` (`ClassID`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `survey_question`
--
ALTER TABLE `survey_question`
  ADD PRIMARY KEY (`ClassID`,`SurveyQID`),
  ADD UNIQUE KEY `SQID` (`SurveyQID`);

--
-- Indexes for table `survey_response`
--
ALTER TABLE `survey_response`
  ADD PRIMARY KEY (`UserID`,`Timestamp`,`ClassID`,`SurveyQID`),
  ADD KEY `SR_CID` (`ClassID`),
  ADD KEY `SR_SID` (`SurveyQID`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`UID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `ClassID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `class_question`
--
ALTER TABLE `class_question`
  MODIFY `ClassQID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey_question`
--
ALTER TABLE `survey_question`
  MODIFY `SurveyQID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `C_UID` FOREIGN KEY (`UniversityID`) REFERENCES `university` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `class_question`
--
ALTER TABLE `class_question`
  ADD CONSTRAINT `CQ_CID` FOREIGN KEY (`ClassID`) REFERENCES `class` (`ClassID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `class_response`
--
ALTER TABLE `class_response`
  ADD CONSTRAINT `CR_CID` FOREIGN KEY (`ClassID`) REFERENCES `class` (`ClassID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `CR_CQID` FOREIGN KEY (`ClassQID`) REFERENCES `class_question` (`ClassQID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `CR_UID` FOREIGN KEY (`UserID`) REFERENCES `account` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `is_administered_by`
--
ALTER TABLE `is_administered_by`
  ADD CONSTRAINT `IAB_AID` FOREIGN KEY (`AdminID`) REFERENCES `account` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `IAB_CID` FOREIGN KEY (`ClassID`) REFERENCES `class` (`ClassID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `is_enrolled_in`
--
ALTER TABLE `is_enrolled_in`
  ADD CONSTRAINT `IEI_CID` FOREIGN KEY (`ClassID`) REFERENCES `class` (`ClassID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `IEI_SID` FOREIGN KEY (`StudentID`) REFERENCES `account` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `survey_question`
--
ALTER TABLE `survey_question`
  ADD CONSTRAINT `SQ_CID` FOREIGN KEY (`ClassID`) REFERENCES `class` (`ClassID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `survey_response`
--
ALTER TABLE `survey_response`
  ADD CONSTRAINT `SR_CID` FOREIGN KEY (`ClassID`) REFERENCES `class` (`ClassID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `SR_SID` FOREIGN KEY (`SurveyQID`) REFERENCES `survey_question` (`SurveyQID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `SR_UID` FOREIGN KEY (`UserID`) REFERENCES `account` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
