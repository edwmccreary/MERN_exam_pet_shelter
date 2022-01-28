const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

//allow client to make requests from backend
app.use(cors());

//trigger mongoose.connect statement to init db connection
require("../backend/server/config/mongoose.config");

//handle post requests
app.use(express.json(), express.urlencoded({ extended: true }));

//routes go here
const testRoutes = require("../backend/server/routes/test.routes")(app);
const petRoutes = require("../backend/server/routes/pet.routes")(app);

app.listen(port, ()=>console.log("server is running on port "+port));

// const server = app.listen(port, () =>
//     console.log('The server is all fired up on port '+port)
// );

// const io = require('socket.io')(server, { cors: true });

// io.on("connection", socket => {
//     console.log(socket.id);
//     socket.on("event_from_client", data=>{
//         socket.broadcast.emit("send_data_to_all_other_clients", data);
//     })
// })

