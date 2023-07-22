import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Select,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSignup } from "../api";

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const secretKey = useRef(null);

	const initial = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		about: "",
		role: "",
	};

	const [state, setState] = useState(initial);

	const submitHandler = async () => {
		if (
			!state.firstName ||
			!state.lastName ||
			!state.email ||
			!state.password ||
			!state.about ||
			!state.role
		) {
			toast.error("Please fill all the fields");
			return;
		}

		const obj = { user: state };
		if (state.role === "ADMIN") {
			obj.secretKey = secretKey.current.value;
		}

		const response = await userSignup(obj);

		if (response.status === 200) {
			setState(initial);
			secretKey.current = null;
			toast.success("Signup successful");
			navigate("/login");
		}
	};

	return (
		<Flex
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack marginTop={"8%"} align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>First Name</FormLabel>
									<Input
										focusBorderColor="#5b43d6"
										type="text"
										onChange={(e) => {
											setState({ ...state, firstName: e.target.value });
										}}
										value={state.firstName}
										placeholder="Enter first name"
									/>
								</FormControl>
							</Box>

							<Box>
								<FormControl id="lastName" isRequired>
									<FormLabel>Last Name</FormLabel>
									<Input
										focusBorderColor="#5b43d6"
										type="text"
										onChange={(e) => {
											setState({ ...state, lastName: e.target.value });
										}}
										value={state.lastName}
										placeholder="Enter last name"
									/>
								</FormControl>
							</Box>
						</HStack>

						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								focusBorderColor="#5b43d6"
								type="email"
								onChange={(e) => setState({ ...state, email: e.target.value })}
								value={state.email}
								placeholder="Enter email address"
							/>
						</FormControl>

						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									focusBorderColor="#5b43d6"
									type={showPassword ? "text" : "password"}
									onChange={(e) =>
										setState({ ...state, password: e.target.value })
									}
									value={state.password}
									placeholder="Enter password"
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<FormControl id="about" isRequired>
							<FormLabel>About yourself</FormLabel>
							<Input
								focusBorderColor="#5b43d6"
								type="text"
								onChange={(e) => setState({ ...state, about: e.target.value })}
								value={state.about}
								placeholder="Tell us about yourself"
							/>
						</FormControl>

						<FormControl id="role" isRequired>
							<FormLabel>Role</FormLabel>
							<Select
								focusBorderColor="#5b43d6"
								placeholder="Select Role"
								value={state.role}
								onChange={(e) => setState({ ...state, role: e.target.value })}
							>
								<option value="ADMIN">Administrator</option>
								<option value="Manager">Portfolio Manager</option>
							</Select>
						</FormControl>

						{state.role === "ADMIN" && (
							<FormControl id="secretKey" isRequired>
								<FormLabel>Secret Key</FormLabel>
								<Input type="text" ref={secretKey} />
							</FormControl>
						)}

						<Stack spacing={10} pt={2}>
							<Button
								onClick={submitHandler}
								loadingText="Submitting"
								size="lg"
								bg={"#5b43d6"}
								color={"white"}
								_hover={{
									bg: "#5a37a6",
								}}
							>
								Sign up
							</Button>
						</Stack>

						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<NavLink to="/login" color={"#5b43d6"}>
									Login
								</NavLink>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
