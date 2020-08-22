var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))




var Users = require('./routes/Users')

var Survey = require('./routes/SurveyQuestions')

app.use('/users', Users)

app.use('/push',require('./push'))

app.use('/users/questions',Survey)

app.listen(port,() => {
    console.log("Server is running on port: " + port)
})