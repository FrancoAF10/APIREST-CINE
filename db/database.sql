CREATE DATABASE CINE;
USE CINE;

CREATE TABLE PELICULAS(
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(200)NOT NULL,
duracion SMALLINT NOT NULL,
clasificacion ENUM('APT','+14','+18') NOT NULL DEFAULT 'APT',
alanzamiento CHAR(4) NOT NULL
)ENGINE= INNODB;


INSERT INTO PELICULAS (titulo, duracion, clasificacion, alanzamiento)VALUES
('Sherk',110,'APT','2001'),
('Volver al Futuro I',125,'APT','1980'),
('Avengers End Game',180,'APT','2022');

SELECT* FROM PELICULAS;