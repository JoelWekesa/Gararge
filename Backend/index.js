const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");

//? APIs
const staffAPI = require("./routes/staff");
const adminAPI = require("./routes/admin");
const loginAPI = require("./routes/login");
const machinesAPI = require("./routes/machines");
const departmentsAPI = require("./routes/departments");
const categoriesAPI = require("./routes/categories");
const suppliesAPI = require("./routes/supplies")
const salesAPI = require("./routes/sales");
const toolsAPI = require("./routes/tools");
const ppeAPI = require("./routes/ppes")


const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api/staff", staffAPI);
app.use("/api/admin", adminAPI);
app.use("/api/auth", loginAPI);
app.use("/api/machines", machinesAPI);
app.use("/api/departments", departmentsAPI);
app.use("/api/supplies", suppliesAPI);
app.use("/api/sales", salesAPI);
app.use("/api/tools", toolsAPI);
app.use("/api/categories", categoriesAPI);
app.use("/api/ppes", ppeAPI);


const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
