const mssql = require("mssql");
const config = require("../config/config");

//get all users
async function getALLUsers(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      const result = await sql.request().execute("getAllUsers");

      res.status(200).json({
        success: true,
        message: "Retrieved all users",
        results: result.recordset,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to retrieved all users",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

//Update A User
async function updateUser(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    const { User_id } = req.params;

    const {
      First_Name,
      Surname,
      Country,
      Phone_Number,
      Password,
      BIO,
      Profile_Image,
      CoverPhoto,
      RelationShip,
      City,

    } = req.body;

    try {
      const results = sql
        .request()
        .input("User_id", User_id)
        .input("First_Name", First_Name)
        .input("Surname", Surname)
        .input("Country", Country)
        .input("Phone_Number", Phone_Number)
        .input("Password", Password)
        .input("BIO", BIO)
        .input("Profile_Image",Profile_Image)
        .input("CoverPhoto",CoverPhoto)
        .input("RelationShip",RelationShip)
        .input("City",City)
        .execute("UpdateUser");

      res.status(201).json({
        success: true,
        message: "Account Updated successfully",
        results: results.recordset,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

//delete user account
async function deleteUserAccount(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      const { UserName } = req.params;
      const result = await sql
        .request()
        .input("UserName", UserName)
        .execute("DeleteUser");
      
        console.log(result.rowsAffected.length)
        
        if(result.rowsAffected.length == 1){
      res.status(200).json({
        success: true,
        message: "Your account has been deleted successfully",
        result: result.recordset,
      });
      
    }else{
        res.status(200).json({
            success: false,
            message: "Account does not exists",
          });
    }

    } catch (error) {
      console.log(error);
     
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
}

//get a user
async function getUser(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      const { UserName } = req.params;

      const result = await sql
        .request()
        .input("UserName", UserName)
        .execute("GetUserByUserName");

      res.status(200).json({
        success: true,
        message: "retrieved user successfully",
        results: result.recordset[0],
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: "failed to retrieve a user",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
}


//get user follows

async function getUserFollowers(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      const { User_id } = req.params;

      const result = await sql
        .request()
        .input("User_id", User_id)
        .execute("getUserFollowers");

      res.status(200).json({
        success: true,
        message: "retrieved user followers successfully",
        results: result.recordset,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: "failed to retrieve a user follow",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
}


//follow user

async function followUser(req, res) {
  const sql = await mssql.connect(config);
  if (sql.connected) {
    try {
      const { Following_id, Followers_id } = req.body;

      const username1 = await sql.query(`select UserName 
                                           from Users.userTable 
                                           where '${Following_id}'= User_id`);

      const username2 = await sql.query(`select UserName 
                                           from Users.userTable 
                                           where '${Followers_id}'= User_id`);
      console.log(username1.recordset[0].UserName);

      const result = await sql
        .request()
        .input("Following_id", Following_id)
        .input("Followers_id", Followers_id)
        .execute("follow");

      console.log(result);
      console.log(result.rowsAffected.length);

      if (result.rowsAffected.length === 2) {
        return res.status(403).json({
          success: false,
          message: `${username2.recordset[0].UserName} has already followed ${username1.recordset[0].UserName}`,
        });
      } else {
        res.status(201).json({
          success: true,
          message: `${username2.recordset[0].UserName} is now following ${username1.recordset[0].UserName}`,
          results: result.recordset,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to follow user",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//unfollow a user
async function unFollowUser(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    const { Following_id, Followers_id } = req.body;
    const username1 = await sql.query(`select UserName 
        from Users.userTable 
        where '${Following_id}'= User_id`);

    const username2 = await sql.query(`select UserName 
        from Users.userTable 
        where '${Followers_id}'= User_id`);
    try {
      const result = await sql
        .request()
        .input("Following_id", Following_id)
        .input("Followers_id", Followers_id)
        .execute("unfollow");

      console.log(result.rowsAffected[0]);
      if (result.rowsAffected[0] === 0) {
        res.status(400).json({
          success: false,
          message: `You have already unfollowed ${username1.recordset[0].UserName} `,
        });
      } else {
        res.status(201).json({
          success: true,
          Message: `${username2.recordset[0].UserName} has successfully unfollowed ${username1.recordset[0].UserName}`,
          result: result.recordset,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({
        success: false,
        message: "You can not follow this user",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  updateUser,
  getUser,
  getALLUsers,
  deleteUserAccount,
  followUser,
  unFollowUser,
  getUserFollowers
};
