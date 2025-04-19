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

INSERT INTO cities (name, population, altitude, foundation_date, age, area, density) VALUES
    ('Zaragoza', 700000, 200, '1000-01-01', 1000, 734734, 2373),
    ('Madrid', 5000000, 500, '1200-01-01', 800, 344734, 23473);