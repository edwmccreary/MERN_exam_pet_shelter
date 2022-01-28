const Pet = require("../models/pet.model");

module.exports.testResponse = (req,res) => {
    res.json({message:"This is testing the Pet controller"});
}

module.exports.findPet = (req,res) => {
    Pet.findOne({_id: req.params._id})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Find Pet: ",error: err}))
}

module.exports.findAllPets = (req,res) => {
    Pet.find({})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Find All Pets: ",error: err}))
}

module.exports.findByName = (req,res) => {
    Pet.find({name: req.params.name})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Find By Name: ",error: err}))
}

module.exports.createPet = (req,res) => {
    Pet.create(req.body)
    .then(newPet=>res.json({results: newPet}))
    .catch(err=>res.status(400).json(err))
}

module.exports.deletePet = (req,res) => {
    Pet.deleteOne({_id: req.params._id})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Delete Pet: ",error: err}))
}

module.exports.deleteAllPets = (req,res) => {
    Pet.remove({})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "Failed Delete All Pets: ",error: err}))
}

module.exports.updatePet = (req,res) => {
    Pet.updateOne({_id: req.params._id}, req.body, {runValidators:true})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json(err))
}