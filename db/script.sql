CREATE DATABASE cities;

GRANT ALL PRIVILEGES ON cities.* TO user;

USE cities;

CREATE TABLE cities (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    population INT,
    altitude FLOAT,
    foundation_date DATE,
    age INT,
    area INT,
    density FLOAT
);
