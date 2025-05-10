const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App is running on port: " + PORT);
});
