const express = require("express");
const { json, urlencoded } = require("express");

//? Staff APIs
const { addStaffAPI } = require("./routes/staff/add");
const { allStaffAPI } = require("./routes/staff/all");
const { removeStaffAPI } = require("./routes/staff/remove");
const { staffPasswordAPI } = require("./routes/staff/resetDefaultPassword");

//? Admin APIs
const { addAdminAPI } = require("./routes/admin/add");
const { removeAdminAPI } = require("./routes/admin/remove");

//? Login API
const { loginAPI } = require("./routes/auth/login");

//? Supplies APIs
const { addSuppliesAPI } = require("./routes/supplies/add");
const { editSuppliesAPI } = require("./routes/supplies/edit");

//? Sales APIs
const { makeSaleAPI } = require("./routes/sales/sales");

//? Machines, Tools, and PPEs APIs
const { addMachinesAPI } = require("./routes/machines/add");
const { getAllMachinesAPI } = require("./routes/machines/all");

const {
	operationalizeMachineAPI,
} = require("./routes/machines/operationalize");

const { deprecateMachineAPI } = require("./routes/machines/deprecate");

//? PPEs API
const { getAllPPEs } = require("./routes/PPEs/all");
const { addPPEsAPI } = require("./routes/PPEs/add");
const { editPPEsAPI } = require("./routes/PPEs/edit");
const { assignPPEsAPI } = require("./routes/PPEs/assign");

//? Tools API
const { getAllToolsAPI } = require("./routes/Tools/all");
const { addToolsAPI } = require("./routes/Tools/add");
const { editToolsAPI } = require("./routes/Tools/edit");
const { assignToolsAPI } = require("./routes/Tools/assign");

//? Staff and admin middleware
const { staff } = require("./middleware/staff/check");
const { admin } = require("./middleware/admin/check");
const { superAdmin } = require("./middleware/super_admin/check");

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
app.use("/api/machines/all", [staff], getAllMachinesAPI);
app.use("/api/machine/add", [admin], addMachinesAPI);
app.use("/api/machine/deprecate", [superAdmin], deprecateMachineAPI);
app.use("/api/machine/operationalize", [superAdmin], operationalizeMachineAPI);
app.use("/api/ppes/all", [admin], getAllPPEs);
app.use("/api/ppes/add", [admin], addPPEsAPI);
app.use("/api/ppes/edit", [admin], editPPEsAPI);
app.use("/api/ppes/assign", [admin], assignPPEsAPI);
app.use("/api/tools/all", [admin], getAllToolsAPI);
app.use("/api/tools/add", [superAdmin], addToolsAPI);
app.use("/api/tools/edit", [superAdmin], editToolsAPI);
app.use("/api/tools/assign", [admin], assignToolsAPI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
