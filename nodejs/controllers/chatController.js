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
const ConversationUserModal = db.conversation_user;
const ConversationModal = db.conversation;
const MessageModal = db.message;
const AttachmentModal = db.attachment;

class chatController {
	   /**
	    * @param {Model} model The default model object
	    * for the controller. Will be required to create
	    * an instance of the controller
	    */
	    constructor() {
	    }

        sendMessage = async (cr_user, body, res, attachmentData = {}) => {
				const response = new baseResponse(res);
				try {


					if(body.conversationId == "" || body.conversationId == undefined || body.userid == "" || body.userid == undefined){
                          response.sendResponse(null, false, "Something went wrong!", 500);
					}

					let dataCon = {
	                      conversation_id : body.conversationId,
	                      sender_id : cr_user.id,
	                      reciever_id : body.userid,
	        		};

	        		var data_ret = await ConversationUserModal.create(dataCon)
	                                .then(async conData2 => {
	                                    
	                                    return conData2;

									}).catch((error) => {
										return {error:error.message};
								    });

					if(data_ret && data_ret.error){

						return response.sendResponse(null, false, datareturn.error, 404);

					}else if(data_ret && data_ret.id){
                        
                        let dataMsg = {
		                      conversation_id_user : data_ret.id,
		                      body : body.message,
		        		};
		        		if(attachmentData && attachmentData.path){
		        			dataMsg.attachment = attachmentData;
		        		}

						
                        var datareturn = await MessageModal.create(dataMsg)
	                                .then(async conData2 => {
	                                    
	                                    return conData2;

									}).catch((error) => {
										return {error:error.message};
								    });

						if(datareturn && datareturn.error){
							return response.sendResponse(null, false, datareturn.error, 404);
						}else if(datareturn && datareturn.id){

							let data_res = {
								conversation_id : data_ret.conversation_id,
								updatedAt : data_ret.updatedAt,
								sender_id : data_ret.sender_id,
								reciever_id : data_ret.reciever_id,
								message : body.message,
							}
							if(attachmentData && attachmentData.path){
			        			data_res.attachment = attachmentData;
			        		}
		                    return response.sendResponse(data_res, true, "Successfully send message!", 200);
						}else{
							return response.sendResponse(null, false, "Message not send!", 404);
						}		    

					}else{
						return response.sendResponse(null, false, "Message not send2!", 404);
					}		    

					

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		sendFileMessage = async (cruser, body,fileData, res) => {
				const response = new baseResponse(res);
				try {

					if(fileData && fileData.chatFile && fileData.chatFile.name){

			        	let attachmentData = await this.uploadAttachment(fileData.chatFile, res);

			        	if(attachmentData && attachmentData.path){
			        		body.message = "file";
			        		this.sendMessage(cruser, body, res, attachmentData)
			        	}else{
			        		return response.sendResponse(null, false, "Attachment not saved!", 404);
			        	}

			        }

					//console.log(cruser, body, fileData)
/*
					if(body.conversationId == "" || body.conversationId == undefined || body.userid == "" || body.userid == undefined){
                          response.sendResponse(null, false, "Something went wrong!", 500);
					}

					let dataCon = {
	                      conversation_id : body.conversationId,
	                      sender_id : cr_user.id,
	                      reciever_id : body.userid,
	        		};
	        		var data_ret = await ConversationUserModal.create(dataCon)
	                                .then(async conData2 => {
	                                    
	                                    return conData2;

									}).catch((error) => {
										return {error:error.message};
								    });

					if(data_ret && data_ret.error){

						return response.sendResponse(null, false, datareturn.error, 404);

					}else if(data_ret && data_ret.id){
                        
                        let dataMsg = {
		                      conversation_id_user : data_ret.id,
		                      body : body.message,
		        		};

						
                        var datareturn = await MessageModal.create(dataMsg)
	                                .then(async conData2 => {
	                                    
	                                    return conData2;

									}).catch((error) => {
										return {error:error.message};
								    });

						if(datareturn && datareturn.error){
							return response.sendResponse(null, false, datareturn.error, 404);
						}else if(datareturn && datareturn.id){

							let data_res = {
								conversation_id : data_ret.conversation_id,
								updatedAt : data_ret.updatedAt,
								sender_id : data_ret.sender_id,
								reciever_id : data_ret.reciever_id,
								message : body.message,
							}
		                    return response.sendResponse(data_res, true, "Successfully send message!", 200);
						}else{
							return response.sendResponse(null, false, "Message not send!", 404);
						}		    

					}else{
						return response.sendResponse(null, false, "Message not send2!", 404);
					}	*/	    

					

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getConversations = async (cr_user, body, res) => {
				const response = new baseResponse(res);
				try {


					let dataReturn = await ConversationUserModal.findAll({
							                where : {
							                    [Op.or]: [
											        {
											            sender_id: 
											            {
											                [Op.eq]: cr_user.id
											            }
											        },
											        {
											            reciever_id: 
											            {
											                [Op.eq]: cr_user.id
											            }
											        }
											    ]
											},
											include: [
												{ model: UserModal, as: "sender_id_user", attributes: ['name', 'email'] }, 
												{ model: UserModal, as: "reciever_id_user", attributes: ['name', 'email'] },
												{ model: MessageModal, as: "message" }
											],
											order: [
									            ['id', 'DESC']
									        ],
										}).then(async conData => {
											let dd_return = [];
											if(conData && conData.length > 0){
												const uniqueData = Array.from(new Set(conData.map(a => a.conversation_id)))
												 .map(id => {
												   let dataa =  conData.find(a => a.conversation_id === id)
												   dataa = dataa.toJSON();
												   if(dataa && (dataa.sender_id == cr_user.id) && dataa.message && dataa.message.id){
                                                      dataa.message.read = true;
												   }
												   return dataa;
												 })

												dd_return = uniqueData
											}
											return dd_return;
										}).catch((error) => {
											return {error:error.message};
									    });		    
	                    
					let data = {
						"conversations" : dataReturn 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}
		getChatByConId = async (cr_user, body, res) => {
				const response = new baseResponse(res);
				try {



					const {conid} = body;

					const chatData = await ConversationUserModal.findAll({
								            where: {
								            	[Op.and]: [
											        {
											            conversation_id: conid
											        }
											    ],
											    [Op.or]: [
											        {
											            sender_id: 
											            {
											                [Op.eq]: cr_user.id
											            }
											        },
											        {
											            reciever_id: 
											            {
											                [Op.eq]: cr_user.id
											            }
											        }
											    ]
								            },
								            include: [
												{ model: UserModal, as: "sender_id_user", attributes: ['name', 'email'] }, 
												{ model: UserModal, as: "reciever_id_user", attributes: ['name', 'email'] },
												{ model: MessageModal, as: "message" }
											],
											order: [
									            ['updatedAt', 'ASC']
									        ],
								        }).then(async conData => {

								        	let dd_return = { user : null, dataMessages : null };
											if(conData && conData.length > 0){

												conData.forEach(function(conDdddd) {
													var con_ddd = conDdddd.id
													MessageModal.findOne({
										                where: {
												            	conversation_id_user: con_ddd,
															    read: 0,
												        },
										            }).then(async mDataa => {
													    // Check if record exists in db
														   if (mDataa) {
														     mDataa.update({read:1});
														   }
													}).catch((error) => { return null; });
											    });
											    
											    let first_d = conData[0];

											    var chatUserId = null;

											    if(first_d.reciever_id != cr_user.id){
                                                    chatUserId = first_d.reciever_id;
											    }else{
                                                    chatUserId = first_d.sender_id;
											    }

											    if(chatUserId){

											    		await UserModal.findOne({
													              where: {id: chatUserId}
													            }).then(async userData => {
																    // Check if record exists in db
																	   if (userData) {
																	     dd_return.user = userData;
																	   }
																}).catch((error) => { });
												}							

												dd_return.dataMessages = conData;
											}

											return dd_return;
											
										}).catch((error) => {
											return null;
									    });	



			         if (!chatData) {
			            return response.sendResponse(null, false, "Conversation not found!", 404);
			         }

					let data = {
						chatData 
					};

					return response.sendResponse(data, true, "", 200);

				} catch(err) {
					console.log(err)
					response.sendResponse(null, false, err.message, 500);
				}

				return true;
		}

		
		addChatUser = async (cruser, body, res) => {
			const response = new baseResponse(res);
			try {

				let data_ret = {};


				let { id } = body;

				let dataReturn = await ConversationUserModal.findAll({
					                where : {
					                    [Op.or]: [
										    {
										      [Op.and]: [
										        { sender_id: { [Op.eq]: id } },
										        { reciever_id: { [Op.eq]: cruser.id } }
										      ]
										    },
										    {
										      [Op.and]: [
										        { sender_id: cruser.id },
										        { reciever_id: id }
										      ]
										    }
										]
									},

								}).then(async conData => {
									return conData;
								}).catch((error) => {
									return;
							    });	

				if(dataReturn && dataReturn.length > 0){
					data_ret.con_id = dataReturn[0].conversation_id;

					return response.sendResponse(data_ret, true, "Conversation exist!", 200);
				}

				const datareturn = await ConversationModal.create({created_by: cruser.id})
				                                .then(async conData => {

				                                	if(conData && conData.id){
				                                		let dataCon = {
                                                              conversation_id : conData.id,
                                                              sender_id : cruser.id,
                                                              reciever_id : id,
				                                		};
				                                		var data_ret = await ConversationUserModal.create(dataCon)
										                                .then(async conData2 => {
                                                                            
                                                                            return conData2;

																		}).catch((error) => {
																			return {error:error.message};
																	    });
														return data_ret;			    
				                                	}else{
				                                		return {error:"Conversation not created!"};
				                                	}

												}).catch((error) => {
													return {error:error.message};
											   });

                if(datareturn && datareturn.error){
					return response.sendResponse(null, false, datareturn.error, 404);
				}else if(datareturn && datareturn.conversation_id){
					data_ret.con_id = datareturn.conversation_id;
                    return response.sendResponse(data_ret, true, "Successfully create conversation!", 200);
				}else{
					return response.sendResponse(null, false, "conversation not created!", 404);
				}

				
			} catch(err) {
				console.log(err)
				response.sendResponse(null, false, err.message, 500);
			}

				return true;
		}
		uploadAttachment = async (attachment, res) => {

			const response = new baseResponse(res);

			try{

				var attachmentsData = [];

				    let root = path.resolve();



					let filepath = "/public/chat/"+attachment.originalFilename;

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

				return dataAttachment;
			} catch(err) {
				return response.sendResponse(null, false, err.message, 500);
				return null;
			}	

		}

		
}

module.exports = chatController