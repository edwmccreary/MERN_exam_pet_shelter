const PetController = require("../controllers/pet.controller");

module.exports = app => {
    //put all of your routes here
    app.get("/api/petTest", PetController.testResponse);
    app.get("/api/pets/findAll", PetController.findAllPets);
    app.post("/api/pets/create", PetController.createPet);
    app.get("/api/pets/find/:_id", PetController.findPet);
    app.delete("/api/pets/delete/all", PetController.deleteAllPets);
    app.delete("/api/pets/delete/:_id", PetController.deletePet);
    app.patch("/api/pets/update/:_id", PetController.updatePet);
    app.get("/api/pets/name/:name", PetController.findByName);
}