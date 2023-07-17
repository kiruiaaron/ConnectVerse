--TRIGGERS
DROP TRIGGER IF EXISTS Posts.updatePost
GO;

CREATE TRIGGER Posts.updatePost
ON Posts.postTable
AFTER INSERT, DELETE
AS
BEGIN
    -- Update the post count for the user
    UPDATE Users.userTable
    SET Post_count = (
        SELECT COUNT(*) FROM Posts.postTable WHERE User_id = Users.userTable.User_id
    )
    WHERE User_id IN (SELECT User_id FROM inserted)
END;

GO;




DROP TRIGGER IF EXISTS Posts.updateLike;


GO;
CREATE TRIGGER Posts.updateLike
ON Posts.likeTable
AFTER INSERT, DELETE
AS
BEGIN
    -- Update the like count for the user
    UPDATE Posts.postTable
    SET Like_count = (
        SELECT COUNT(*) FROM Posts.likeTable WHERE Post_id = Posts.postTable.Post_id
    )
    WHERE Post_id IN (SELECT Post_id FROM inserted)
END;
GO;

DROP TRIGGER IF EXISTS Posts.updateComments;

GO;
CREATE TRIGGER Posts.updateComments
ON Posts.commentsTable
AFTER INSERT, DELETE
AS
BEGIN
    -- Update the comment count for the user
    UPDATE Posts.postTable
    SET comment_count = (
        SELECT COUNT(*) FROM Posts.commentsTable WHERE Post_id = Posts.postTable.Post_id
    )
    WHERE Post_id IN (SELECT Post_id FROM inserted)
END;
GO;


DROP TRIGGER IF EXISTS Users.updateFollowerCount;
GO;

CREATE TRIGGER Users.updateFollowerCount
ON Users.followTable
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the follower count for the user being followed
    UPDATE Users.userTable
    SET followers = (
        SELECT COUNT(*) FROM Users.followTable WHERE Following_id = Users.userTable.User_id
    )
    WHERE User_id IN (SELECT User_id from inserted)

    -- Update the following count for the user who is following
    UPDATE Users.userTable
    SET following = (
        SELECT COUNT(*) FROM Users.followTable WHERE Followers_id = Users.userTable.User_id
    )
    WHERE User_id IN(SELECT User_id from inserted)
END;
GO;

CREATE TRIGGER Posts.updateNotification
ON Posts.postTable-- Replace with the actual table name where the posts are stored
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert notification for comments
    INSERT INTO Notifications.notificationTable (Notify_id,user_id, notification_type, Notification_text, sender_id, is_read,Created_at)
    SELECT NEWID(),p.user_id,  'Comment', 'You received a comment on your post.',c.User_id, 0,GETDATE()
    FROM inserted i
    INNER JOIN Posts.commentsTable c ON i.post_id = c.post_id
    INNER JOIN Posts.postTable p ON i.post_id = p.post_id;

    -- Insert notification for likes
    INSERT INTO Notifications.notificationTable (Notify_id,user_id,  notification_type, notification_text,sender_id, is_read,Created_at)
    SELECT NEWID(),p.user_id, 'Like', 'Your post was liked by someone.', l.User_id, 0,GETDATE()
    FROM inserted i
    INNER JOIN Posts.likeTable l ON i.post_id = l.post_id
    INNER JOIN Posts.postTable p ON i.post_id = p.post_id;

    -- Insert notification for follows
    INSERT INTO Notifications.notificationTable (Notify_id,user_id,  notification_type, notification_text,sender_id, is_read,Created_at)
    SELECT NEWID(),f.Following_id, 'Follow', 'You have a new follower.', f.Followers_id, 0,GETDATE()
    FROM inserted i
    INNER JOIN Users.followTable f ON i.User_id = f.Following_id;
END;



SELECT * FROM Users.userTable;
select * from Users.followTable;
select * from Notifications.notificationTable;
select * from Posts.commentsTable;
SELECT * FROM Posts.likeTable;
select * from Posts.postTable;
Go;