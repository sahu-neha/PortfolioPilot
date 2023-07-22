/* eslint-disable no-unused-vars */
import { Box, Text } from "@chakra-ui/react";
import { Button, DatePicker, Form, Input } from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject } from "../api";

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const initialCreateProjectState = {
	projectName: "",
	projectDescription: "",
	startDate: "",
	endDate: "",
};

export const CreateProject = () => {
	const [projectDetails, setProjectDetails] = useState(
		initialCreateProjectState
	);

	const navigate = useNavigate();

	const handleHome = () => {
		navigate("/");
	};

	function onChange(date, dateString) {
		console.log(dateString);
	}

	const handleCreateProject = async () => {
		if (
			!projectDetails.projectName ||
			!projectDetails.projectDescription ||
			!projectDetails.startDate ||
			!projectDetails.endDate
		) {
			toast.error("Please fill all the fields");
			return;
		}

		const response = await createProject("johndoe@gmail.com", projectDetails);

		if (response.status === 201) {
			toast.success("Project Created Successfully");
			setProjectDetails(initialCreateProjectState);
		}

		navigate("/createproject");
	};

	return (
		<Box
			border={"1px solid #5b43d6"}
			borderRadius={"10px"}
			margin={"auto"}
			marginTop={"100px"}
			marginBottom={"50px"}
			// width={"fit-content"}
			padding={"20px"}
		>
			<Text
				as={"h3"}
				fontWeight={"600"}
				fontSize={"2xl"}
				textAlign={"center"}
				marginBottom={"20px"}
			>
				Create Project
			</Text>

			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
				style={
					{
						// maxWidth: 600,
					}
				}
			>
				<Form.Item label="Project Name" required>
					<Input
						placeholder="Enter Project Name"
						value={projectDetails.projectName}
						onChange={(e) =>
							setProjectDetails({
								...projectDetails,
								projectName: e.target.value,
							})
						}
					/>
				</Form.Item>

				<Form.Item label="Description" required>
					<TextArea
						placeholder="Enter Description"
						value={projectDetails.projectDescription}
						onChange={(e) =>
							setProjectDetails({
								...projectDetails,
								projectDescription: e.target.value,
							})
						}
					/>
				</Form.Item>

				<Form.Item label="Start Date" required>
					<DatePicker onChange={onChange} value={projectDetails.startDate} />
				</Form.Item>

				<Form.Item label="End Date" required>
					<DatePicker
						onChange={(date, dateString) => {
							setProjectDetails({
								...projectDetails,
								endDate: dateString,
							});
						}}
						value={projectDetails.endDate}
					/>
				</Form.Item>

				<Form.Item label="Button">
					<Button
						type="primary"
						onClick={() => {
							console.log(projectDetails);
						}}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Box>
	);
};
