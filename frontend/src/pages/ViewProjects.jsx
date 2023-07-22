/* eslint-disable no-unused-vars */
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../api";

const columns = [
	{
		title: "Project Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
	},
	{
		title: "Action",
		dataIndex: "",
		key: "x",
		render: () => <a>Delete</a>,
	},
	{
		title: "Action",
		dataIndex: "",
		key: "x",
		render: () => <a>Edit</a>,
	},
];

const data = [
	{
		key: 1,
		name: "John Brown",
		startDate: "2021-09-01",
		endDate: "2021-09-30",
		description:
			"My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
	},
	{
		key: 2,
		name: "Jim Green",
		startDate: "2021-09-01",
		endDate: "2021-09-30",
		description:
			"My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
	},
	{
		key: 3,
		name: "Not Expandable",
		age: 29,
		address: "Jiangsu No. 1 Lake Park",
		description: "This not expandable",
	},
	{
		key: 4,
		name: "Joe Black",
		age: 32,
		address: "Sydney No. 1 Lake Park",
		description:
			"My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
	},
];

const ViewProjects = () => {
	// const [data, setData] = useState([]);

	// useEffect(() => {
	// 	const getDataFromApi = async () => {
	// 		const data = await getProjects("johndoe@gmail.com");
	// 		console.log(data, "from data");
	// 	};
	// 	getDataFromApi();
	// }, []);

	// return (
		<Table
			columns={columns}
			expandable={{
				expandedRowRender: (record) => (
					<p
						style={{
							margin: 0,
						}}
					>
						{record.description}
					</p>
				),
				rowExpandable: (record) => record.name !== "Not Expandable",
			}}
			dataSource={data}
		/>
	// );
};

export default ViewProjects;