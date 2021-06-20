const express = require("express");
const { json, urlencoded } = require("express");
const { usersAPI } = require("./routes/users");
const { addStaffAPI } = require("./routes/staff");
const { removeStaffAPI } = require("./routes/removeStaff");
const { addAdminAPI } = require("./routes/addAdmin");
const { removeAdminAPI } = require("./routes/removeAdmin");
const { loginAPI } = require("./routes/login");
const { staffPasswordAPI } = require("./routes/staffPassword");
// const { db } = require("./db/db");
const { admin, superAdmin } = require("./middleware/staff");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

// try {
// 	db.authenticate();
// 	console.log("Connection has been established successfully.");
// } catch (error) {
// 	console.error("Unable to connect to the database:", error);
// }

app.use("/users", usersAPI);
app.use("/api/staff/add", [admin], addStaffAPI);
app.use("/api/staff/remove", [superAdmin], removeStaffAPI);
app.use("/api/admin/add", [superAdmin], addAdminAPI);
app.use("/api/admin/remove", [superAdmin], removeAdminAPI);
app.use("/api/auth/login", loginAPI);
app.use("/api/password/default", staffPasswordAPI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
