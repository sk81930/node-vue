const express = require('express')
const router = express.Router()
let baseResponse = require("../../Util/baseResponse.js");
const MiddlewareClass = require('../../middleware');

let Middleware = new MiddlewareClass;

let taskControllerClass = require('../../controllers/taskController.js');

let TaskController = new taskControllerClass;


router.post("/AddEditTask", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await TaskController.AddEditTask(req.session,req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.get("/getTasks", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await TaskController.getTasks(req.session,req.query, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.get("/getTaskById/:id", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await TaskController.getTaskById(req.session,req.params, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.get("/getComments/:taskid", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await TaskController.getComments(req.session,req.params,req.query,res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.post("/AddComment", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await TaskController.AddComment(req.session,req.body,req.files,res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

module.exports = router