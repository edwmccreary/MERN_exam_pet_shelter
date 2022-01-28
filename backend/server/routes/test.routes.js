const TestController = require("../controllers/test.controller");

module.exports = app => {
    //put all of your routes here
    app.get("/api/test", TestController.testResponse);
    app.get("/api/tests/findAll", TestController.findAllTests);
    app.get("/api/tests/findRandom", TestController.findRandomTest);
    app.post("/api/tests/create", TestController.createTest);
    app.get("/api/tests/find/:_id", TestController.findTest);
    app.delete("/api/tests/delete/all", TestController.deleteAllTests);
    app.delete("/api/tests/delete/:_id", TestController.deleteTest);
    app.patch("/api/tests/update/:_id", TestController.updateTest);
    
}