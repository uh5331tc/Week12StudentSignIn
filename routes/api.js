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

// TODO EDIT STUDENT
router.patch('/students/:id', function (req, res, next) { //ERROR?? CHANGED /'student(s)/:id'
// studentID will be set to request 
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID} } )
        .then ( () => {
            return res.send('ok')
        })
})

// TOODO DELETE STUDENT
// 




module.exports = router 
// cant write anything after this line ^