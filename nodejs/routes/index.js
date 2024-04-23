const express = require('express')
const router = express.Router()
let baseResponse = require("../Util/baseResponse.js");


// router.get("/", async (req, res) => {
// 	const response = new baseResponse(res);
// 	try {
// 		res.render("videocall")
// 	} catch(err) {
// 		response.sendResponse([], false, err.message, 201);
// 	}
// });

router.get("/test", async (req, res) => {
	const response = new baseResponse(res);
	try {
		response.sendResponse([], true, "Working", 200);
	} catch(err) {
		response.sendResponse([], false, err.message, 201);
	}
});

module.exports = router