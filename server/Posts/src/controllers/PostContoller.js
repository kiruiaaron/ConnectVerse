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
                                    .input('written_text',Written_text)
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


//Like a post
async function LikePost(req,res){
    const sql= await mssql.connect(config)
    if(sql.connected){
        const {Post_id,User_id}= req.body;
        try {
            const result= await sql.request()
                                  .input('Post_id',Post_id)
                                  .input('User_id',User_id)
                                  .execute('LikePost')

            res.status(200).json({
                success:true,
                message:'You have like this post successfully',
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


//like a post


module.exports={
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getUserPost,
    CommentOnPost,
    replyCommentOnPost,
    LikePost
}