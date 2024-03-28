let baseResponse = require("../Util/baseResponse.js");
var bcrypt = require("bcrypt");
const jwtHelper = require('../Util/jwtHelper')
const { Op } = require("sequelize");
const db = require('../models');

const UserModal = db.User;
const ProjectModal = db.project;

class ProjectController {
	   /**
	    * @param {Model} model The default model object
	    * for the controller. Will be required to create
	    * an instance of the controller
	    */
	    constructor() {
	    }

        getAllProject = async (cr_user, body, res) => {
				const response = new baseResponse(res);
				try {

					
					let projects = await ProjectModal.findAll({
						              where : {created_by : cr_user.id },
									  include: 'created_by_user' 
									});

					let data = {
						projects 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getProjects = async (cr_user, body, res) => {
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

					let projects = await ProjectModal.findAndCountAll({
						              where : {created_by : cr_user.id },
									  offset,
									  limit,
									  include: 'created_by_user' 
									});

					let data = {
						projects 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getProjectById = async (cruser, body, res) => {
				const response = new baseResponse(res);
				try {

					const {id} = body;

					const project = await ProjectModal.findOne({
			            where: {id},
			            include: 'created_by_user' 
			        });

			         if (!project) {
			            return response.sendResponse(null, false, "project not found!", 404);
			         }

					let data = {
						project 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		AddEditProject = async (cruser, body, res) => {
			const response = new baseResponse(res);
			try {


				const { id, title, description, client, access_details } = body;

				if(id && id > 0){
					this.updateProject(id, body, res);
					return;

				}



				const error = [];

				if (!String(title).trim()) {
					error.push("Title is required");
				}

		         if(error.length > 0){
		         	return response.sendResponse(null, false, error, 404);
		         }

		         
		        let data = {
		         	title,
		         	description,
		         	client,
		         	access_details,
		         	created_by : cruser.id
		        }


				const prdatareturn = await ProjectModal.create(data).then(async prData => {
												    return prData;
												}).catch((error) => {
													return {error:error.message};
											   });

                if(prdatareturn && prdatareturn.error){
					return response.sendResponse(null, false, prdatareturn.error, 404);
				}else if(prdatareturn && prdatareturn.id){
                    return response.sendResponse(null, true, "Successfully create project!", 200);
				}else{
					return response.sendResponse(null, false, "Project not created!", 404);
				}
               

			} catch(err) {
				console.log(err)
				response.sendResponse(null, false, err.message, 500);
			}

				return true;
		}
		updateProject = async (id,body, res) => {
				const response = new baseResponse(res);
				try {

					const { id, title, description, client, access_details } = body;



					const error = [];

					if (!String(title).trim()) {
						error.push("Title is required");
					}

			         if(error.length > 0){
			         	return response.sendResponse(null, false, error, 404);
			         }

			         
			        let data = {
			         	title,
			         	description,
			         	client,
			         	access_details
			        }



					const prdatareturn = await ProjectModal.findOne({
											            where: {id: id}
											         }).then(async prData => {
														    // Check if record exists in db
															   if (prData) {
															     var returndata = await prData.update(data);
															     return returndata;
															   }else{
															   	return {error:"Project not found!"};
															   }
														}).catch((error) => {
															return {error:error.message};

													   });
					if(prdatareturn && prdatareturn.error){
						return response.sendResponse(null, false, prdatareturn.error, 404);
					}


		            return response.sendResponse(null, true, "Successfully update project!", 200);
               

				} catch(err) {
					console.log(err)
					return response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		
}

module.exports = ProjectController