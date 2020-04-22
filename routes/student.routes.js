const router = require("express").Router();
const Faculty = require("../models/Faculty.model");
const Student = require("../models/Student.model");

router.get("/create", async (req, res) => {
	const fList = await Faculty.find().lean();
	res.render("studentCreate", { fList, title: "Thêm sinh viên mới" });
});

router.get("/:page", async (req, res) => {
	const options = {
		page: req.params.page,
		limit: 10,
		sort: "studentId",
		lean: true,
	};

	Student.paginate({}, options, function (err, result) {
		const sList = result.docs.map((student) => {
			const bday = new Date(student.birthday);
			let dd = bday.getDate();
			let mm = bday.getMonth() + 1;
			let yyyy = bday.getFullYear();
			if (dd < 10) {
				dd = "0" + dd;
			}
			if (mm < 10) {
				mm = "0" + mm;
			}
			return {
				...student,
				name: student.name.lastName + " " + student.name.firstName,
				birthday: dd + "/" + mm + "/" + yyyy,
			};
		});
		let pageList = [];
		for (let i = 0; i < result.totalPages; i++) {
			pageList.push({ number: i + 1, active: i + 1 == req.params.page });
		}
		const pagingCounterLast = result.pagingCounter + result.docs.length - 1;
		res.render("studentList", {
			...result,
			docs: sList,
			pageList,
			pagingCounterLast,
			title: "Sinh viên",
		});
	});
});

// router.post("/check", async (req, res) => {
// 	const { studentId } = req.body;
// 	const matched = await Student.findOne({ studentId }).lean();
// 	if (matched) {
// 		res.json(0);
// 	} else {
// 		res.json(1);
// 	}
// });

router.post("/generate", async (req, res) => {
	const { year, faculty } = req.body;
	const f = await Faculty.findOne({ name: faculty }).lean();
	const sList = await Student.find({ faculty, year }).sort("studentId").lean();
	let sIndex;
	if (sList.length == 0) {
		sIndex = "001";
	} else {
		let temp = parseInt(sList[sList.length - 1].studentId.slice(-3)) + 1;
		if (temp < 10) {
			sIndex = "00" + temp;
		} else if (temp < 100) {
			sIndex = "0" + temp;
		} else {
			sIndex = "" + temp;
		}
	}
	const studentId = (year - 2000).toString() + f.index + sIndex;

	res.json(studentId);
});

router.post("/create", (req, res) => {
	const bday = req.body.birthday.split("/");
	const newStudent = new Student({
		studentId: req.body.studentId,
		name: req.body.name,
		birthday: new Date(bday[2], bday[1] - 1, bday[0]),
		gender: req.body.gender,
		address: req.body.address,
		faculty: req.body.faculty,
		year: parseInt(req.body.year),
	});
	newStudent
		.save()
		.then(() => res.json(1))
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

router.delete("/delete", (req, res) => {
	Student.findOneAndDelete({ studentId: req.body.studentId })
		.then(() => res.json(1))
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

module.exports = router;
