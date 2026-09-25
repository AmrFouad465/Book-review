require("dotenv").config();
const sk = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {
  saveUser,
  authUser,
  doesExist,
} = require("../models/user");
const logIn = (req,res)=> {
    const {email,password}=req.body;
    if(email && password)
        {
            let [user, auth] = authUser(email, password);
            if (auth) {
                let token = jwt.sign({user}, sk, { expiresIn: '1d' });
                req.session.authorization={token};
                return res.status(200).json({'message':"Successful login"});
            }
            return res.status(401).json({'message':"Unsuccessful login"});
        }
    else
        {
            return res.status(401).json({'message':"Unsuccessful login"});
        }
};

const signIn = (req,res)=> {
    const {firstName, lastName, email, password}=req.body;
    if(firstName && lastName && email && password)
        {
            if (doesExist(email)) {
                return res.status(409).json({'message':"This email is already exist"})
            }
            let user = saveUser(firstName, lastName, email, password);
            let token = jwt.sign({user}, sk, { expiresIn: 1 * 24 * 60 * 60 * 1000 });
            req.session.authorization={token};
            return res.status(201).json({'message':"Successful signin"})
        }
    else{
        return res.status(409).json({'message':"Unsuccessful signin"})
    }
};

const validateToken = (req,res,next)=> {
 let token=req.session?.authorization?.token;
 if(token)
    { 
        try {
            let decoded = jwt.verify(token, sk);
            req.user=decoded.user;
            next();
        } 
        catch (err) {
             if (err.name === 'TokenExpiredError') 
                {
                    return res.status(401).json({ message: "Session expired, please login again" });
                }
            res.status(401).json({'message':"Invalid token"});
        }
    }
    else{
        res.status(401).json({'message':"Please login first"});

    }
};

const logOut = (req,res)=> {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: "Successful logout" });
  });
};

module.exports = { logIn, signIn, validateToken, logOut };
