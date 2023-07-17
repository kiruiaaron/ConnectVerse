
--CREATEING DATABASE,SCHEMA,TABLES

CREATE DATABASE ConnectVerse;

USE ConnectVerse;
go

CREATE SCHEMA Users;
 GO

CREATE SCHEMA Posts;
GO;

CREATE SCHEMA Notifications;
GO;

CREATE SCHEMA Chat;
GO;

CREATE TABLE Users.userTable(
   User_id VARCHAR(255) PRIMARY KEY  NOT NULL,
   First_Name VARCHAR(255),
   Surname VARCHAR(255),
   UserName VARCHAR(255) UNIQUE,
   Gender VARCHAR(255),
   Email_Address VARCHAR(255) UNIQUE,
   Country VARCHAR(255),
   Phone_Number VARCHAR(255),
   Date_of_birth VARCHAR(255),
   Age  AS (DATEDIFF(YEAR, Date_Of_birth, GETDATE())),
   Post_Count INT,
   Followers INT,
   Following INT,
   BIO VARCHAR(1000),
   Profile_Image VARCHAR(255),
   Password VARCHAR(255),
   is_deleted BIT
);

SELECT * FROM Users.userTable;
CREATE TABLE Users.followTable(
  Follow_id VARCHAR(255) PRIMARY KEY NOT NULL,
  Following_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
  Followers_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
  Created_at VARCHAR(255)
);

CREATE TABLE Posts.postTable(
    Post_id VARCHAR(255) PRIMARY KEY NOT NULL,
    User_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Written_text VARCHAR (1000),
    Image_url VARCHAR(255),
    Video_url VARCHAR(255),
    Created_at VARCHAR(255),
    Like_count VARCHAR(255),
    Comment_Count VARCHAR(255)
);


CREATE TABLE Posts.likeTable(
    Like_id VARCHAR(255) PRIMARY KEY NOT NULL,
    Post_id VARCHAR(255) FOREIGN KEY REFERENCES Posts.postTable(Post_id),
    User_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Created_at VARCHAR(255)
);


CREATE TABLE Posts.commentsTable(
    Comment_id VARCHAR(255) PRIMARY KEY NOT NULL,
    User_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Post_id VARCHAR(255) FOREIGN KEY REFERENCES Posts.postTable(Post_id),
    Comment_Text VARCHAR(1000),
    Created_at VARCHAR(255)
);


CREATE TABLE Posts.repliesTable(
    Reply_id VARCHAR(255) PRIMARY KEY NOT NULL,
    Replied_by_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Comment_id VARCHAR(255) FOREIGN KEY REFERENCES Posts.commentsTable(Comment_id),
    Reply_text VARCHAR(1000),
    Created_at VARCHAR(255)
);


CREATE TABLE Chat.chatsTable(
 Chat_id VARCHAR(255) PRIMARY KEY NOT NULL,
 Created_at VARCHAR(255)
);



CREATE TABLE Chat.MessagesTable(
    Message_id VARCHAR(255) PRIMARY KEY NOT NULL,
    Chat_id VARCHAR(255) FOREIGN KEY REFERENCES Chat.chatsTable(Chat_id),
    Sender_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Receiver_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Message_content VARCHAR (1000),
    Created_at VARCHAR(255)
);

DROP TABLE Notifications.notificationTable;
CREATE TABLE Notifications.notificationTable(
    Notify_id VARCHAR(255) PRIMARY KEY NOT NULL,
    User_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Notification_type VARCHAR(255),
    Notification_text VARCHAR(255),
    Sender_id VARCHAR(255) FOREIGN KEY REFERENCES Users.userTable(User_id),
    Is_read BIT,
    Created_at VARCHAR(255)
);
GO;

INSERT INTO Users.userTable (User_id,First_Name, Surname,UserName, Gender, Email_Address, Country, Phone_Number, Date_of_birth,BIO,Password)
VALUES
    (NEWID() ,'John', 'Doe', 'johndo23','Male', 'johndoe@example.com', 'USA', '1234567890', '1990-01-01', 'Am a software engineer','password123'),
    (NEWID()  ,'Jane', 'Smith','Jane104', 'Female', 'janesmith@example.com', 'Canada', '9876543210', '1992-05-15','Am a farmer','securepass'),
    (NEWID()  ,'Mike', 'Johnson','Maike34', 'Male', 'mikejohnson@example.com', 'Australia', '5555555555', '1985-12-10','am a teacher', 'mypassword'),
    (NEWID()  ,'Emily', 'Brown','mily14', 'Female', 'emilybrown@example.com', 'UK', '7777777777', '1988-09-20', 'cloud developer','password1234'),
    (NEWID()  ,'David', 'Wilson','David01', 'Male', 'davidwilson@example.com', 'Germany', '4444444444', '1995-06-25','Hardware specialist', 'strongpass');


INSERT INTO Posts.postTable (Post_id,User_id, Written_text, Image_url, Video_url, created_at)
VALUES
    (NEWID(),'135D09A5-3BBB-438B-8774-6F6F5E2EB1DD', 'Beautiful sunset', 'https://example.com/images/sunset.jpg', '', GETDATE()),
    (NEWID(),'135D09A5-3BBB-438B-8774-6F6F5E2EB1DD', 'Delicious meal', 'https://example.com/images/meal.jpg', '',GETDATE()),
    (NEWID(),'2DA17538-459A-415A-9F74-651381A2E086', 'Fun day at the beach', 'https://example.com/images/beach.jpg', 'https://example.com/videos/beach.mp4', GETDATE());
  --  (NEWID(),'90ACB84A-52A3-4D47-AF1F-8D33802A9F07', 'Amazing view from the mountaintop', 'https://example.com/images/mountain.jpg', '', GETDATE()),
  --  (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', 'Cute puppy', 'https://example.com/images/puppy.jpg', 'https://example.com/videos/puppy.mp4', GETDATE());



INSERT INTO Users.followTable (Follow_id,Following_id, Followers_id,Created_at)
VALUES
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', '8AD9E234-90BD-4BC8-BC03-8255C3A2237A',GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B', '64933C4A-AFE8-41C9-AFEB-AC476C545E04',GETDATE()),
    (NEWID(),'8AD9E234-90BD-4BC8-BC03-8255C3A2237A', '6AC176C9-2D75-407E-B5F3-1D084745255B',GETDATE()),
    (NEWID(),'90ACB84A-52A3-4D47-AF1F-8D33802A9F07', 'BFCDE877-6218-4DF3-95C8-F36C81D4F22C',GETDATE()),
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', '90ACB84A-52A3-4D47-AF1F-8D33802A9F07',GETDATE());


INSERT INTO Users.followTable (Follow_id,Following_id, Followers_id,Created_at)
VALUES
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', '6AC176C9-2D75-407E-B5F3-1D084745255B',GETDATE()),
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', '90ACB84A-52A3-4D47-AF1F-8D33802A9F07',GETDATE()),
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', 'BFCDE877-6218-4DF3-95C8-F36C81D4F22C',GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B', '8AD9E234-90BD-4BC8-BC03-8255C3A2237A',GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B', '90ACB84A-52A3-4D47-AF1F-8D33802A9F07',GETDATE());



INSERT INTO Users.followTable (Follow_id,Following_id, Followers_id,Created_at)
VALUES
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', '8AD9E234-90BD-4BC8-BC03-8255C3A2237A',GETDATE()),
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', '6AC176C9-2D75-407E-B5F3-1D084745255B',GETDATE()),
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', '64933C4A-AFE8-41C9-AFEB-AC476C545E04',GETDATE());


-- Dummy data for comments table
INSERT INTO Posts.commentsTable (Comment_id,User_id, Post_id, Comment_text,Created_at)
VALUES
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', '1D069ADC-77B9-4F81-B597-711B11E2EBFF', 'Beautiful photo!',GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B', '1D069ADC-77B9-4F81-B597-711B11E2EBFF', 'I love sunsets.',GETDATE()),
    (NEWID(),'90ACB84A-52A3-4D47-AF1F-8D33802A9F07', '6E6189D2-0B25-46B5-991D-D8E0101FB0DD', 'That looks delicious!',GETDATE()),
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', '94A39AD6-24D7-4361-8CA9-E0223CA96E07', 'Wish I was there!',GETDATE()),
    (NEWID(),'8AD9E234-90BD-4BC8-BC03-8255C3A2237A', 'DEF85803-2295-40D4-A1E5-28727E1F084A', 'Breathtaking view.',GETDATE()),
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C', 'DEF85803-2295-40D4-A1E5-28727E1F084A', 'I want to go there!',GETDATE()),
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', 'ED68840C-0244-45F1-B40E-347C22EE5072', 'Aww, such a cute puppy!',GETDATE());


-- Dummy data for replies table
INSERT INTO posts.repliesTable (Reply_id,Replied_by_id,comment_id, reply_text,Created_at)
VALUES
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04','5862D485-8C47-4DBD-A368-3259034A4C40',  'Thank you!',GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B','5862D485-8C47-4DBD-A368-3259034A4C40',  'I agree, sunsets are amazing.',GETDATE()),
    (NEWID(),'90ACB84A-52A3-4D47-AF1F-8D33802A9F07','5D5486A9-B7BF-4810-8D9C-DBE2C2300B7E',  'It tasted as good as it looks!',GETDATE()),
    (NEWID(),'BFCDE877-6218-4DF3-95C8-F36C81D4F22C','7D6CF687-8816-423A-99B0-ED6A4CDF776D', 'It was a fantastic day!',GETDATE()),
    (NEWID(),'90ACB84A-52A3-4D47-AF1F-8D33802A9F07', '7D6CF687-8816-423A-99B0-ED6A4CDF776D', ' Could not agree more!',GETDATE()),
    (NEWID(),'8AD9E234-90BD-4BC8-BC03-8255C3A2237A','A166C7DC-B739-47F4-A9DD-FB4685E1561C', 'Let us plan a trip there!',GETDATE()),
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04','B7E95BAB-F898-4E2F-900B-F19B5B749875','Yes, it is an adorable puppy!',GETDATE());


-- Dummy data for likes table
INSERT INTO Posts.likeTable (Like_id,Post_id, User_id,Created_at)
VALUES
    (NEWID(),'1D069ADC-77B9-4F81-B597-711B11E2EBFF', '8AD9E234-90BD-4BC8-BC03-8255C3A2237A',GETDATE()),
    (NEWID(),'1D069ADC-77B9-4F81-B597-711B11E2EBFF', '90ACB84A-52A3-4D47-AF1F-8D33802A9F07',GETDATE()),
    (NEWID(),'6E6189D2-0B25-46B5-991D-D8E0101FB0DD', '64933C4A-AFE8-41C9-AFEB-AC476C545E04',GETDATE()),
    (NEWID(),'94A39AD6-24D7-4361-8CA9-E0223CA96E07', 'BFCDE877-6218-4DF3-95C8-F36C81D4F22C',GETDATE()),
    (NEWID(),'DEF85803-2295-40D4-A1E5-28727E1F084A', '8AD9E234-90BD-4BC8-BC03-8255C3A2237A',GETDATE()),
    (NEWID(),'DEF85803-2295-40D4-A1E5-28727E1F084A', '90ACB84A-52A3-4D47-AF1F-8D33802A9F07',GETDATE()),
    (NEWID(),'ED68840C-0244-45F1-B40E-347C22EE5072', '64933C4A-AFE8-41C9-AFEB-AC476C545E04',GETDATE());


-- Dummy data for notification table
INSERT INTO Notifications.notificationTable (Notify_id,User_id,  notification_type, Notification_text,sender_id, is_read, created_at)
VALUES
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', 'Follow', 'John started following you.', '6AC176C9-2D75-407E-B5F3-1D084745255B', 0, GETDATE()),
    (NEWID(),'64933C4A-AFE8-41C9-AFEB-AC476C545E04', 'Like', 'Sarah liked your post.', '8AD9E234-90BD-4BC8-BC03-8255C3A2237A', 0, GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B', 'Comment', 'David commented on your photo.', '90ACB84A-52A3-4D47-AF1F-8D33802A9F07', 0, GETDATE()),
    (NEWID(),'8AD9E234-90BD-4BC8-BC03-8255C3A2237A',  'Like', 'Anna liked your video.','64933C4A-AFE8-41C9-AFEB-AC476C545E04', 1, GETDATE()),
    (NEWID(),'6AC176C9-2D75-407E-B5F3-1D084745255B',  'Follow', 'Tom started following you.','8AD9E234-90BD-4BC8-BC03-8255C3A2237A', 0, GETDATE()),
    (NEWID(),'8AD9E234-90BD-4BC8-BC03-8255C3A2237A',  'Comment', 'Emily commented on your post.','90ACB84A-52A3-4D47-AF1F-8D33802A9F07', 0, GETDATE());













