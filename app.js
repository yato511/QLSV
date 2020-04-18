const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("public"));
mongoose.connect(
	"mongodb+srv://yato:JnEtDU8z0ABrAnBX@cluster0-girec.gcp.mongodb.net/test?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}
);

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection established successfully");
});

app.use("/student", require("./routes/student.routes"));
app.use("/faculty", require("./routes/faculty.routes"));
app.use("/", (req, res) => res.redirect("/student/1"));

let port = process.env.PORT;
if (port == null || port == "") {
	port = 8000;
}
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
