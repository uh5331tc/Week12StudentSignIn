let express = require('express')
let db = require('../models') // the models directory 
let Student = db.Student

let router = express.Router()
// only 4 
router.get('/students', function(req, res, next){
    Student.findAll( {order: ['present', 'name']} ).then( students => {
        return res.json(students)  // default its sending '200' status code, with no errors
           
    }).catch(err => next(err) ) // pass to server error to return 500Error
})

router.post('/students', function(req, res, next){
    Student.create( req.body).then( data => {
        return res.status(201).send('created')  // '201' successfully + msg = created
        // OR status codes like '404 ERROR', '500 Server Error', 
    }).catch( err => {  //handle user errors like missing StarID
        if (err instanceof db.Sequelize.ValidationError ) {
            // respond with 400 error include error messages
            let messages = err.errors.map ( e => e.message)
            return req.status(400).json(messages)
        }

        //otherwise something else is wrong 
        return next(err)  //next error function will go back to Server.js


    })
})

// TODO EDIT STUDENT
router.patch('/students/:id', function (req, res, next) { //ERROR?? CHANGED /'student(s)/:id'
// studentID will be set to request 
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID} } )
        .then ( (rowsModified) => {

            let numberOfRowsModified = rowsModified[0]
            if (numberOfRowsModified ==1 ) { //number of rows changed
                return res.send('ok')
            } else {
                return res.status(404).json(['Student with that id not found'])
            }
            //student not found error
            //what about violting a constraint, like no name or starID
        }).catch(err => {
            // validation error thats a bad request
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map(e => e.message)
                return res.status(400).json(messages)
            } else {
                // unexpected error
                return next(err)
            }
        })
})

// TOODO DELETE STUDENT
// 
//students/100
router.delete('/students/:id', function(req, res, next) {
    let studentID = req.params.id
    Student.destroy( {where: { id: studentID } } )  // sqlite will delete as well 
        .then( (rowsModified) => {   //use where: {defineTodelete}
            if (rowsModified == 1) {
                return res.send('ok')
            } else {
                return res.status(404).json(['Not Found'])
            }
        })
        .catch(err => next(err) )
})


module.exports = router 
// cant write anything after this line ^