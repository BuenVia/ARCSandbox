const express = require("express");
const router = express.Router();
// const nodeMailer = require("nodemailer");

// const transporter = nodeMailer.createTransport({
//   service: "Hotmail",
//   auth: {
//     user: process.env.EMAIL_ADD,
//     pass: process.env.EMAIL_PW
//   }
// });

const Services = require("../models/service");
const Downloads = require("../models/downloads");
const Webinars = require("../models/webinars");

router.get("/", (req, res) => {
  Webinars.findOne({}, (err, foundResult) => {
    if (!err) {
      res.render("index", { webinar: foundResult });
    }
  });
});

router.get("/services", (req, res) => {
  const vda = require("../public/js/vda");
  res.render("services/index", { vda: vda });
});

router.get("/services/:id", (req, res) => {
  const serviceId = req.params.id;
  const vda = require("../public/js/vda");
  let service;

  function servFind(item) {
    if (item.title === serviceId) {
      service = item;
    }
  }

  vda.filter(servFind);

  // vda.forEach((v) => {
  //   if (v.title === serviceId) {
  //     service = v;
  //   }
  // });
  res.render("services/service", { service: service });
});

router.get("/ebook", (req, res) => {
  res.render("ebook");
});

router.post("/ebook/download", (req, res) => {
  const newDownload = new Downloads({
    name: req.body.name,
    email: req.body.email,
    date: new Date()
  });
  // const mailOptions = {
  //   from: "matthewclifford@hotmail.co.uk",
  //   to: "mclifford1984@gmail.com",
  //   subject: `${newDownload.name}`,
  //   text: "That was easy!"
  // };

  newDownload.save((err) => {
    if (!err) {
      // transporter.sendMail(mailOptions);
      res.render("download");
    }
  });
});

/////// ADMIN SITE /////////

module.exports = router;
