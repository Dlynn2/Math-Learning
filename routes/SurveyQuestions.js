const express = require("express")
const surveyQuestions = express.Router()
const Survey = require("../models/Survey")

surveyQuestions.post('/survey', (req,res) =>{
    const answers = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        questionOne:req.body.questionOne,
        questionTwo:req.body.questionTwo,
        questionThree:req.body.questionThree,
        questionFour:req.body.questionFour,
        questionFive:req.body.questionFive
    }
    .then(survey=>{
        Survey.create(answers)
        res.send("here")
    })
})
module.exports = surveyQuestions