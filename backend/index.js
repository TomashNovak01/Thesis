const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 8080;

const contractRouter = require("./routers/contract.router");
const fieldRouter = require("./routers/field.router");
const remarkRouter = require("./routers/remark.router");
const researchRouter = require("./routers/research.router");
const templateRouter = require("./routers/template.router");
const userRouter = require("./routers/user.router");

const upload = multer();

app.use(express.json());
app.use(cors());
app.use(upload.single("file"));

app.use("/api", contractRouter);
app.use("/api", fieldRouter);
app.use("/api", remarkRouter);
app.use("/api", researchRouter);
app.use("/api", templateRouter);
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
