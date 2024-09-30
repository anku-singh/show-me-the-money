require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const sheetRoutes = require("./routes/sheetRoutes");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/v1/sheet", sheetRoutes);

app.get("/", (req, res) => {
  res.send("Show me the money");
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
