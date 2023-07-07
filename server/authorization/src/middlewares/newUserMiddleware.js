const { newUserValidator } = require("../validations/newUserValidator");

function newUserMiddleware(req,res,next){
   
    try {
        let user = req.body;
        let {value } =newUserValidator(user);
        req.value =value;
        next();
    } catch (error) {
        next({
            status:400,
            message:error.message
        })
    }
 
}

module.exports = newUserMiddleware;