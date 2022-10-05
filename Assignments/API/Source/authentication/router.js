const express = require('express');
const router = express.Router();
const conn  = require('../config/connection');
const { signupValidation, loginValidation } = require('./validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', signupValidation, (req, res, next) => {
    const body = req.body;
    if(!(body.email && body.password)){
        return res.status(400).send({ error: "Email and password are null" });
    }
    conn.query(`SELECT * FROM users WHERE LOWER(email) = LOWER('${req.body.email}');`,(err, result) => {
    if (result.length) {
        return res.status(409).send({msg: 'This user is already in use!'});
    } 
    else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({msg: err});
            } 
            else {
                // hashed pw add to database
                conn.query(`INSERT INTO users (firstname, lastname, email, password, gender, country) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hash}', '${req.body.gender}', '${req.body.country}')`,(err, result) => {
                if (err) {
                    return res.status(400).send({msg: err});
                }
                return res.status(201).send({msg: 'The user has been registered with us!'});
                });
            }
        });
    }});
});

router.post('/login', loginValidation, (req, res, next) => {
    conn.query(`SELECT * FROM users WHERE email = '${req.body.email}';`,(err, result) => {
        // user does not exists
        if (err) {
            return res.status(400).send({msg: err});
        }
        if (!result.length) {
            return res.status(401).send({msg: 'Email or password is incorrect!'});
        }
        // check password
        bcrypt.compare(req.body.password,result[0]['password'],(bErr, bResult) => {
        // wrong password
            if (bErr) {
                return res.status(401).send({msg: 'Email or password is incorrect!',bErr});
            }
            if (bResult) {
                const token = jwt.sign({id:result[0].userid},'the-super-strong-secret',{ expiresIn: '7h' });
                conn.query(`UPDATE users SET modifiedtime = now() WHERE userid = '${result[0].userid}'`);
                return res.status(200).send({msg: 'Logged in!',token,user: result[0]});
            }
            return res.status(401).send({msg: 'Username or password is incorrect!'});
        });
    });
});

router.post('/get-user', signupValidation, (req, res, next) => {
    if(!req.headers.authorization ||!req.headers.authorization.startsWith('Bearer') ||!req.headers.authorization.split(' ')[1]){
        return res.status(422).json({message: "Please provide the token"});
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secret');
    conn.query(`SELECT * FROM users where userid = ${decoded.id}`, function (error, results, fields) {
    if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
});

module.exports = router;