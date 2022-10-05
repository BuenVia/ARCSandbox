const express = require("express");
const router = express.Router();

const Services = require("../models/service");
const Downloads = require("../models/downloads");
const Webinars = require("../models/webinars");

// Login and homepages
router.get("/admin", (req, res) => {
  res.render("admin/index");
});

router.get("/home", (req, res) => {
  res.render("admin/admin-console");
});

router.post("/admin", (req, res) => {
  if (req.body.userName === "James" && req.body.password === "EA51VDA") {
    res.render("admin/admin-console");
  } else {
    res.send("Failure");
  }
});

// Create and edit a service
router.get("/admin/services-create", (req, res) => {
  res.render("admin/services-create");
});

router.post("/admin/services-create", (req, res) => {
  const newService = new Services({
    title: req.body.title,
    subTitle: req.body.subTitle,
    content: req.body.content
  });
  newService.save((err) => {
    if (!err) {
      res.redirect("/home");
    }
  });
});

router.get("/admin/services-edit", (req, res) => {
  Services.find({}, (err, foundResults) => {
    if (!err) {
      res.render("admin/services-edit", { services: foundResults });
    }
  });
});

router.get("/admin/services/:id", (req, res) => {
  const serviceId = req.params.id;
  Services.findOne({ _id: serviceId }, (err, foundResult) => {
    res.render("admin/edit-form", { service: foundResult });
  });
});

router.post("/admin/services-update", (req, res) => {
  const updateId = req.body.id;
  const updatedService = {
    title: req.body.title,
    subTitle: req.body.subTitle,
    content: req.body.content
  };
  Services.updateOne({ _id: updateId }, { $set: updatedService }, (err) => {
    if (!err) {
      res.redirect("/home?service-update=success");
    } else {
      res.send(err);
    }
  });
});

router.post("/admin/services-delete", (req, res) => {
  const deleteId = req.body.id;
  Services.deleteOne({ _id: deleteId }, (err) => {
    if (!err) {
      res.redirect("/home?delete-service=success");
    }
  });
});

// Show who has downloaded eBook
router.get("/admin/ebook", (req, res) => {
  Downloads.find({}, (err, foundResults) => {
    if (!err) {
      res.render("admin/downloads", { downloads: foundResults });
    }
  });
});

module.exports = router;
