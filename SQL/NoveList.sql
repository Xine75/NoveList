USE [master]
GO

IF db_id('NoveList') IS NULL
	CREATE DATABASE [NoveList]

GO

USE [NoveList]
GO

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Shelves;
DROP TABLE IF EXISTS Friends;

CREATE TABLE [Users] (
  [id] int NOT NULL PRIMARY KEY IDENTITY(1, 1),
  [firebaseId] int NOT NULL,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [userName] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL,
  [password] nvarchar(255)
)
GO

CREATE TABLE [Books] (
  [id] int NOT NULL PRIMARY KEY,
  [googleApiId] int NOT NULL,
  [Rating] int,
  [startDate] datetime,
  [finishDate] datetime,
  [userId] int NOT NULL,
  [shelfId] nvarchar(255)
)
GO

CREATE TABLE [Notes] (
  [id] int,
  [pageNum] int,
  [content] nvarchar(255),
  [bookId] int
)
GO

CREATE TABLE [Shelves] (
  [id] int,
  [name] nvarchar(255)
)
GO

CREATE TABLE [Friends] (
  [id] int,
  [friend1Id] int,
  [friend2Id] int
)
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Notes] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO

ALTER TABLE [Shelves] ADD FOREIGN KEY ([id]) REFERENCES [Books] ([shelfId])
GO

ALTER TABLE [Friends] ADD FOREIGN KEY ([friend1Id]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Friends] ADD FOREIGN KEY ([friend2Id]) REFERENCES [Users] ([id])
GO
