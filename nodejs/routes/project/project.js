const express = require('express')
const router = express.Router()
let baseResponse = require("../../Util/baseResponse.js");
const MiddlewareClass = require('../../middleware');

let Middleware = new MiddlewareClass;

let projectControllerClass = require('../../controllers/projectController.js');

let ProjectController = new projectControllerClass;


router.post("/AddEditProject", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await ProjectController.AddEditProject(req.session,req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.get("/getAllProject", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await ProjectController.getAllProject(req.session,req.query, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.get("/getProjects", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await ProjectController.getProjects(req.session,req.query, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.get("/getProjectById/:id", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await ProjectController.getProjectById(req.session,req.params, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

module.exports = router