const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
require("./database/dbConnection");

app.use(express.json());

//Enabe Cors
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api", routes);

// Error Middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);
