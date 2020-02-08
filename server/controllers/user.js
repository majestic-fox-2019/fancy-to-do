const User = require('../models').User
const checkPassword = require('../helpers/checkPassword')
const generateToken = require('../helpers/generateToken')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const userObj = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userObj)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    next({ code: 404, message: "email or password incorect" })
                } else {
                    const match = checkPassword(req.body.password, user.password)
                    if (!match) {
                        next({ code: 400, message: "email or password incorect" })
                    } else {
                        const token = generateToken({ id: user.id })
                        req.headers.token = token
                        res.status(200).json({ user, token })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static audiodbAPI(req, res, next) {
        axios({
            method: 'get',
            url: 'https://theaudiodb.com/api/v1/json/1/search.php', 
            params: {
                s:req.body.title
            }
        })
        .then(({data})=>{
            res.status(200).json(data)
        } )
        .catch(err =>{
            next(err)
        })
    }

    static provinsiAPI(req, res, next) {
        axios({
            method: 'get',
            url:'http://dev.farizdotid.com/api/daerahindonesia/provinsi',
            data:{
                province:req.body.name
            }
        })
        .then(({data}) => {
            data.semuaprovinsi.forEach(el => {
                let provinceFound
                if(el.nama === req.body.province){
                    provinceFound = el
                    res.status(200).json(provinceFound)
                } 
                next({code:400, message:"province not found"})
            });
        })
        .catch(err =>{
            next(err)
        })
    }

    static zodiakAPI(req, res, next){
        axios({
            method: 'get',
            url:'https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w',
            params:{
                nama:req.body.nama,
                tanggal: req.body.tanggal
            }
        })
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static googleSignIn(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience:process.env.CLIENT_ID
        })
        .then(ticket => {

            let payload = ticket.getPayload()
            User.findOne({where:{email:payload.email}})
            .then(user => {
                if(user) {
                    let token = generateToken({id: user.id})
                    console.log(token)
                    res.status(200).json({token})
                } else {
                    User.create({
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                    .then(user => {
                        let token = generateToken({id: user.id})
                        res.status(201).json({token})
                    })
                }
            })
            .catch(err => {
                next(err)
            })
        })
    }

}

module.exports = UserController