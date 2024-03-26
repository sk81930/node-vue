let baseResponse = require("../Util/baseResponse.js");
const User = require('../models/user.js');

class AuthController {
   /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
   constructor() {
     // this._model = model;
     // this.create = this.create.bind(this);
   }

   login = async (body, res) => {
		const response = new baseResponse(res);
		try {

				//let uM = new User;

				let username = body.username;
				let password = body.password;

				User.findOne({username,password}).then(res => {
			        console.log(res)
			    }).catch((error) => {
			        console.error('Failed to retrieve data : ', error);
			    });

				console.log(User)

				// data = await uM.autheticate(username,password).then(async result => {

	          	// 		if(result && result.success == true){

	          	// 			let tokenObj = result.data

	          	// 			let userType = await uM.getUserType(tokenObj.groups);

	          	// 			let owner_id = null; 
	          	// 			let advertiser_id = null; 

	          	// 			if(userType == "owner"){

	          	// 				owner_id = await uM.getOwnerId(tokenObj.id);
	          					

	          	// 			}else if(userType == "advertiser"){

	          	// 				advertiser_id = await uM.getAdvertiserId(tokenObj.id);

	          	// 			}
	          				

	          	// 			tokenObj.userType = userType;
	          	// 			tokenObj.owner_id = owner_id;
	          	// 			tokenObj.advertiser_id = advertiser_id;
	          				
				// 		        let token = await jwtHelper.getToken(tokenObj);

				// 		        let result_data = {
				// 		        	user : tokenObj,
				// 		        	token : token
				// 		        }



	          	// 			response.sendResponse(result_data, true, "", 200, null);

	          	// 		}else{
	          	// 			response.sendResponse(null, false, result.message, 401, null);
	          	// 		}
	          			
	        	// 	})
	        	// 	.catch(error => {
	          	// 		response.sendResponse(null, false, error.message, 500, null);
	        	// 	});

		} catch(err) {
			console.log(err)
			response.sendResponse(null, false, err.message, 500);
		}

		return true;
	}
}

module.exports = AuthController