/* eslint-disable no-unused-vars */
import { Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "./components/Navbar";
import MainRoute from "./routes/MainRoute";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<Container maxW={"100vw"}>
			<ToastContainer />
			<Navbar />
			<MainRoute />
			<Footer />
		</Container>
	);
};

export default App;
