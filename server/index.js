const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use(express.static(path.join("__dirname", "..", "/public")));

const PORT = process.env.PORT || 3000;

app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//Error-handling endware
app.use('/', (err, req, res, next) => {
	res.status(err.status || 500).send({ message: err.message } || "Internal server error");
})

app.listen(PORT, () => {
  console.log(`App is listening at localhost:${PORT}`);
});

module.exports = app