const router = require("express").Router();
const Faculty = require("../models/Faculty.model");
const Student = require("../models/Student.model");

router.get("/", (req, res) => {
	Faculty.find()
		.sort("index")
		.then(async (list) => {
			let fList = await Promise.all(
				list.map(async (f) => {
					const total2016 = await Student.countDocuments({
						faculty: f.name,
						year: 2016,
					});
					const total2017 = await Student.countDocuments({
						faculty: f.name,
						year: 2017,
					});
					const total2018 = await Student.countDocuments({
						faculty: f.name,
						year: 2018,
					});
					const total2019 = await Student.countDocuments({
						faculty: f.name,
						year: 2019,
					});
					const total = {
						t2016: total2016,
						t2017: total2017,
						t2018: total2018,
						t2019: total2019,
						t: total2016 + total2017 + total2018 + total2019,
					};
					return { index: f.index, name: f.name, total: total };
				})
			);
			const totals = {
				t2016: fList.reduce(
					(a, b) => (a.total ? a.total.t2016 : a) + b.total.t2016
				),
				t2017: fList.reduce(
					(a, b) => (a.total ? a.total.t2017 : a) + b.total.t2017
				),
				t2018: fList.reduce(
					(a, b) => (a.total ? a.total.t2018 : a) + b.total.t2018
				),
				t2019: fList.reduce(
					(a, b) => (a.total ? a.total.t2019 : a) + b.total.t2019
				),
			};
			const totalStudent =
				totals.t2016 + totals.t2017 + totals.t2018 + totals.t2019;
			res.render("facultyList", {
				list: fList,
				title: "Khoa",
				totalStudent,
				totals,
			});
		})
		.catch((err) => console.log(err));
});

router.post("/check", async (req, res) => {
	const { name } = req.body;
	const matched = await Faculty.findOne({ name }).lean();
	if (matched) {
		res.json(0);
	} else {
		res.json(1);
	}
});

router.post("/create", async (req, res) => {
	const fList = await Faculty.find();
	const index =
		fList.length < 10 ? "0" + (fList.length + 1) : "" + (fList.length + 1);
	const newFaculty = new Faculty({
		index,
		name: req.body.name,
	});
	newFaculty
		.save()
		.then(() => res.json(1))
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

router.delete("/delete", (req, res) => {
	Faculty.findOneAndDelete({ name: req.body.name })
		.then(() => res.json(1))
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

module.exports = router;
