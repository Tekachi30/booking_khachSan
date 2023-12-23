const express = require("express");
const { sendMail } = require("../controllers/sendMailerController");
const routerMail = express.Router();

routerMail.post("/api/mail", sendMail);

module.exports = {
    routerMail,
};
