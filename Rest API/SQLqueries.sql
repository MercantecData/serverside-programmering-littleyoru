DROP DATABASE IF EXISTS BookingSystem;
CREATE DATABASE BookingSystem;

USE BookingSystem;

CREATE TABLE Rooms (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nr VARCHAR(10) NOT NULL,
    Alias VARCHAR(50) NULL,
    Floor INT NOT NULL
);


INSERT INTO Rooms (Nr, Alias, Floor) VALUES 
('A29', 'Meeting', 0), ('A30', 'Steve Jobs', 0),
('A31', 'Bill Gates', 0), ('A33', 'Alan Turing', 0),
('C01', 'Group', 0), ('A1.38', 'Square', 1),
('A1.39', 'Glass', 1), ('A1.40', '', 1),
('A1.41', 'Linus Torvalds', 1);



CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Initials VARCHAR(4) NULL
);



INSERT INTO Users (Name, Initials) VALUES
('Mads', 'MB'), ('Jakup', 'JK'), ('Bjarne', 'BJ'),
('Bjarke', 'BK'), ('Jesper', 'JS'), ('Henrik', 'HK');




CREATE TABLE Bookings (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    BookDate DATETIME NOT NULL,
    Subject VARCHAR(50) NULL DEFAULT 'P',
    RoomId INT NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (RoomId) REFERENCES Rooms(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);



INSERT INTO Bookings (BookDate, RoomId, UserId) 
VALUES 
(CURRENT_TIMESTAMP - INTERVAL 32 DAY, 4, 2),
(CURRENT_TIMESTAMP - INTERVAL 31 DAY, 4, 2),
(CURRENT_TIMESTAMP - INTERVAL 30 DAY, 4, 2),
(CURRENT_TIMESTAMP - INTERVAL 29 DAY, 4, 2),
(CURRENT_TIMESTAMP - INTERVAL 16 DAY, 4, 2), 
(CURRENT_TIMESTAMP - INTERVAL 16 DAY, 4, 1),
(CURRENT_TIMESTAMP - INTERVAL 15 DAY, 1, 1), 
(CURRENT_TIMESTAMP - INTERVAL 15 DAY, 7, 4),
(CURRENT_TIMESTAMP - INTERVAL 14 DAY, 9, 1), 
(CURRENT_TIMESTAMP - INTERVAL 14 DAY, 3, 5),
(CURRENT_TIMESTAMP - INTERVAL 10 DAY, 4, 1), 
(CURRENT_TIMESTAMP - INTERVAL 10 DAY, 7, 4),
(CURRENT_TIMESTAMP - INTERVAL 2 DAY, 3, 1), 
(CURRENT_TIMESTAMP - INTERVAL 2 DAY, 8, 6),
(CURRENT_TIMESTAMP - INTERVAL 1 DAY, 1, 2), 
(CURRENT_TIMESTAMP - INTERVAL 1 DAY, 4, 1), 
(CURRENT_TIMESTAMP - INTERVAL 1 DAY, 7, 4),
(CURRENT_TIMESTAMP, 1, 2), (CURRENT_TIMESTAMP, 3, 1),
(CURRENT_TIMESTAMP, 2, 4), (CURRENT_TIMESTAMP, 7, 3),
(CURRENT_TIMESTAMP, 4, 2);



CREATE TABLE Tokens (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    TokenName VARCHAR(50) NOT NULL,
    UserName VARCHAR(50) NOT NULL
);


INSERT INTO Tokens (TokenName, UserName) VALUES ('202cb962ac59075b964b07152d234b70', 'Elena');




