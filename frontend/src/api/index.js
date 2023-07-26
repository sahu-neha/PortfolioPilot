import axios from "axios";
import { BASE_URL } from "../utils";

export const userSignup = async (data) => {
	return await axios.post(`${BASE_URL}/user/signup`, data);
};

export const userLogin = async (data) => {
	return await axios.post(`${BASE_URL}/user/login`, data);
};

export const userLogout = async (email) => {
	return await axios.delete(`${BASE_URL}/user/logout/${email}`);
};

export const createProject = async (email, data) => {
	return await axios.post(`${BASE_URL}/project/${email}`, data);
};

export const getProjects = async (email) => {
	try {
		return await axios.get(`${BASE_URL}/project/${email}`);
	} catch (error) {
		console.log(error);
	}
};

export const updateProject = async (email, data) => {
	try {
		return await axios.patch(`${BASE_URL}/project/${email}`, data);
	} catch (error) {
		console.log(error);
	}
};
