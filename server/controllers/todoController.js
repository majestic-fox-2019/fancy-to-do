const Todo = require('../models').Todo;
const User = require('../models').User;
const axios = require('axios');

class TodoController{
    static create(req,res,next){
        console.log(req.body)
        console.log(req.query)

        axios({
            url : ' https://neutrinoapi.net/bad-word-filter',
            method : 'post',
            headers : {
                'user-id' : 'JPetra',
                'api-key' : 'LoPY50W0V43NXp1HGj3T8Pbxv9Rb4j3ljptr2MSvFqwd4dnJ'
            },
            data : {
                content : req.body.title+" "+req.body.desc,
                'output-case' : 'camel' 
            }
        })
        .then(({data})=>{
            if(data.isBad === true){
                next('profanity')
                return
            } else {
                const body = {
                    title : req.body.title,
                    desc : req.body.desc,
                    due_date : req.body.due_date,
                    UserId : req.user.id
                }
        
                if(Object.keys(req.query).length > 0){
                    body.ProjectId = req.query.ProjectId
                }
        
                Todo.create(body)
                .then(response => {
                    console.log(response)
                    res.status(200).json(response)
                })
                .catch(err => {
                    console.log(err)
                    next(err)
                })
            }
        })
        .catch(err=> {
            console.log(err)
        })

    }
    
    static read(req,res,next){
        Todo.findAll({
            include : [{
                model : User,
                attributes : ['email'],
            }],
            where : {
                '$User.email$' : req.user.email
            }
        })
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static readOne(req,res,next){
        Todo.findByPk(req.params.id,
            {
            include : [{
                model : User,
                attributes : ['email']
            }]
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static update(req,res,next){
        Todo.update(req.body,{
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static delete(req,res,next){
        let condition = {
            id : req.params.id
        }

        if(Object.keys(req.query).length > 0){
            condition.ProjectId = req.query.ProjectId
        }

        Todo.destroy({
            where : condition
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static toggleStatus(req,res,next){
        Todo.findByPk(req.params.id)
        .then(response => {
            if(response){
                if(response.status === 0){
                    Todo.update({
                        status : 1
                    },{
                        where : {
                            id : req.params.id
                        }
                    })
                    .then(response => {
                        res.status(200).json(response)
                    })
                    .catch(err => {
                        next(err)
                    })
                } else if (response.status === 1){
                    Todo.update({
                        status : 0
                    },{
                        where : {
                            id : req.params.id
                        }
                    })
                    .then(response => {
                        res.status(200).json(response)
                    })
                    .catch(err => {
                        next(err)
                    })
                }
            } else {
                next('todo-not-found')
            }
        })
    }
}

module.exports = TodoController