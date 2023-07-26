/* eslint-disable react/prop-types */
import {
	ChevronDownIcon,
	ChevronRightIcon,
	CloseIcon,
	HamburgerIcon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	Collapse,
	Flex,
	Icon,
	IconButton,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../public/logo.png";
import { AuthContext } from "../HOC/AuthContext";
import { userLogout } from "../api";

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();

	const navigate = useNavigate();

	const handleHome = () => {
		navigate("/");
	};

	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const handleLogout = async () => {
		const data = await userLogout(localStorage.getItem("user") || "");

		if (data.status === 200) {
			toast.success("Logout Successful");
			localStorage.removeItem("user");
			setIsAuthenticated(false);
			navigate("/");
		} else {
			toast.error("Logout Failed");
		}
	};
	return (
		<Box>
			<Flex
				position={"fixed"}
				zIndex={10}
				width={"full"}
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				top={0}
				left={0}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
			>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
					align={"center"}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>

				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
					<Flex
						textAlign={useBreakpointValue({ base: "center", md: "left" })}
						align="end"
						fontFamily={"heading"}
						color={useColorModeValue("gray.800", "white")}
						onClick={handleHome}
					>
						<img src={logo} width={"10%"} alt="logo" />
						<Text color={"#5b43d6"} fontWeight={600}>
							PORTFOLIO
						</Text>
						<Text color={"#ed5ad2"} fontWeight={600}>
							PILOT
						</Text>
					</Flex>

					<Flex display={{ base: "none", md: "flex" }} align={"center"} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}
				>
					{!isAuthenticated ? (
						<Button
							onClick={() => navigate("/login")}
							display={{ base: "inline-flex", md: "inline-flex" }}
							fontSize={"sm"}
							fontWeight={600}
							color={"white"}
							bg={"#5b43d6"}
							_hover={{
								bg: "#5a37a6",
							}}
						>
							Sign In
						</Button>
					) : (
						<Button
							onClick={handleLogout}
							display={{ base: "inline-flex", md: "inline-flex" }}
							fontSize={"sm"}
							fontWeight={600}
							color={"white"}
							bg={"#5b43d6"}
							_hover={{
								bg: "#5a37a6",
							}}
						>
							Log out
						</Button>
					)}

					{!isAuthenticated ? (
						<Button
							onClick={() => navigate("/signup")}
							display={{ base: "inline-flex", md: "inline-flex" }}
							fontSize={"sm"}
							fontWeight={600}
							color={"white"}
							bg={"#ed5ad2"}
							_hover={{
								bg: "#ed5aaa",
							}}
						>
							Sign Up
						</Button>
					) : (
						<></>
					)}
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link
			href={href}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
		>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "pink.400" }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}
				>
					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			marginTop={"50px"}
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue("gray.600", "gray.200")}
				>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack
					// mt={-3}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}
				>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: "Projects",
		children: [
			{
				label: "Create Project",
				href: "#",
			},
			{
				label: "View Projects",
				href: "#",
			},
		],
	},
	{
		label: "Manage Tasks",
		children: [
			{
				label: "Create Task",
				href: "#",
			},
			{
				label: "View Tasks",
				href: "#",
			},
		],
	},
	{
		label: "Resources",
		children: [
			{
				label: "Create Resource",
				href: "#",
			},
			{
				label: "View Resources",
				href: "#",
			},
		],
	},
];
