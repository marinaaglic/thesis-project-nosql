const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURL = process.env.mongoURL;
const PORT = process.env.PORT || 4000;
// Connecting to database
mongoose.connect(
mongoURL,
{
	dbName: "fakultet",
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(result => {

    console.log("Connected to database");
}).catch(error => {
    console.log("Error when connecting to database: ", error);
});

