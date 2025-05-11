import { Card, Tag, Typography, Button } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { AttributeValue, Product } from "@/types";

const { Title, Text } = Typography;

interface LastModifiedProductProps {
	product: Product;
}

const LastModifiedProduct: React.FC<LastModifiedProductProps> = ({
	product,
}) => {
	const navigate = useNavigate();

	const renderAttributeValue = (attr: AttributeValue) => {
		switch (attr.type) {
			case "boolean":
				return attr.value ? "Yes" : "No";
			case "tags":
				return Array.isArray(attr.value) ? (
					<div>
						{attr.value.map((tag: string, index: number) => (
							<Tag key={`rendered-tags-${index + 1}`} color="blue">
								{tag}
							</Tag>
						))}
					</div>
				) : (
					attr.value
				);
			case "url":
				return (
					<a href={attr.value} target="_blank" rel="noopener noreferrer">
						{attr.value}
					</a>
				);
			default:
				return String(attr.value);
		}
	};

	return (
		<Card
			title={
				<div style={{ display: "flex", alignItems: "center" }}>
					<EditOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
					<span>Last Modified Product</span>
				</div>
			}
			extra={
				<Button
					type="primary"
					icon={<EyeOutlined />}
					onClick={() => navigate(`/dashboard/products/${product.id}`)}
				>
					View Details
				</Button>
			}
			style={{
				width: "100%",
				background: "#f0f7ff",
				border: "1px solid #d6e4ff",
			}}
		>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div>
					<Title level={4} style={{ margin: 0, marginBottom: "8px" }}>
						{product.name}
					</Title>
					<Text type="secondary">ID: {product.id}</Text>
				</div>

				<div>
					{product.attributes.slice(0, 3).map((attr, index) => (
						<div
							key={`product-attributes-${index + 1}`}
							style={{ marginBottom: "4px" }}
						>
							<Text strong>{attr.code}: </Text>
							<Text>{renderAttributeValue(attr)}</Text>
						</div>
					))}
					{product.attributes.length > 3 && (
						<Text type="secondary">
							+{product.attributes.length - 3} more attributes
						</Text>
					)}
				</div>
			</div>
		</Card>
	);
};

export default LastModifiedProduct;
