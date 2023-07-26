const mssql = require('mssql');
const config = require('../config/config')



//GET ALL POSTS
async function getAllPosts(req,res){
    const sql = await mssql.connect(config)
    if(sql.connected){
        try {
            const result = await sql.request().execute('post_details')
            console.log(result.rowsAffected)
            if(result.rowsAffected === 0){
            res.status(200).json({
                success:false,
                message:'No posts Available',
                result: result.recordset
            })}else{
                res.status(200).json({
                    success:true,
                    message:'Retrieved all posts',
                    result:result.recordset
                })
            }
            console.log(result)
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success:false,
                message:'Failed to retrieved all posts'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}



//CREATE POST

async function createPost(req,res){
    const sql = await mssql.connect(config)
    if(sql.connected){
        const{User_id,Written_text,Image_url,Video_url} = req.body



        try {
            const result = await sql.request()
                                    .input('User_id',User_id)
                                    .input('Written_text',Written_text)
                                    .input('Image_url',Image_url)
                                    .input('video_url',Video_url)
                                    .execute('InsertPost')
            
            res.status(200).json({
                success:true,
                message:'Post inserted successfully',
                result: result.recordset
            })
            
            
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success:false,
                message:'Failed to insert post'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}


//UPDATE POST

async function updatePost(req,res){
    const sql = await mssql.connect(config)
    if(sql.connected){
        
        try {
            const{post_id}=req.params
          const{Written_text,Image_url,Video_url} = req.body

            const result = await sql.request()
                                    .input('post_id',post_id)
                                    .input('Written_text',Written_text)
                                    .input('Image_url',Image_url)
                                    .input('Video_url',Video_url)
                                    .execute('UpdatePost');
            
            res.status(200).json({
                success:true,
                message:'Post updated successfully',
                result: result.recordset
            })
            
            console.log(result);
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success:false,
                message:'Failed to update post'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}


//DELETE POST
async function deletePost(req,res){
    const sql= await mssql.connect(config)
    if(sql.connected){
        const {post_id}= req.params;
        try {
            const result= await sql.request().input('post_id',post_id).execute('DeletePost')

            res.status(200).json({
                success:true,
                message:'Post Deleted successfully',
                result : result.recordset
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success:false,
                message:'Post do not exists'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal server Error'
        })
    }
}


//GET POST FOR SPECIFIC USER
async function getUserPost(req,res){
    const sql= await mssql.connect(config)
    if(sql.connected){
        const {UserName}= req.params;
        try {
            const result= await sql.request().input('UserName',UserName).execute('GetUserPosts')

            res.status(200).json({
                success:true,
                message:'Posts Retrieved successfully',
                result : result.recordset
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success:false,
                message:'User does not exists'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal server Error'
        })
    }
}


//comment a post

async function CommentOnPost(req,res){
    const sql= await mssql.connect(config)
    if(sql.connected){
        const {User_id,Post_id,Comment_Text}= req.body;
        try {
            const result= await sql.request()
                                  .input('User_id',User_id)
                                  .input('Post_id',Post_id)
                                  .input('Comment_text',Comment_Text)
                                  .execute('commentOnPost')

            res.status(200).json({
                success:true,
                message:'You have commented on  this post successfully',
                result : result.recordset
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success:false,
                message:'Post does not exists'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal server Error'
        })
    }
}

//Reply Comment

async function replyCommentOnPost(req,res){
    const sql= await mssql.connect(config)
    if(sql.connected){
        const {Replied_by_id,Comment_id,Reply_text}= req.body;
        try {
            const result= await sql.request()
                                  .input('Replied_by_id',Replied_by_id)
                                  .input('Comment_id',Comment_id)
                                  .input('Reply_text',Reply_text)
                                  .execute('replyCommentOnPost')

            res.status(200).json({
                success:true,
                message:'You have replied  on  this comment successfully',
                result : result.recordset
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success:false,
                message:'Comment does not exists'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal server Error'
        })
    }
}


//get comments for a post

async function getComments(req,res){
    const sql = await mssql.connect(config)
    if(sql.connected){

        const {Post_id} =  req.params
        try {
            const result = await sql.request().input('Post_id',Post_id).execute('GetPostComments')
            console.log(result.rowsAffected)
            if(result.rowsAffected === 0){
            res.status(200).json({
                success:false,
                message:'No Comments available for this post',
                result: result.recordset
            })}else{
                res.status(200).json({
                    success:true,
                    message:'Retrieved all comments for this posts',
                    result:result.recordset
                })
            }
            console.log(result)
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success:false,
                message:'Failed to retrieved comments for this  posts'
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}


//get replies for comments

async function getCommentsReplies(req,res){
    const sql = await mssql.connect(config)
    if(sql.connected){

        const {Comment_id} =  req.params
        try {
            const result = await sql.request().input('Comment_id',Comment_id).execute('getCommentReplies')
            console.log(result.rowsAffected)
            if(result.rowsAffected === 0){
            res.status(200).json({
                success:false,
                message:'No replies available for this comment',
                result: result.recordset
            })}else{
                res.status(200).json({
                    success:true,
                    message:'Retrieved all replies for this comments ',
                    result:result.recordset
                })
            }
            console.log(result)
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success:false,
                message:'Failed to retrieved replies for this  comments '
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

//like post

async function LikePost(req, res) {
    const {  User_id} = req.body;
    const {Post_id}= req.params
  
    try {
      const sql = await mssql.connect(config);
      if (sql.connected) {
        // Check if the user has already liked the post
        const queryResult = await sql
          .request()
          
          .input('Post_id', Post_id)
          .input('User_id', User_id)
          .query('SELECT COUNT(*) as count FROM Posts.likeTable WHERE Post_id = @Post_id AND User_id = @User_id');
  
        const alreadyLiked = queryResult.recordset[0].count > 0;
  
        if (alreadyLiked) {
          // Unlike the post (delete the like record from the database)
          await sql
            .request()
            .input('Post_id', Post_id)
            .input('User_id', User_id)
            .query('DELETE FROM Posts.likeTable WHERE Post_id = @Post_id AND User_id = @User_id');
  
          res.status(200).json({
            success: true,
            isLiked: false,
            likeCount: queryResult.recordset[0].count - 1,
          });
        } else {
          // Like the post (add a new like record to the database)
          await sql
            .request()
            .input('Post_id', Post_id)
            .input('User_id', User_id)
            .query('INSERT INTO Posts.likeTable (Like_id,Post_id, User_id) VALUES (NEWID(),@Post_id, @User_id)');
  
          res.status(200).json({
            success: true,
            isLiked: true,
            likeCount: queryResult.recordset[0].count + 1,
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  


//like a post


module.exports={
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getUserPost,
    CommentOnPost,
    replyCommentOnPost,
    LikePost,
    getComments,
    getCommentsReplies
}