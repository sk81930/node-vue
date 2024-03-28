let baseResponse = require("../Util/baseResponse.js");
var bcrypt = require("bcrypt");
const jwtHelper = require('../Util/jwtHelper')
const db = require('../models');

const UserModal = db.User;

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

						const { email, password } = body;

		        const user = await UserModal.findOne({
		            where: {email}
		        });

		        if (!user) {
		            return response.sendResponse(null, false, "Email not found!", 404);
		        }
		        const passwordValid = await user.validPassword(password);

		        if (!passwordValid) {
		        	  return response.sendResponse(null, false, "Incorrect email and password combination!", 404);
		        }


		        let tokenObj = { id: user.id, email: user.email };
						let token = await jwtHelper.getToken(tokenObj);


		        let data = {
		        	  user  : user,
		        	  token : token,
		        }

		        return response.sendResponse(data, true, "Successfully login!", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		updateProfile = async (user, req, res) => {
				const response = new baseResponse(res);
				try {

						let data = {
							name : req.body.name
						};


						if(req.body.password != ""){
							if(req.body.password != req.body.confirm_password){
								return response.sendResponse(null, false, "Password not match!", 404);
							}
							data.password = req.body.password;
						}

						let option_fields = data;

						const userdatareturn = await UserModal.findOne({
											            where: {id: user.id}
											         }).then(async userData => {
														    // Check if record exists in db
															   if (userData) {
															     var returndata = await userData.update(data,option_fields);
															     return returndata;
															   }else{
															   	return {error:"User not found!"};
															   }
														}).catch((error) => {
															return {error:error.message};

													   });
					if(userdatareturn && userdatareturn.error){
						return response.sendResponse(null, false, userdatareturn.error, 404);
					}


		         return response.sendResponse(null, true, "Successfully update profile!", 200);



				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		user = async (body, res) => {
				const response = new baseResponse(res);
				try {

						const { email, password } = body;

		        const user = await UserModal.findOne({
		            where: {email}
		        });

		        if (!user) {
		            return response.sendResponse(null, false, "Email not found!", 404);
		        }
		        const passwordValid = await user.validPassword(password);

		        if (!passwordValid) {
		        	  return response.sendResponse(null, false, "Incorrect email and password combination!", 404);
		        }


		        let tokenObj = { id: user.id, email: user.email };
						let token = await jwtHelper.getToken(tokenObj);


		        let data = {
		        	  user  : user,
		        	  token : token,
		        }

		        return response.sendResponse(data, true, "Successfully login!", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
}

module.exports = AuthController