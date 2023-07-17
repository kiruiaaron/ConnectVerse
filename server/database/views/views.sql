--VIEWS

--views
CREATE OR ALTER VIEW Posts.post_details AS
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

    GO;

    SELECT * FROM Posts.post_details;