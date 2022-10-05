const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB);

const app = express();

const pageRouter = require("./routes/pageRouter");
const adminRouter = require("./routes/adminRouter");
const apiRouter = require("./routes/apiRouter");

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

// PAGES //
app.get("/", pageRouter);
app.get("/ebook", pageRouter);
app.post("/ebook/download", pageRouter);

// SERVICES //
app.get("/services", pageRouter);
app.get("/services/:id", pageRouter);

// ADMIN //
app.get("/admin", adminRouter);
app.post("/admin", adminRouter);
app.get("/home", adminRouter);
app.get("/admin/services-create", adminRouter);
app.post("/admin/services-create", adminRouter);
app.get("/admin/services-edit", adminRouter);
app.post("/admin/services-update", adminRouter);
app.get("/admin/services/:id", adminRouter);
app.post("/admin/services-delete", adminRouter);
app.get("/admin/ebook", adminRouter);

// API //
app.get("/api/service", apiRouter);
app.post("/api/service", apiRouter);
app.get("/api/ebook", apiRouter);
app.post("/api/ebook", apiRouter);
app.get("/api/webinar", apiRouter);
app.post("/api/webinar", apiRouter);

app.listen(3000, (req, res) => {
  console.log("App listening on port 3000");
});

// Links to social media
// Sevices
// Webinar - to be able to create, update, and delete date and time and have sign-up form
