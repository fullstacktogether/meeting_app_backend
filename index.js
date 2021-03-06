const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middleware/error-handler");
require("./database/dbConnection");

app.use(express.json());

//Enabe Cors
app.use(cors());
app.options("*", cors());

app.use("/uploads", express.static(__dirname + "/uploads"));

// Routes
app.use("/api", routes);

// Error Middleware
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);
