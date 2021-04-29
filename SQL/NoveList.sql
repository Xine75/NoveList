USE [master]
GO
IF db_id('NoveList') IS NULL
	CREATE DATABASE [NoveList]
GO
USE [NoveList]
GO

DROP TABLE IF EXISTS[UserProfile];
DROP TABLE IF EXISTS[Book];
DROP TABLE IF EXISTS[Note];
DROP TABLE IF EXISTS[Shelf];
DROP TABLE IF EXISTS[Friend];

CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY IDENTITY NOT NULL(1, 1),
  [firebaseId] nvarchar NOT NULL,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [userName] nvarchar(255) NOT NULL,
  [email] nvarchar(255)NOT NULL
)
GO

CREATE TABLE [Book] (
  [id] int PRIMARY KEY NOT NULL,
  [googleApiId] nvarchar NOT NULL,
  [rating] int,
  [startDate] datetime NOT NULL,
  [finishDate] datetime NOT NULL,
  [userId] int NOT NULL,
  [shelfId] nvarchar(255)
)
GO

CREATE TABLE [Note] (
  [id] int NOT NULL,
  [pageNum] int,
  [content] nvarchar(255)NOT NULL,
  [bookId] int NOT NULL
)
GO

CREATE TABLE [Shelf] (
  [id] int NOT NULL,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Friend] (
  [id] int NOT NULL,
  [friend1Id] int NOT NULL,
  [friend2Id] int NOT NULL
)
GO

ALTER TABLE [Book] ADD FOREIGN KEY ([userId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Book] ADD FOREIGN KEY ([shelfId]) REFERENCES [Shelf] ([id])
GO

ALTER TABLE [Note] ADD FOREIGN KEY ([bookId]) REFERENCES [Book] ([id])
GO

ALTER TABLE [Friend] ADD FOREIGN KEY ([friend1Id]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Friend] ADD FOREIGN KEY ([friend2Id]) REFERENCES [UserProfile] ([id])
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([id], [firebaseId], [firstName], [lastName], [userName], [email])
VALUES 
  (1, '4bDobQm3gdXqaH8fviIFQdem83Z2', 'Christine', 'Doza', 'xine75', 'xine@lemon.comx');
INSERT INTO [UserProfile]
  ([id], [firebaseId], [firstName], [lastName], [userName], [email])
VALUES 
  (2, '7G7bgsdkRcTFUDqcsX3yQxZ2Oz32', 'Sunday', 'Mancini', 'Sundaze', 'sunday@lemon.comx');
INSERT INTO [UserProfile]
  ([id], [firebaseId], [firstName], [lastName], [userName], [email])
VALUES 
  (3, 'Xc5jdEIsZKNYdV1VHHcJjnkqhvy2', 'Kimmy', 'Garris', 'liquidUniverse', 'kimmy@lemon.comx');
INSERT INTO [UserProfile]
  ([id], [firebaseId], [firstName], [lastName], [userName], [email])
VALUES 
  (4, 'pA2WcjqW4cWPmumNOMAPHr6b9tu1', 'Lena', 'Bruncaj', 'Lena', 'lena@lemon.comx');
INSERT INTO [UserProfile]
  ([id], [firebaseId], [firstName], [lastName], [userName], [email])
VALUES 
  (5, 'sH27JQAnAKbMikQ3EGQ6Rv7F02s1', 'Leah', 'Hanson', 'hintOfDecay', 'leah@lemon.comx');



SET IDENTITY_INSERT [UserProfile] OFF
