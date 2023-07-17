--STORED-PROCEDURES


--stored procedures

--user related stored procedures
CREATE OR ALTER PROCEDURE getAllUsers
 AS
 BEGIN

 SELECT * FROM Users.userTable
 WHERE is_deleted=0;
END;

EXECUTE getAllUsers;
 GO;


-- Insert User
CREATE OR ALTER PROCEDURE InsertUser
    @FirstName VARCHAR(255),
    @Surname VARCHAR(255),
    @UserName VARCHAR(255),
    @Gender VARCHAR(50),
    @email VARCHAR(255),
    @country VARCHAR(255),
    @phone_number VARCHAR(255),
    @DateOfBirth VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
    
    DECLARE @User_id VARCHAR(255)
    SET @User_id = NEWID()


    INSERT INTO Users.userTable (User_id,First_Name,Surname,UserName,Gender, Email_Address,Country,Phone_Number,Date_of_birth, Password)
    VALUES (@User_id,@FirstName, @Surname,@UserName, @Gender,@email,@country,@phone_number,@DateOfBirth,@password);

   
END;
EXEC InsertUser
@FirstName='Jean',
@Surname ='Jina',
@UserName='jina100',
@Gender ='female',
@email ='jina35@gmail.com',
@country='Kenya',
@phone_number='65789-0456',
@DateOfBirth='1998-07-24',
@password='12345678';


select * from Users.userTable;
GO;

-- Update User
CREATE OR ALTER PROCEDURE UpdateUser
    @user_id VARCHAR(255) ,
    @FirstName VARCHAR(50),
    @surname VARCHAR(255),
    @email VARCHAR(50),
    @Country VARCHAR(255),
    @phone_Number VARCHAR(255),
    @Date_of_birth VARCHAR(255),
    @Bio VARCHAR(1000)
AS
BEGIN
    UPDATE Users.userTable
    SET First_Name = @FirstName,Surname=@surname,Email_Address = @email,Country=@Country,Phone_Number=@phone_Number,Date_of_birth=@Date_of_birth,BIO=@Bio
    WHERE user_id = @user_id;
END;

GO;
-- Delete User
CREATE OR ALTER PROCEDURE DeleteUser
    @UserName VARCHAR(255)
AS
BEGIN
    IF NOT EXISTS (
    SELECT 1
    FROM Users.userTable
    WHERE UserName=@UserName
    AND is_deleted = 1
  )
  BEGIN
    Update Users.userTable
    SET is_deleted=1
    WHERE UserName = @UserName;
    END;
END;


GO;
-- Get User By ID
CREATE OR ALTER PROCEDURE GetUserByUserName
    @UserName varchar(255)
AS
BEGIN
    SELECT *
    FROM Users.userTable
    WHERE UserName = @UserName;
END;

EXECUTE GetUserByUserName
@UserName ='kibetprt';

GO;


-- Get User Posts
CREATE OR ALTER PROCEDURE GetUserPosts
    @UserName VARCHAR(255)
AS
BEGIN
   SELECT u.UserName,p.written_text,p.Image_url,p.Video_url,p.created_at,p.like_count,p.comment_count
   FROM Posts.postTable p
   LEFT JOIN Users.userTable u ON u.User_id=p.User_id
   WHERE u.UserName =@UserName
END;

EXEC GetUserPosts
@UserName ='mily14'
GO;

--GET USER FOLLOWERS

CREATE OR ALTER PROCEDURE getUserFollowers
@User_id VARCHAR(255)

AS 
BEGIN


SELECT u.UserName 
from Users.userTable u
JOIN Users.followTable f on u.User_id =f.Followers_id
WHERE f.Following_id=@User_id;

END;

EXEC getUserFollowers
@User_id ='64933C4A-AFE8-41C9-AFEB-AC476C545E04'

select * from Users.followTable;
select * from Users.userTable;


GO;

--FOLLOW
CREATE OR ALTER PROCEDURE follow
  @Following_id VARCHAR(255),
  @Followers_id VARCHAR(255)
AS
BEGIN
  DECLARE @Follow_id VARCHAR(255), @created_at VARCHAR(255)
  SET @Follow_id = NEWID()
  SET @created_at = GETDATE()

  -- Check if the combination already exists
  IF NOT EXISTS (
    SELECT 2
    FROM Users.followTable
    WHERE Following_id = @Following_id
      AND Followers_id = @Followers_id
  )
  BEGIN
    INSERT INTO Users.followTable (Follow_id, Following_id, Followers_id, Created_at)
    VALUES (@Follow_id, @Following_id, @Followers_id, @created_at)
  END
END;

GO;

--UNFOLLOW
CREATE OR ALTER PROCEDURE unfollow
@Following_id VARCHAR(255),
@Followers_id VARCHAR(255)

AS
BEGIN

DELETE FROM Users.followTable
 WHERE Following_id = @Following_id
      AND Followers_id = @Followers_id

END;
GO;

--POST RELATED PROCEDURES
--getAllposts

CREATE OR ALTER PROCEDURE post_details 

AS
BEGIN
SELECT
    p.Post_id,
    p.User_id,
    u.UserName,
    p.Written_text,
    p.Image_url,
    p.Video_url,

    COUNT(DISTINCT c.Comment_id) AS Comment_count,
    COUNT(DISTINCT l.Like_id) AS Like_count
FROM
    Posts.postTable p
    LEFT JOIN Users.userTable u ON p.User_id = u.User_id
    LEFT JOIN Posts.commentsTable c ON p.Post_id = c.Post_id
    LEFT JOIN Posts.likeTable l ON p.Post_id = l.Post_id
GROUP BY
    p.Post_id,
    p.user_id,
    u.UserName,
    p.Written_text,
    p.Image_url,
    p.Video_url;

    END;

    GO;



-- Insert Post
CREATE OR ALTER PROCEDURE InsertPost
    @User_id VARCHAR(255),
    @written_text VARCHAR(255),
    @Image_url VARCHAR(255),
    @Video_url VARCHAR(255)
AS
BEGIN
DECLARE @post_id VARCHAR(255),@created_at VARCHAR(255)
SET @post_id=NEWID()
SET @created_at=GETDATE()



    INSERT INTO Posts.postTable (Post_id,User_id, Written_text, Image_url, Video_url,Created_at)
    VALUES (@post_id,@user_id, @written_text, @Image_url, @video_url,@created_at);
END;

EXEC InsertPost
@User_id='90ACB84A-52A3-4D47-AF1F-8D33802A9F07',
@written_text='Home sweet home',
@image_url='http:/home.jpeg',
@video_url='';



select * from Posts.postTable;

GO;

-- Update Post
CREATE OR ALTER PROCEDURE UpdatePost
    @post_id VARCHAR(255),
    @written_text VARCHAR(255),
    @image_url VARCHAR(255),
    @video_url VARCHAR(255)
AS
BEGIN
    UPDATE Posts.postTable
    SET Written_text = @written_text, Image_url = @image_url, Video_url = @video_url
    WHERE post_id = @post_id;
END;

EXEC UpdatePost
@post_id='1D069ADC-77B9-4F81-B597-711B11E2EBFF',
@written_text='So delicous Meal',
@image_url='',
@video_url=''

SELECT * FROM Posts.postTable;
GO;

-- Delete Post
CREATE OR ALTER PROCEDURE DeletePost
    @post_id VARCHAR(255)
AS
BEGIN
    DELETE FROM Posts.postTable
    WHERE post_id = @post_id;
END;

GO;

-- Get Post By ID
CREATE OR ALTER PROCEDURE GetPostByID
    @post_id VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Posts.postTable
    WHERE post_id = @post_id;
END;
EXEC GetPostByID
@post_id ='1D069ADC-77B9-4F81-B597-711B11E2EBFF';

GO;

-- Get User Posts
CREATE OR ALTER PROCEDURE GetUserPosts
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Posts.postTable
    WHERE user_id = @user_id;
END;

EXEC GetUserPosts
@user_id =100

GO;


--comment on post
CREATE OR ALTER PROCEDURE commentOnPost
 @User_id VARCHAR(255),
 @Post_id VARCHAR(255),
 @Comment_Text VARCHAR(1000)

 AS
 BEGIN
    
    DECLARE @Comment_id VARCHAR(255), @created_at VARCHAR(255)
    SET @Comment_id =NEWID()
    SET @created_at =GETDATE()

    INSERT INTO Posts.commentsTable(Comment_id,User_id,Post_id,Comment_Text,Created_at)
    VALUES(@Comment_id,@User_id,@Post_id,@Comment_Text,@created_at);

    END;

GO
--reply comment
CREATE OR ALTER PROCEDURE replyCommentOnPost
  @Replied_by_id VARCHAR(255),
  @Comment_id VARCHAR(255),
  @Reply_text VARCHAR(1000)

  AS
  BEGIN

    DECLARE @Reply_id VARCHAR(255),@Created_at VARCHAR(255)
    SET @Reply_id = NEWID()
    SET @Created_at = GETDATE()

    INSERT INTO Posts.repliesTable(Reply_id,Replied_by_id,Comment_id,Reply_text,Created_at)
    VALUES(@Reply_id,@Replied_by_id,@Comment_id,@Reply_text,@Created_at)

    END;


GO;
select * from Posts.repliesTable
GO;


--like post
CREATE OR ALTER PROCEDURE LikePost
 @User_id VARCHAR(255),
 @Post_id VARCHAR(255)

 AS
 BEGIN
    
    DECLARE @Like_id VARCHAR(255), @created_at VARCHAR(255)
    SET @Like_id =NEWID()
    SET @created_at =GETDATE()

    INSERT INTO Posts.likeTable(Like_id,Post_id,User_id,Created_at)
    VALUES(@Like_id,@Post_id,@User_id,@created_at);

    END;

GO

select * from Posts.commentsTable;