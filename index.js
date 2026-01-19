const express = require("express");
const app = express();
const PORT = 8080;
const dbConnection = require("./config/config.js");
const router = require("./routes/tasks.js");

app.use(express.json());

app.use("/", router);

dbConnection();

app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));