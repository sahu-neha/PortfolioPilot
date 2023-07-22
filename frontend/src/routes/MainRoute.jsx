// import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "../pages";
import { CreateProject } from "../pages/CreateProject";
import ViewProjects from "../pages/ViewProjects";

export default function MainRoute() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signUp" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/createproject" element={<CreateProject />} />
			<Route path="/viewprojects" element={<ViewProjects />} />
			<Route path="*" element={<h1>Not Found</h1>} />
		</Routes>
	);
}
