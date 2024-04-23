let baseResponse = require("../Util/baseResponse.js");
var bcrypt = require("bcrypt");
const jwtHelper = require('../Util/jwtHelper')
const { Op } = require("sequelize");
const db = require('../models');

const fs = require('fs');
const { writeFile, readFile } = require("fs/promises");
const path = require('path');
const url = require('url');
const cheerio = require('cheerio');

const UserModal = db.User;
const ProjectModal = db.project;
const TaskModal = db.task;
const TaskCommentModal = db.task_comment;
const AttachmentModal = db.attachment;

class TaskController {
	   /**
	    * @param {Model} model The default model object
	    * for the controller. Will be required to create
	    * an instance of the controller
	    */
	    constructor() {
	    }

        getTasks = async (cr_user, body, res) => {
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

					let tasks = await TaskModal.findAndCountAll({
						              where : {created_by : cr_user.id },
									  offset,
									  limit,
									  json: true,
									  include: ['created_by_user','assign_to_user','project_data']
									}).then(async taskData => {

										if(taskData.rows.length > 0){
											let data = [];

											for (const task of taskData.rows) {
											    let taskD = task.toJSON();
										        //console.log(taskD)

										        if(taskD.observer){

											        let obs_users = await UserModal.findAll({
											        	                    where : {
											        	                    	id : {
											        	                    		[Op.in]: taskD.observer
											        	                    	}
											        	                    }
											                              });
											        taskD.observer_users = obs_users;
											    }else{
											    	taskD.observer_users = null;
											    }

										        
										        data.push(taskD)
											}	
											taskData.rows = data
										}
										//console.log(taskData)
										return taskData;
									}).catch((error) => {
										return {error:error.message};
								    });		    
                    
					let data = {
						tasks 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getTaskById = async (cruser, body, res) => {
				const response = new baseResponse(res);
				try {

					const {id} = body;

					const task = await TaskModal.findOne({
							            where: {id},
							            include: ['created_by_user','assign_to_user','project_data']
							        }).then(async task => {

							        	if(task){

											let taskD = task.toJSON();
											        //console.log(taskD)

									        if(taskD.observer){

										        let obs_users = await UserModal.findAll({
										        	                    where : {
										        	                    	id : {
										        	                    		[Op.in]: taskD.observer
										        	                    	}
										        	                    }
										                              });
										        taskD.observer_users = obs_users;
										    }else{
										    	taskD.observer_users = null;
										    }
										    return taskD;
										}else{

											return null;

										}
										//console.log(taskData)
										
									}).catch((error) => {
										return null;
								    });		 

			         if (!task) {
			            return response.sendResponse(null, false, "Task not found!", 404);
			         }

					let data = {
						task 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		AddEditTask = async (cruser, body, res) => {
			const response = new baseResponse(res);
			try {


				let { id, title, description, assign_to, observer, priority, project } = body;

				
				



				if(id && id > 0){
					this.updateTask(id, body, res);
					return;

				}

				



				const error = [];

				if (!String(title).trim()) {
					error.push("Title is required");
				}
				if (!String(assign_to).trim()) {
					error.push("Assign to is required");
				}
				if (!String(priority).trim()) {
					error.push("Priority is required");
				}


		        if(error.length > 0){
		         	return response.sendResponse(null, false, error, 404);
		        }


		         
		        let data = {
		         	title,
		         	description,
		         	assign_to,
		         	priority,
		         	created_by : cruser.id
		        }
		        if(project != ""){
					data.project = parseInt(project);
				}


		        if(Array.isArray(observer) && observer.length > 0){
		        	let observer_ids = [];
		        	observer.forEach(function(observer_d){

		        		observer_ids.push(observer_d.value);
 
		        	});
		        	data.observer = observer_ids;

		        }


				const taskdatareturn = await TaskModal.create(data).then(async taskData => {
												    return taskData;
												}).catch((error) => {
													return {error:error.message};
											   });

                if(taskdatareturn && taskdatareturn.error){
					return response.sendResponse(null, false, taskdatareturn.error, 404);
				}else if(taskdatareturn && taskdatareturn.id){
                    return response.sendResponse(null, true, "Successfully create task!", 200);
				}else{
					return response.sendResponse(null, false, "Task not created!", 404);
				}
               

			} catch(err) {
				console.log(err)
				response.sendResponse(null, false, err.message, 500);
			}

				return true;
		}
		updateTask = async (id,body, res) => {
				const response = new baseResponse(res);
				try {

					let { id, title, description, assign_to, observer, priority, project } = body;

					



					const error = [];

					if (!String(title).trim()) {
						error.push("Title is required");
					}
					if (!String(assign_to).trim()) {
						error.push("Assign to is required");
					}
					if (!String(priority).trim()) {
						error.push("Priority is required");
					}


			        if(error.length > 0){
			         	return response.sendResponse(null, false, error, 404);
			        }


			         
			        let data = {
			         	title,
			         	description,
			         	assign_to,
			         	priority
			        }
			        if(project != ""){
						data.project = parseInt(project);
					}else{
						data.project = null;
					}


			        if(Array.isArray(observer) && observer.length > 0){
			        	let observer_ids = [];
			        	observer.forEach(function(observer_d){

			        		observer_ids.push(observer_d.value);
	 
			        	});
			        	data.observer = observer_ids;

			        }else{
			        	data.observer = null;
			        }




					const taskdatareturn = await TaskModal.findOne({
											            where: {id: id}
											         }).then(async prData => {
														    // Check if record exists in db
															   if (prData) {
															     var returndata = await prData.update(data);
															     return returndata;
															   }else{
															   	return {error:"Task not found!"};
															   }
														}).catch((error) => {
															return {error:error.message};

													   });
					if(taskdatareturn && taskdatareturn.error){
						return response.sendResponse(null, false, taskdatareturn.error, 404);
					}


		            return response.sendResponse(null, true, "Successfully update task!", 200);
               

				} catch(err) {
					console.log(err)
					return response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		getComments = async (cr_user, body, query, res) => {
				const response = new baseResponse(res);
				try {

					let {page = 0, pagesize = 10} = query;

					page = parseInt(page);
					pagesize = parseInt(pagesize);

					let limit = pagesize;

	                let offset = 0;
	                if(page > 0){
	                	offset = (page - 1) * limit;
	                }


					let comments = await TaskCommentModal.findAndCountAll({
							                where : {taskid : body.taskid },
										    offset,
										    limit,
										    json: true,
										    order: [
									            ['id', 'DESC'],
									        ],
										    include: ['created_by_user']
										}).then(async commentData => {

											if(commentData.rows.length > 0){
												let data = [];

												for (const comment of commentData.rows) {

												    let commentD = comment.toJSON();
											        //console.log(taskD)

											        if(commentD.attachments){

												        let obsAttachment = await AttachmentModal.findAll({
												        	                    where : {
												        	                    	id : {
												        	                    		[Op.in]: commentD.attachments
												        	                    	}
												        	                    }
												                              });
												        commentD.attachments_data = obsAttachment;

												    }else{
												    	commentD.attachments_data = null;
												    }

											        
											        data.push(commentD)
												}	
												commentData.rows = data
											}
											//console.log(taskData)
											return commentData;
										}).catch((error) => {
											return {error:error.message};
									    });		    
                    
					return response.sendResponse(comments, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		AddComment = async (cruser, body,fileData, res) => {
			const response = new baseResponse(res);
			try {


				let { taskid, comment } = body;

				
				

				const error = [];

				if (!taskid) {
					error.push("Taskid is required");
				}
				if (!String(comment).trim()) {
					error.push("Comment is required");
				}

		        if(error.length > 0){
		         	return response.sendResponse(null, false, error, 404);
		        }

		        const doc = cheerio.load(comment);

				// Use CSS selectors to select the desired element
				const targetElements = doc('.mention');

				let userIds = [];

				targetElements.each((index, element) => {
					var iddd = doc(element).attr('data-mention');
					iddd = iddd.replace("@","");
				    userIds.push(parseInt(iddd));
				});

			
		        let data = {
		         	taskid,
		         	comment,
		         	created_by : cruser.id
		        }

		        if(fileData && fileData.files && fileData.files.length > 0){
		        	let attachments = await this.uploadAttachments(fileData.files, res);

		        	if(attachments && attachments.length > 0){
		        		data.attachments = attachments;
		        	}
		        }



				const commentdatareturn = await TaskCommentModal.create(data).then(async commentData => {
												    return commentData;
												}).catch((error) => {
													return {error:error.message};
											   });

                if(commentdatareturn && commentdatareturn.error){
					return response.sendResponse(null, false, commentdatareturn.error, 404);
				}else if(commentdatareturn && commentdatareturn.id){
					await this.updateObserver(userIds, taskid);
                    return response.sendResponse(null, true, "Successfully create comment!", 200);
				}else{
					return response.sendResponse(null, false, "Comment not created!", 404);
				}
               

			} catch(err) {
				console.log(err)
				response.sendResponse(null, false, err.message, 500);
			}

				return true;
		}

		updateObserver = async (userIds, taskid) => {
			try {
				if(userIds && userIds.length > 0){
					await TaskModal.findOne({
					            where: {id: taskid}
					        }).then(async prData => {
							    // Check if record exists in db
								   if (prData) {
								   	   let observer_ids = [];
								       if( prData.observer && prData.observer.length > 0){
								       	   prData.observer.forEach(function(observer_pre){
								       	   	   observer_ids.push(observer_pre)
								       	   })
								       }

								       //observer_ids.push();

								        for(const userId of userIds){

								       	   if(!observer_ids.includes(userId)){
								       	   	   observer_ids.push(userId)
								       	   }

								        }

								        if(observer_ids && observer_ids.length > 0){
								        	var data_observer = {
		                                                 observer : observer_ids
								                    }	      
								        	await prData.update(data_observer)
								        	
								        }

								       
								   }
							}).catch((error) => {
								return null;

						    });
				}

			} catch(err) {
				console.log(err)
				response.sendResponse(null, false, err.message, 500);
			}
		}
		uploadAttachments = async (attachments, res) => {

			const response = new baseResponse(res);

			try{

				var attachmentsData = [];

				let root = path.resolve();


				for(const attachment of attachments){

					let filepath = "/public/"+attachment.originalFilename;

	                var data = await readFile(attachment.path).then(async data => {

								        

				                	    var newPath = root+filepath;

									    let data2 = await writeFile(newPath,data).then(async fileData => {
														    return fileData;
														}).catch((error) => {
															return {error:error.message};
													    });

										return data2;		  
								}).catch((error) => {
									return {error:error.message};
							    });
					if(data && data.error){
						return response.sendResponse(null, false, data.error, 500);
					}


					var ext_name = path.extname(filepath);

					let dataAttachment = {
						name : attachment.originalFilename,
						path : filepath,
						type : ext_name.replace(".","")

					}

					

					const attachdatareturn = await AttachmentModal.create(dataAttachment).then(async attachData => {
												    return attachData;
													}).catch((error) => {
														return {error:error.message};
												   });

										

	                if(attachdatareturn && attachdatareturn.error){

					}else if(attachdatareturn && attachdatareturn.id){

	                    attachmentsData.push(attachdatareturn.id);
					}

	                   
				}

				return attachmentsData;
			} catch(err) {
				return null;
			}	

		}

		
}

module.exports = TaskController