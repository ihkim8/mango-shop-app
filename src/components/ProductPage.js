import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {API_URL} from "../config/constants";
import axios from "axios";
import "./ProductPage.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const ProductPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	useEffect(() => {
		let url = `${API_URL}/products/${id}`;
		//let url = `http://127.0.0.1:8080/products/${id}`;
		axios
			.get(url)
			.then((result) => {
				console.log(result);
				setProduct(result.data.product);
				
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	if (product == null) {
		return <h1>상품정보를 받고 있습니다...</h1>;
	}
	return (
		<div>
			<button
				onClick={() => {
					navigate(-1);
				}}
				id="back-btn">
				뒤로
			</button>
			<div id="image-box">
				<img src={`/${product.imageUrl}`} alt={product.name} />
			</div>
			<div id="profile-box">
				<img src="/images/icons/avatar.png" alt={product.seller} />
        <span className="product-seller">{product.seller}</span>
			</div>
      <div className="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="createdAt">{product.createdAt}</div>
        <div id="description">{product.description}</div>
      </div>
		</div>
	);
};
export default ProductPage;
