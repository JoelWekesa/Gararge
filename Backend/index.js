const express = require("express");
const { json, urlencoded } = require("express");

//? Staff APIs
const {
	allStaffAPI,
	addStaffAPI,
	staffPasswordAPI,
	removeStaffAPI,
} = require("./routes/staff");

//? Admin APIs
const { addAdminAPI, removeAdminAPI } = require("./routes/admin");

//? Login API
const { loginAPI } = require("./routes/login");

//? Supplies APIs
const { addSuppliesAPI, editSuppliesAPI } = require("./routes/supplies");

//? Sales APIs
const { makeSaleAPI } = require("./routes/sales");

//? Staff and admin middleware
const { admin, superAdmin } = require("./middleware/staff");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api/all/staff", [admin], allStaffAPI);
app.use("/api/staff/add", [admin], addStaffAPI);
app.use("/api/staff/remove", [superAdmin], removeStaffAPI);
app.use("/api/admin/add", [superAdmin], addAdminAPI);
app.use("/api/admin/remove", [superAdmin], removeAdminAPI);
app.use("/api/auth/login", loginAPI);
app.use("/api/password/default", staffPasswordAPI);
app.use("/api/supplies/add", [admin], addSuppliesAPI);
app.use("/api/supplies/edit", [admin], editSuppliesAPI);
app.use("/api/make/sale", [admin], makeSaleAPI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
