import axios from "axios";
import { BASE_URL } from "../utils";

export const userSignup = async (data) => {
	return await axios.post(`${BASE_URL}/user/signup`, data);
};

export const userLogin = async (data) => {
	return await axios.post(`${BASE_URL}/user/login`, data);
};

export const userLogout = async () => {
	return await axios.get(`${BASE_URL}/user/logout`);
};

export const userAuth = async () => {
	return await axios.get(`${BASE_URL}/user/auth`);
};

export const createProject = async (email, data) => {
	return await axios.post(`${BASE_URL}/project/${email}`, data);
};

export const getProjects = async (email) => {
	return await axios.get(`${BASE_URL}/project/${email}`);
};
