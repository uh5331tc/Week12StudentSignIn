let express = require('express')
let db = require('../models') // the models directory 
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    Student.findAll().then( students => {
        return res.json(students)  // default its sending '200' status code, with no errors
    
    })
})

router.post('/students', function(req, res, next){
    Student.create( req.body).then( data => {
        return res.status(201).send('created')  // '201' successfully + msg = created
        // OR status codes like '404 ERROR', '500 Server Error', 
    })
})

module.exports = router 



