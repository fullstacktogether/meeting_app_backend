const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("./models/User");
const Event = require("./models/Event");

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [User, Event],
  rootPath: "/admin",
  branding: { companyName: "Berkkan & Kıraç" },
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
