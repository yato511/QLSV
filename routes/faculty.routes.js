const router = require("express").Router();
const Faculty = require("../models/Faculty.model");

router.get("/", async (req, res) => {
	const list = await Faculty.find().lean();
	const fList = list.map((faculty, index) => ({
		...faculty,
		index: index + 1,
		name: faculty.name,
	}));
	res.render("facultyList", { list: fList, title: "Khoa" });
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

router.post("/create", (req, res) => {
	const newFaculty = new Faculty({
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
