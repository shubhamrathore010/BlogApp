const { validateToken } = require("../services/authentication");

 

function validateRequest(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
        
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      // Handle error if needed
    }
    
    return next();
  };
}

// module.exports = {
//   checkForAuthenticationCookies,
// };



// const validateRequest = (req, res, next) => {

//     try {
//          console.log(req.url);
//         if(req.url == '/'){
//             next();
//             return;
//         }
//          (req.url == '/user/signin') 
//             next();
//             return;
        
//     } catch(error) {
//             return error;
//         }
    
//     }
//         const tokenCookieValue = req.cookies['token']
//         console.log(tokenCookieValue);
        // if (!tokenCookieValue) {
            // res.json({
            //     status: false,
            //     message: 'Token not found in the cookies, or invalid token'
            // }).status(400);

        //     const userPayload = validateToken(tokenCookieValue);
        // }
    //     if (userPayload) {
    //         req.user = userPayload;
    //         next();
    //     } else {
    //         res.json({
    //             status: false,
    //             message: 'Token not found in the cookies, or invalid token'
    //         }).status(400);
    //     }
    // } catch (error) {
    //     res.json({
    //         status: false,
    //         message: 'Token not found in the cookies, or invalid token'
    //     }).status(400);
//     }
// }

module.exports = {
    validateRequest
}