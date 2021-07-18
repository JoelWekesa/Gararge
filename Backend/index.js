const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");

//? Staff APIs
const staffAPI = require("./routes/staff");

//? Admin APIs
const adminAPI = require("./routes/admin");

//? Login API
const loginAPI = require("./routes/auth/login");

//? Supplies APIs
const { addSuppliesAPI } = require("./routes/supplies/add");
const { editSuppliesAPI } = require("./routes/supplies/edit");

//? Sales APIs
const { makeSaleAPI } = require("./routes/sales/sales");

//? Machines, Tools, and PPEs APIs
const machinesAPI = require("./routes/machines");

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

//? Supplies Categories API
const {
	AddSuppliesCategoriesAPI,
} = require("./routes/supplies_categories/add");
const {
	getAllSuppliesCategoriesAPI,
} = require("./routes/supplies_categories/getAll");

//? Departments API
const departmentsAPI = require("./routes/departments");

//? Staff and admin middleware
const { staff } = require("./middleware/staff/check");
const { admin } = require("./middleware/admin/check");
const { superAdmin } = require("./middleware/super_admin/check");

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api/staff", staffAPI);
app.use("/api/admin", adminAPI);
app.use("/api/auth", loginAPI);
app.use("/api/machines", machinesAPI);
app.use("/api/departments", departmentsAPI);
app.use("/api/supplies/add", [admin], addSuppliesAPI);
app.use("/api/supplies/edit", [admin], editSuppliesAPI);
app.use("/api/make/sale", [admin], makeSaleAPI);
app.use("/api/ppes/all", [admin], getAllPPEs);
app.use("/api/ppes/add", [admin], addPPEsAPI);
app.use("/api/ppes/edit", [admin], editPPEsAPI);
app.use("/api/ppes/assign", [admin], assignPPEsAPI);
app.use("/api/tools/all", [admin], getAllToolsAPI);
app.use("/api/tools/add", [superAdmin], addToolsAPI);
app.use("/api/tools/edit", [superAdmin], editToolsAPI);
app.use("/api/tools/assign", [admin], assignToolsAPI);
app.use("/api/suppliescategories/add", [admin], AddSuppliesCategoriesAPI);
app.use("/api/suppliescategories/all", [admin], getAllSuppliesCategoriesAPI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
