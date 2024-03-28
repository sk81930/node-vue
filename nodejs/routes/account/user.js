const express = require('express')
const router = express.Router()
let baseResponse = require("../../Util/baseResponse.js");
const MiddlewareClass = require('../../middleware');

let Middleware = new MiddlewareClass;

let userControllerClass = require('../../controllers/userController.js');

let UserController = new userControllerClass;


router.post("/AddEditUser", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await UserController.AddEditUser(req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});
router.get("/getUsers", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await UserController.getUsers(req.query, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});
router.get("/getUserById/:id", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await UserController.getUserById(req.params, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

module.exports = router