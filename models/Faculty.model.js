const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema(
	{
		index: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
