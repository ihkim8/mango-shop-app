import React, { useState, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";

const MainPage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		let url = "https://aa24146f-e0e1-4d7c-b63f-fa5b08f35ea5.mock.pstmn.io/products";
		axios
			.get(url)
			.then((result) => {
				const products = result.data.products;
				setProducts(products);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	console.log(products);
	return (
		<div>
			<div id="header">
				<div id="header-area">
					<img src="images/icons/logo.png" alt="" />
				</div>
			</div>
			<div id="body">
				<div id="banner">
					<img src="images/banners/banner1.png" alt="" />
				</div>
				<h1>Products</h1>
				<div id="product-list">
					{products.map((product, idx) => {
						return (
							<div className="product-card" key={idx}>
								<div>
									<img className="product-img" src={product.imageUrl} alt="" />
								</div>
								<div className="product-content">
									<span className="product-name">{product.name}</span>
									<span className="product-price">{product.price}</span>
									<span className="product-seller">
										<img src="images/icons/avatar.png" className="product-avatar" alt="" />
										<span>{product.seller}</span>
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div id="footer">
				<a href="#">회사소개</a>
				<a href="#">이용약관</a>
				<a href="#">통신판매업신고번호:123-1234</a>
				<a href="#">사업자등록번호:456-56-78951</a>
				<a href="#">고객센터:456-78951</a>
			</div>
		</div>
	);
};
export default MainPage;
