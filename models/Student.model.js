const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
	{
		studentId: {
			type: String,
			required: true,
			unique: true,
		},
		year: {
			type: Number,
			required: true,
		},
		name: {
			firstName: {
				type: String,
				required: true,
			},
			lastName: {
				type: String,
				required: true,
			},
		},
		birthday: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		faculty: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

studentSchema.plugin(mongoosePaginate);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
