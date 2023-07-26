const { createClient } = require("redis");
const { RedisStore } = require("connect-redis").default;

async function sessionHandler(req, res, next) {
  try {
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis");

   // const redisStore = new RedisStore({
    //  client:redisClient,
//prefix:''
    //});

    let cookie = req.headers["cookie"];
    let sessionID = cookie.substring(16, 52);
    console.log(sessionID)
    let session = await redisClient.get(sessionID);
    let real_session = JSON.parse(session);
    const authorized = real_session?.authorized;
    console.log(authorized);
    if (session && authorized) {
      req.session = real_session;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "login to proceed",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {sessionHandler};