const express = require('express')
const router = express.Router()
let baseResponse = require("../../Util/baseResponse.js");

let authControllerClass = require('../../controllers/authController.js');

let authController = new authControllerClass;

router.post("/login", async (req, res) => {
   const response = new baseResponse(res);
   try {
      let result = await authController.login(req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.post("/register", async (req, res) => {
   const response = new baseResponse(res);
   try {
      let result = await authController.register(req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

module.exports = router