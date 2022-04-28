let express = require('express')
let api_routes = require('./routes/api.js')

//create web application 
let app = express()

//be able to handle JSON Requests, vconvert data to JavaScript
app.use(express.json())

app.use('/api', api_routes)

app.use(function(req, res, next) {
    // respond with '404' to any other requests 
    res.status(404).send('Not Found')
})

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server Error')
})

// start server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port )
})


