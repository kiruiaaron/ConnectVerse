const joi= require('joi');

const new_user_schema = joi.object({
    FirstName:joi.string()
             .required(),
    Surname:joi.string()
                .required(),
    UserName:joi.string()
              .required(),
    Gender:joi.string()
                .required(),
    Email_Address:joi.string()
           .required()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    country:joi.string()
                .required(),
    Phone_Number:joi.string()
                     .required()
                     .min(10)
                     .max(15),
    Date_of_birth:joi.string()
                     .required(),
    
    Password:joi.string()
               .required()
               .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword:joi.ref('Password')
})

module.exports ={new_user_schema};