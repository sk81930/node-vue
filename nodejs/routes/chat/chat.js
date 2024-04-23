const express = require('express')
const router = express.Router()
let baseResponse = require("../../Util/baseResponse.js");
const MiddlewareClass = require('../../middleware');

let Middleware = new MiddlewareClass;

let chatControllerClass = require('../../controllers/chatController.js');

let chatController = new chatControllerClass;


router.post("/getChatByConId", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager','user']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await chatController.getChatByConId(req.session,req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});

router.post("/sendMessage", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager','user']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await chatController.sendMessage(req.session,req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});
router.post("/addChatUser", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager','user']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await chatController.addChatUser(req.session,req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});
router.get("/getConversations", Middleware.authenticate, (req, res, next) => {
  Middleware.hasRole(req, res, next, ['admin','manager','user']);
}, async (req,res) => { 
   const response = new baseResponse(res);
   try {
     let result = await chatController.getConversations(req.session,req.body, res);
   } catch(err) {
      response.sendResponse([], false, err.message, 201);
   }
});


module.exports = router