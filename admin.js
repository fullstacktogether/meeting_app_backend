const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("./models/User");
const Event = require("./models/Event");
const Group = require("./models/Group");

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [User, Event, Group],
  rootPath: "/admin",
  branding: { companyName: "Berkkan & Kıraç" },
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
