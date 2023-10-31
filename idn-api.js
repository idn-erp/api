const dotenv = require('dotenv')
dotenv.config()
const env = process.env

const jwt = require( "jsonwebtoken" )
const util = require( "./services/util.service" )
const express = require('express')
const mdw = require("./services/mdw.service")

const mysql = require( "mysql2" )
const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    port : env.DB_PORT,
    database: env.DB_DEFAULT,
    password : env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

const app = express()
app.use(express.json())

const cors = require('cors')
app.use( cors() )

const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const upload = multer({
    dest : env.UPLOAD_FOLDER,
    limits: {
      fileSize: 500 * 1024 * 1024, // Limit the file size to 500 MB
      files: 2, // Limit the number of files to 2
    },
});

app.post(
    '/sp/:object/:action',
    [
        mdw.IsLoggedIn
    ],
    (req, res)=>{
        let d = req.body.data
        d = d ? d : []
        const sp_name = `sp_${req.params.object}_${req.params.action}`
        const sp_vals = [req.user.id, ...req.body.data]
        const sp_params = Array(sp_vals.length).fill('?').join(',')
        const sql = `CALL ${sp_name}( ${sp_params} ) `
        pool.query(
            sql,
            sp_vals,
            (err, r, fields)=>{
                res.send( err ? util.err(err, 'DB', "db error") : util.ok(r[0]) )
            }
        )
    }
)

app.post(
    '/authenticate',
    [
        mdw.MayLoggedIn
    ],
    (req, res)=>{
        let d = req.body.data;
        d = d ? d : {};
        const {email, password} = d;
        if(!email || !password) 
            res.send(util.err(req.body, 'EMPTY_CREDS', 'email or Password is empty'))
        else{
            pool.query(
                'CALL sp_user_authenticate(?,?)',
                [ email, password ],
                (err, r, fields)=>{
                    if(err){
                        res.send( util.err(err, 'DB', 'Unable to authenticate') );
                    }else{
                        if(r[0][0]){
                            let token = jwt.sign( r[0][0], env.TOKEN_SECRET, {expiresIn : '1d'} );
                            res.send( util.ok({authToken : token, user: r[0][0]}) );
                        }else 
                            res.send( util.err(req.body.data), 'INVALID_CREDS', 'Incorrect email or Password' );
                    }
                }
            )
        }
    }
)

// Attachments
app.post('/attachment/save', [mdw.IsLoggedIn, upload.single('File')], (req, res) => {
    if(!req.file)
        res.send( util.err(req.body, 'NO_FILE', 'No file specified') ) 
    else{
        const d = req.body
        const f = req.file
        pool.query(
            'CALL sp_attachment_save( ?, ?, ?, ?, ?, ?, ?, ?, ? )',
            [ req.user.id, d.object_type, d.object_id, d.name, d.info, f.filename, f.path, f.size, f.mimetype ],
            (err, r, fields)=>{
                res.send( err ? util.err(err, 'DB', "db error") : util.ok(r[0]) )
            }
        )
    }
});
app.get('/attachment/view/:token', (req, res)=>{
    const token = req.params.token
    pool.query(
        'CALL sp_token_verify(?)',
        [token],
        (err, r, fields)=>{
            r = r[0]
            if(!r)
                res.send( util.err(token, 'TOKEN_ERROR', 'Invalid / Expired token') )
            else{
                r = r[0]
                pool.query(
                    'CALL sp_attachment_bykey(?)',
                    r.object_key,
                    (err, r2, f)=>{
                        r2 = r2[0]
                        if(r2[0]){
                            r2 = r2[0]
                            res.setHeader('content-type', r2.file_type)
                            res.download(path.resolve(r2.file_loc), r2.name + "." + r2.file_type.split('/')[1])
                        }else{
                            res.send( util.err(r.object_key, 'ATTACHMENT_ERROR', 'Attachment not found') )
                        }
                    }
                )
            }
        }
    )
})

app.get('/restart', (req, res)=>{
    res.send("Application has been restarted");
    process.exit(1);
})

app.listen(env.APP_PORT)
console.log( "Server running..." + env.APP_PORT )