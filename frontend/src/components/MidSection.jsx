import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

// eslint-disable-next-line react/prop-types
const Feature = ({ title, text, icon }) => {
	return (
		<Stack>
			<Flex
				w={16}
				h={16}
				align={"center"}
				justify={"center"}
				color={"white"}
				rounded={"full"}
				bg={"gray.100"}
				mb={1}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{title}</Text>
			<Text color={"gray.600"}>{text}</Text>
		</Stack>
	);
};

export default function MidSection() {
	return (
		<Box p={4}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
				<Feature
					icon={<Icon as={FcAssistant} w={10} h={10} />}
					title={"Streamlined Project Management"}
					text={
						"Project Prism offers a seamless approach to managing a diverse portfolio of projects. With our intuitive user interface, you can effortlessly create, read, update, and delete project details, ensuring your portfolio is always up-to-date and showcases your achievements accurately."
					}
				/>
				<Feature
					icon={<Icon as={FcDonate} w={10} h={10} />}
					title={"Effortless Task Management"}
					text={
						"Managing tasks associated with your projects has never been easier. Project Prism empowers you to handle each task independently, assigning resources with precision and tracking progress in real-time. Resources can be allocated to multiple tasks, ensuring optimal productivity throughout the project lifecycle"
					}
				/>
				<Feature
					icon={<Icon as={FcInTransit} w={10} h={10} />}
					title={"Powerful Resource Management"}
					text={
						"At the core of Project Prism lies a robust resource management system. Effortlessly link resources to specific tasks and assign them to multiple projects. Maximize efficiency by ensuring your projects have the right talent at the right time."
					}
				/>
			</SimpleGrid>
		</Box>
	);
}
