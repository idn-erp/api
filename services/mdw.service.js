require("dotenv").config()
const env = process.env
const jwt = require( "jsonwebtoken" )
const utl = require( "./util.service" )

class Middleware{
    static MayLoggedIn( req, res, next ){
        const auth = req.headers.x_authorization || false
        if(!auth){
            req.user = {}
            next()
        }else{
            jwt.verify(auth, env.TOKEN_SECRET, (err, user)=>{
                if(err){
                    req.user = {}
                    next()
                }else{
                    req.user = user
                    next()
                }
            })
        }
    }
    static IsLoggedIn(req, res, next){
        if(!req.headers.x_authorization)
            res.send( utl.err({},'LOGIN', 'not logged in - no auth') )
        else{
            const auth = req.headers.x_authorization
            jwt.verify(auth, env.TOKEN_SECRET, (err, user)=>{
                if(err)
                    res.send( utl.err(err, 'LOGIN', 'not logged in - invalid auth') )
                else{
                    req.user = user
                    next()
                }
            })
        }
    }
}

module.exports = Middleware