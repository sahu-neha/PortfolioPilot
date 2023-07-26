import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";

import { getProjects, updateProject } from "../api";
import React, { useEffect, useState } from "react";
const AdminTable = () => {
	const [data, setData] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);

	const fetchdata = async () => {
		const getData = await getProjects(localStorage.getItem("user") || "");
		setData(getData.data);
	};

	useEffect(() => {
		fetchdata();
	}, []);

	console.log(data);

	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();

	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const cancelRef = React.useRef();

	const handleEdit = (project) => {
		setSelectedProject(project);
		onEditOpen();
	};

	const handleDelete = (project) => {
		setSelectedProject(project);
		onDeleteOpen();
	};

	const handleEditConfirm = () => {
		const payload = {
			_id: selectedProject._id,
			name: selectedProject.projectName,
			description: selectedProject.projectDescription,
			status: selectedProject.status,
			startDate: selectedProject.startDate,
			endDate: selectedProject.endDate,
			// assigned: selectedProject.assignedTo,
		};

		updateProject(localStorage.getItem("user"), payload);

		onEditClose();
	};

	const handleDeleteConfirm = () => {
		onDeleteClose();
	};

	return (
		<Box overflowX="auto" margin={"100px 50px"} textAlign={"center"}>
			<Table variant="simple" colorScheme="teal">
				<Thead>
					<Tr>
						<Th>Project Name</Th>
						<Th>Project Desc</Th>
						<Th>Project Start Date</Th>
						<Th>Project End Date</Th>
						<Th>Project Status</Th>
						<Th>Project Assigned To</Th>
						<Th>Project Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((item) => (
						<Tr key={item._id} textAlign={"center"} margin={"auto"}>
							<Td textAlign={"center"}>{item.projectName}</Td>
							<Td textAlign={"center"}>{item.projectDescription}</Td>
							<Td textAlign={"center"}>{item.startDate}</Td>
							<Td textAlign={"center"}>{item.endDate}</Td>
							<Td textAlign={"center"}>{item.status}</Td>
							<Td textAlign={"center"}>
								{item.assignedTo ? item.assignedTo : "Not Assigned"}
							</Td>
							<Td>
								<Button
									colorScheme="teal"
									variant="outline"
									size="sm"
									onClick={() => handleEdit(item)}
									leftIcon={<EditIcon />}
									marginRight={2}
								>
									Edit
								</Button>
								<Button
									colorScheme="red"
									variant="outline"
									size="sm"
									onClick={() => handleDelete(item)}
									leftIcon={<DeleteIcon />}
								>
									Delete
								</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{data.length === 0 && (
				<Text
					textAlign="center"
					mt={4}
					color="black.500"
					height="70vh"
					display="flex"
					alignItems="center"
					fontFamily="FontAwesome"
					fontSize="4xl"
					fontWeight="bold"
					justifyContent={"center"}
				>
					Loading . . .
				</Text>
			)}

			{/* Edit Modal */}
			<Modal isOpen={isEditOpen} onClose={onEditClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Project</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								type="text"
								name="name"
								value={selectedProject?.projectName || data.projectName}
								onChange={(e) =>
									setSelectedProject((prevProj) => ({
										...prevProj,
										projectName: e.target.value,
									}))
								}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Description</FormLabel>
							<Input
								type="text"
								name="name"
								value={
									selectedProject?.projectDescription || data.projectDescription
								}
								onChange={(e) =>
									setSelectedProject((prevProj) => ({
										...prevProj,
										projectDescription: e.target.value,
									}))
								}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Status</FormLabel>

							<Select
								name="status"
								id=""
								onChange={(e) =>
									setSelectedProject((prevProj) => ({
										...prevProj,
										status: e.target.value,
									}))
								}
							>
								<option value={data.status}>Select Status</option>
								<option value="Pending">Pending</option>
								<option value="In Progress">In progress</option>
								<option value="Completed">Completed</option>
							</Select>
						</FormControl>

						<FormControl>
							<FormLabel>Start Date</FormLabel>
							<Input
								type="date"
								name="status"
								value={selectedProject?.startDate || data.startDate}
								onChange={(e) =>
									setSelectedProject((prevProj) => ({
										...prevProj,
										startDate: e.target.value,
									}))
								}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>End Date</FormLabel>
							<Input
								type="date"
								name="status"
								value={selectedProject?.endDate || data.endDate}
								onChange={(e) =>
									setSelectedProject((prevProj) => ({
										...prevProj,
										endDate: e.target.value,
									}))
								}
							/>
						</FormControl>

						{/* <FormControl>
							<FormLabel>Assigned To</FormLabel>
							<Input
								type="text"
								name="assigned"
								value={selectedProject?.assignedTo || data.assignedTo}
								onChange={(e) =>
									setSelectedProject((prevProj) => ({
										...prevProj,
										assignedTo: e.target.value,
									}))
								}
							/>
						</FormControl> */}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="teal" onClick={handleEditConfirm}>
							Save
						</Button>
						<Button variant="ghost" onClick={onEditClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				isOpen={isDeleteOpen}
				leastDestructiveRef={cancelRef}
				onClose={onDeleteClose}
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>Delete Project</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Are you sure you want to delete this project?
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onDeleteClose}>
							Cancel
						</Button>
						<Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Box>
	);
};

export default AdminTable;
