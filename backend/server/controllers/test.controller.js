const Test = require("../models/test.model");

module.exports.testResponse = (req,res) => {
    res.json({message:"This is testing the Test controller"});
}

module.exports.findTest = (req,res) => {
    Test.findOne({_id: req.params._id})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Find Test: ",error: err}))
}

module.exports.findAllTests = (req,res) => {
    Test.find({})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Find All Tests: ",error: err}))
}

module.exports.createTest = (req,res) => {
    Test.create(req.body)
    .then(newTest=>res.json({results: newTest}))
    .catch(err=>res.status(400).json(err))
}

module.exports.deleteTest = (req,res) => {
    Test.deleteOne({_id: req.params._id})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Delete Test: ",error: err}))
}

module.exports.deleteAllTests = (req,res) => {
    Test.remove({})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Delete All Products: ",error: err}))
}

module.exports.updateTest = (req,res) => {
    Test.updateOne({_id: req.params._id}, req.body)
    .then(results=>res.json({results: results}))
    .catch(err=>res.json(err))
}

module.exports.findRandomTest = (req,res) => {
    Test.find({})
    .then(results=>{
        let result = results[Math.floor(Math.random() * results.length)];
        res.json({results: result})
    })
    .catch(err=>res.status(400).json({message: "Failed Find All Products: ",error: err}))
}