import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	useColorModeValue,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { userLogin } from "../api";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthContext } from "../HOC/AuthContext";

export default function SimpleCard() {
	const [showPassword, setShowPassword] = useState(false);

	const { setIsAuthenticated } = useContext(AuthContext);

	const initial = {
		email: "",
		password: "",
	};

	const [state, setState] = useState(initial);

	const navigate = useNavigate();

	const submitHandler = async () => {
		if (!state.email || !state.password) {
			toast.error("Please fill all the fields");
			return;
		}
		const response = await userLogin(state);
		console.log(response);

		if (response.status === 200) {
			toast.success("Login Successful");
			localStorage.setItem("user", state.email);
			setIsAuthenticated(true);
			setState(initial);
			navigate("/", { replace: true });
		} else {
			toast.error("Login Failed");
		}
	};

	return (
		<Flex
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"} marginTop={"10%"}>
					<Heading fontSize={"4xl"}>Log in </Heading>
				</Stack>

				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
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

						<Stack spacing={10}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}
							>
								<Checkbox>Remember me</Checkbox>
								<Link color={"#5b43d6"}>Forgot password?</Link>
							</Stack>

							<Button
								onClick={submitHandler}
								bg={"#5b43d6"}
								color={"white"}
								_hover={{
									bg: "#5a37a6",
								}}
							>
								Log in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
