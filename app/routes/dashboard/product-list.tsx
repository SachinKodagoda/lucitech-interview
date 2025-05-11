import { useEffect } from "react";
import { Table, Card, Typography, Spin, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";

import type { Product } from "@/types";

import {
	fetchProducts,
	setPage,
	setSortField,
	setSortOrder,
} from "@/stores/slices/product-slice";
import PerPageItems from "@/widgets/per-page-items";
import { renderAttributeValue } from "@/utils/render-attributes";
import { useParams } from "@/hooks/use-params-data";
import { getCategoryName } from "@/utils/get-category-name";

const { Title } = Typography;

const ProductList: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { categoryId, pageSize, categoryGroup, page } = useParams();

	const { products, loading, pagination, sortField, sortOrder } =
		useAppSelector((state) => state.products);

	const { categories } = useAppSelector((state) => state.categories);

	const categoryName = getCategoryName({
		categoryId,
		categoryGroup,
		categories,
	});

	useEffect(() => {
		// Fetch products when component mounts or when pagination/sort changes
		dispatch(
			fetchProducts({
				page: page || pagination.page,
				page_size: pageSize || pagination.page_size,
				category_id: categoryId,
				category_group: categoryGroup,
				sortField,
				sortOrder: sortOrder || undefined,
			}),
		);
		// if (pageSize) {
		//   dispatch(setPageSize(pageSize));
		// }
		// if (page) {
		//   dispatch(setPage(page));
		// }
	}, [
		page,
		pageSize,
		categoryId,
		categoryGroup,
		sortField,
		sortOrder,
		dispatch,
		pagination.page,
		pagination.page_size,
	]);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sorter: true,
			sortOrder: sortField === "id" ? sortOrder : null,
			width: 80,
		},
		{
			title: "Product Name",
			dataIndex: "name",
			key: "name",
			sorter: true,
			sortOrder: sortField === "name" ? sortOrder : null,
		},
		{
			title: "Price",
			key: "price",
			render: (text: string, record: Product) =>
				renderAttributeValue(record, "price"),
		},
		{
			title: "In Stock",
			key: "in_stock",
			render: (text: string, record: Product) =>
				renderAttributeValue(record, "in_stock"),
		},
		{
			title: "Actions",
			key: "actions",
			render: (text: string, record: Product) => (
				<Button
					type="primary"
					icon={<EyeOutlined />}
					onClick={() => navigate(`/dashboard/products/${record.id}`)}
				>
					View
				</Button>
			),
		},
	];

	return (
		<Card>
			<div className="mb-6 flex justify-between">
				<Title level={3}>{categoryName}</Title>
				<PerPageItems />
			</div>
			{loading ? (
				<div className="flex justify-center p-10">
					<Spin size="large" />
				</div>
			) : (
				<Table
					dataSource={products}
					columns={columns}
					rowKey="id"
					pagination={{
						current: pagination.page,
						pageSize: pagination.page_size,
						total: pagination.total,
						onChange: (page) => dispatch(setPage(page)),
						showSizeChanger: false,
					}}
					onChange={(pagination, filters, sorter) => {
						const { field, order } = sorter as unknown as {
							field: string;
							order: "ascend" | "descend" | null;
						};
						if (field) {
							dispatch(setSortField(field));
							dispatch(setSortOrder(order));
						}
					}}
				/>
			)}
		</Card>
	);
};

export default ProductList;
