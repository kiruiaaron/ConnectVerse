const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");

async function register(req, res) {
  try {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    const {
      FirstName,
      Surname,
      UserName,
      Gender,
      Email_Address,
      country,
      Phone_Number,
      Date_of_birth,
      Password,
    } = req.body;

    
      const usernameExists = await sql
        .request()
        .input("UserName", UserName)
        .query("SELECT * FROM Users.userTable WHERE UserName = @UserName");

      if (usernameExists.recordset.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Check if email already exists
      const emailExists = await sql
        .request()
        .input("Email_Address", Email_Address)
        .query(
          "SELECT * FROM Users.userTable WHERE Email_Address = @Email_Address"
        );

      if (emailExists.recordset.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(Password, 10);

      const results = sql
        .request()

        .input("FirstName", FirstName)
        .input("Surname", Surname)
        .input("UserName", UserName)
        .input("Gender", Gender)
        .input("email", Email_Address)
        .input("country", country)
        .input("Phone_Number", Phone_Number)
        .input("DateOfbirth", Date_of_birth)
        .input("Password", hashedPassword)
        .execute("InsertUser");

      res.status(201).json({
        success: true,
        message: "User Inserted Successfully",
        results: results.recordset,
      });
   
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
} catch (error) {
  console.error(error);
}
}




//User Login
async function login(req, res) {
  const sql = await mssql.connect(config);
  if (sql.connected) {
    try {
      const { UserName, Password } = req.body;
      let result = await sql
        .request()
        .input("UserName", UserName)
        .execute("GetUserByUserName");

      let user = result.recordset[0];
      console.log(user);
      if (user) {
        try {
        let password_match =await bcrypt.compare(Password,user.Password);
        console.log(user.Password)
        console.log(Password)
        if (password_match) {
          res
            .status(200)
            .json({ 
              success: "true", 
              message: "Login Successful" 
            });

        }  else {
          res.status(404).json({
            success: "false",
            message: "Password does not match"
          });
        }
        } catch (error) {
           console.log(error)
        }
       
      }
      else {
        res.status(404).json({
          success: false,
          message: "Invalid UserName"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  else {
    res.status(404).json({
      success: false,
      message: "Internal Server problem"
    });
  }
}

module.exports = { register,login };
