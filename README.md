# TKPM 17/32 - BT01
Quản lý sinh viên 

1712827 - Trần Quốc Toản

[Demo](https://safe-hollows-18610.herokuapp.com/) - [Github](https://github.com/yato511/QLSV)

## Usage

Install all the packages
```
npm i
```

Run on [http://localhost:8000](http://localhost:8000/)

```
node app
```

Connect to Cluster (database) for NodeJS version 3.0 or later (see more in app.js)
```
const mongoose = require("mongoose");
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
```
## Deployment
 - Using Heroku
* [Demo](https://safe-hollows-18610.herokuapp.com/)

## Built With

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Authors

* **Trần Quốc Toản** - [yato511](https://github.com/yato511)
