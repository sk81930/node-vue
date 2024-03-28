let baseResponse = require("../Util/baseResponse.js");
var bcrypt = require("bcrypt");
const jwtHelper = require('../Util/jwtHelper')
const { Op } = require("sequelize");
const db = require('../models');

const UserModal = db.User;

class UserController {
	   /**
	    * @param {Model} model The default model object
	    * for the controller. Will be required to create
	    * an instance of the controller
	    */
	   constructor() {
	   }

       getUserRole = async (body, res) => {
				const response = new baseResponse(res);
				try {

					let userrole = await UserModal.findAll();

					let data = {
						userrole 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getUsers = async (body, res) => {
				const response = new baseResponse(res);
				try {

					let {page = 0, pagesize = 10} = body;

					page = parseInt(page);
					pagesize = parseInt(pagesize);

					let limit = pagesize;

               let offset = 0;
               if(page > 0){
               	offset = (page - 1) * limit;
               }

					let users = await UserModal.findAndCountAll({
						           where : {role : ["manager","user"]},
									  offset,
									  limit,
									});

					let data = {
						users 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getUserById = async (body, res) => {
				const response = new baseResponse(res);
				try {

					const {id} = body;

					const user = await UserModal.findOne({
		            where: {id}
		         });

		         if (!user) {
		            return response.sendResponse(null, false, "User not found!", 404);
		         }

					let data = {
						user 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		AddEditUser = async (body, res) => {
				const response = new baseResponse(res);
				try {

					const { id, name, email, password, confirm_password, role } = body;

					if(id && id > 0){
						this.updateUser(id, body, res);
						return;

					}


					const error = [];
	
					if (!String(name).trim()) {
						error.push("Name is required");
					}
					
					if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) {
						error.push("Email is not valid.");
					}
					if (!String(password).trim()) {
						error.push("password is required");
					}
					if (!String(confirm_password).trim()) {
						error.push("Confirm password is required");
					}
					if (password != confirm_password) {

                   error.push("Password not match!");
					}

					const emailExist = await UserModal.findOne({
		            where: {email}
		         });

		         if (emailExist && emailExist.email) {
		         	error.push("Email already exist!");
		         }

		         if(error.length > 0){
		         	return response.sendResponse(null, false, error, 404);
		         }

		         var roleadd = "user";

		         
		         let data = {
		         	name,
		         	email,
		         	password,
		         	confirm_password,
		         }

		         if(role == "manager"){
		         	data.role = "manager";
		         }else{
		         	data.role = "user";
		         }

		         let option_fields = data;

					const userdatareturn = await UserModal.create(
										            data,option_fields
										         ).then(async userData => {
													    return userData;
													}).catch((error) => {
														return {error:error.message};
												   });

               if(userdatareturn && userdatareturn.error){
						return response.sendResponse(null, false, userdatareturn.error, 404);
					}else if(userdatareturn && userdatareturn.id){
                  return response.sendResponse(null, true, "Successfully create user!", 200);
					}else{
						return response.sendResponse(null, false, "User not created1", 404);
					}
               

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		updateUser = async (id,body, res) => {
				const response = new baseResponse(res);
				try {

					const { id, name, email, password, confirm_password, role } = body;

					const error = [];
	
					if (!String(name).trim()) {
						error.push("Name is required");
					}
					
					if (password != "" && password != confirm_password) {

                   error.push("Password not match!");
					}

					const emailExist = await UserModal.findOne({
		            where: {
		            	email,
		            	id: {
						      [Op.ne]: id
						   }
		            }
		         });

		         if (emailExist && emailExist.email) {
		         	error.push("Email already exist!");
		         }

		         if(error.length > 0){
		         	return response.sendResponse(null, false, error, 404);
		         }

		         let data = {
		         	name,
		         	role
		         }

               if(role == "manager"){
		         	data.role = "manager";
		         }else{
		         	data.role = "user";
		         }

		         if (password != "") {
                  data.password = password;
					}



		         let option_fields = data;

					const userdatareturn = await UserModal.findOne({
											            where: {id: id}
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


		         return response.sendResponse(null, true, "Successfully update user!", 200);
               

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		
}

module.exports = UserController