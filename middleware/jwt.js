


const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let data = req.cookies
    if (data.token) {
        let decoded = jwt.verify(data.token,'nency');
        console.log(decoded);
        next();
    }
    else{
        res.send("user not login")
    }
}

module.exports=auth
