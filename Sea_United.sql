-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Okt 2020 um 17:50
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
-- Datenbank: `sea_united`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `benutzername` char(20) NOT NULL,
  `passwort` varchar(200) NOT NULL,
  `e_mail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`benutzername`, `passwort`, `e_mail`) VALUES
('admin', 'admin', 'admin@admin.de'),
('beeke', 'wiltfang', '19253@lehre.dhbw-stuttgart.de'),
('melissa', 'negele', '19161@lehre.dhbw-stuttgart.de'),
('nicole', 'widmayer', '19063@lehre.dhbw-stuttgart.de'),
('tobias', 'hartmann', '19126@lehre.dhbw-stuttgart.de');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `boote`
--

CREATE TABLE `boote` (
  `kennung` char(20) NOT NULL,
  `preis` decimal(6,2) NOT NULL,
  `kapazität` int(2) NOT NULL,
  `kategorie` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `boote`
--

INSERT INTO `boote` (`kennung`, `preis`, `kapazität`, `kategorie`) VALUES
('katamaran01', '200.00', 20, 'Drunken Sailor'),
('segelboot11', '50.00', 2, 'Zeit zu Zweit'),
('segelboot21', '100.00', 10, 'Segeln tut man selten allein'),
('yacht01', '150.00', 10, 'Luxus gönnt man sich');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termine`
--

CREATE TABLE `termine` (
  `datum` date NOT NULL,
  `boot` char(20) NOT NULL,
  `gebucht` tinyint(1) DEFAULT 0,
  `ID` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `termine`
--

INSERT INTO `termine` (`datum`, `boot`, `gebucht`, `ID`) VALUES
('2020-11-08', 'katamaran01', 1, 1),
('2020-11-10', 'segelboot11', 1, 2),
('2020-11-13', 'segelboot21', 1, 3),
('2020-11-16', 'yacht01', 1, 4),
('2020-12-01', 'katamaran01', 0, 5),
('2020-12-02', 'segelboot11', 0, 6),
('2020-12-03', 'segelboot21', 0, 7),
('2020-12-04', 'yacht01', 0, 8);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`benutzername`);

--
-- Indizes für die Tabelle `boote`
--
ALTER TABLE `boote`
  ADD PRIMARY KEY (`kennung`);

--
-- Indizes für die Tabelle `termine`
--
ALTER TABLE `termine`
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `boot` (`boot`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `termine`
--
ALTER TABLE `termine`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `termine`
--
ALTER TABLE `termine`
  ADD CONSTRAINT `Termine_ibfk_1` FOREIGN KEY (`boot`) REFERENCES `boote` (`kennung`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
