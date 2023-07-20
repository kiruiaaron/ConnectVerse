
function sessionHandler(req, res, next) {
    const authorized = req.session?.authorized;
  
    if (req.session && authorized) {
      // Session is valid and authorized
      console.log(req.session);
      //console.log(req.cookies); // Log the cookie value
      next(); // Proceed to the next middleware or route handler
    } else {
      // Session is invalid or unauthorized
      res.status(401).send("You are not logged in");
    }
  }

module.exports = {sessionHandler};
