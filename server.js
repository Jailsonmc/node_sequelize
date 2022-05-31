const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv")
dotenv.config()

var corsOptions = {
  origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
});

// simple route
/*app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});*/

require("./routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || process.env.PORT;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});