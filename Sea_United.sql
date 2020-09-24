-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 23. Sep 2020 um 17:06
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `Sea United`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Admin`
--

CREATE TABLE `Admin` (
  `benutzername` char(20) NOT NULL,
  `passwort` char(200) NOT NULL,
  `e_mail` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `Admin`
--

INSERT INTO `Admin` (`benutzername`, `passwort`, `e_mail`) VALUES
('admin', 'admin', 'admin@admin.de');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Benutzer`
--

CREATE TABLE `Benutzer` (
  `benutzername` char(20) NOT NULL,
  `passwort` char(200) NOT NULL,
  `e_mail` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `Benutzer`
--

INSERT INTO `Benutzer` (`benutzername`, `passwort`, `e_mail`) VALUES
('admin', 'admin', 'admin@admin.de'),
('beeke', 'wiltfang', '19253@lehre.dhbw-stuttgart.de'),
('melissa', 'negele', '19161@lehre.dhbw-stuttgart.de'),
('nicole', 'widmayer', '19063@lehre.dhbw-stuttgart.de'),
('tobias', 'hartmann', '19126@lehre.dhbw-stuttgart.de');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Boote`
--

CREATE TABLE `Boote` (
  `kennung` char(20) NOT NULL,
  `preis` decimal(6,2) NOT NULL,
  `kapazität` int(2) NOT NULL,
  `kategorie` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `Boote`
--

INSERT INTO `Boote` (`kennung`, `preis`, `kapazität`, `kategorie`) VALUES
('katamaran01', '200.00', 20, 'Drunken Sailor'),
('segelboot11', '50.00', 2, 'Zeit zu Zweit'),
('segelboot21', '100.00', 10, 'Segeln tut man selten allein'),
('yacht01', '150.00', 10, 'Luxus gönnt man sich');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Termine`
--

CREATE TABLE `Termine` (
  `datum` date NOT NULL,
  `boot` char(20) NOT NULL,
  `gebucht` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `Termine`
--

INSERT INTO `Termine` (`datum`, `boot`, `gebucht`) VALUES
('2020-09-25', 'yacht01', 0),
('2020-09-26', 'segelboot11', 0),
('2020-09-27', 'segelboot21', 0),
('2020-09-28', 'katamaran01', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Admin`
--
ALTER TABLE `Admin`
  ADD UNIQUE KEY `benutzername` (`benutzername`);

--
-- Indizes für die Tabelle `Benutzer`
--
ALTER TABLE `Benutzer`
  ADD PRIMARY KEY (`benutzername`);

--
-- Indizes für die Tabelle `Boote`
--
ALTER TABLE `Boote`
  ADD PRIMARY KEY (`kennung`);

--
-- Indizes für die Tabelle `Termine`
--
ALTER TABLE `Termine`
  ADD KEY `boot` (`boot`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Admin`
--
ALTER TABLE `Admin`
  ADD CONSTRAINT `Admin_ibfk_1` FOREIGN KEY (`benutzername`) REFERENCES `Benutzer` (`benutzername`);

--
-- Constraints der Tabelle `Termine`
--
ALTER TABLE `Termine`
  ADD CONSTRAINT `Termine_ibfk_1` FOREIGN KEY (`boot`) REFERENCES `Boote` (`kennung`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
