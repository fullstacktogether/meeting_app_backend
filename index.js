const express = require("express");
const app = express();
require("./database/dbConnection");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);
