import axios from 'axios';
import store from './Store';

const API_ROOT = import.meta.env.VITE_API_URL;
let token = null;
const tokenPlugin = (req) => {
  	// if (token) {
    // 	req.set("Authorization", `Bearer ${token}`);
  	// }
};

const instance = axios.create({});

instance.interceptors.request.use(
  config => {
    if(store.state.auth.token){
    	config.headers["Authorization"] = "Bearer " + store.state.auth.token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);


const requests = {


	del: (url) =>
		instance.del(`${API_ROOT}${url}`),
	get: (url, body = "") =>	{
		if(body != ""){
			  body = { params: body }
		}
		return instance.get(`${API_ROOT}${url}`, body)
	},
	put: (url, body) =>
		instance
			.put(`${API_ROOT}${url}`, body),
	post: (url, body, config = "") =>
		instance
			.post(`${API_ROOT}${url}`, body, config)
}

const Auth = {
	user: () => requests.get("/auth/user"),
	logout: () => requests.post("/auth/logout",{}),
	login: (formData) => requests.post("/auth/login", formData),
	getUserRole: () => requests.get("/auth/getUserRole"),
}
const User = {
	updateProfile: (formData) => requests.post("/auth/updateProfile",formData),
}
const Admin = {
	getUsers: (data) => requests.get("/user/getUsers",data),
	AddEditUser: (formData) => requests.post("/user/AddEditUser",formData),
	getUserById: (data) => requests.get("/user/getUserById/"+data.userid,""),
}
const Manager = {
	getProjects: (data) => requests.get("/project/getProjects",data),
	AddEditProject: (formData) => requests.post("/project/AddEditProject",formData),
	getProjectById: (data) => requests.get("/project/getProjectById/"+data.id,""),
}
const Project = {
	getAllProject: () => requests.get("/project/getAllProject"),
}
const Task = {
	AddEditTask: (formData) => requests.post("/task/AddEditTask",formData),
	getTasks: (data) => requests.get("/task/getTasks",data),
	getTaskById: (data) => requests.get("/task/getTaskById/"+data.id,""),
	AddComment: (formData) => requests.post("/task/AddComment/",formData),
	getComments: (data) => requests.get("/task/getComments/"+data.id,data),
}
const Chat = {
	sendMessage: (formData) => requests.post("/chat/sendMessage",formData),
	sendFileMessage: (formData,config) => requests.post("/chat/sendFileMessage",formData, config),
	getChatByConId: (formData) => requests.post("/chat/getChatByConId",formData),
	addChatUser: (formData) => requests.post("/chat/addChatUser",formData),
	getConversations: () => requests.get("/chat/getConversations"),
}
export default {
	Auth,
	User,
	Admin,
	Manager,
	Project,
	Task,
	Chat,
	setToken: (_token) => {
    	token = _token;
  	},
};