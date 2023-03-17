import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {API_URL} from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const MainPage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		let url = `${API_URL}/products`;
		axios
			.get(url)
			.then((result) => {
				console.log(result);
				const products = result.data.product;
				setProducts(products);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div>
			<div id="body">
				<div id="banner">
					<img src="images/banners/banner1.png" alt="" />
				</div>
				<h1>Products</h1>
				<div id="product-list">
					{products.map((product, idx) => {
						return (
							<div className="product-card" key={idx}>
								<Link className="product-link" to={`/productPage/${product.id}`}>
									<div>
										<img className="product-img" src={product.imageUrl} alt={product.name} />
									</div>
									<div className="product-content">
										<span className="product-name">{product.name}</span>
										<span className="product-price">{product.price}</span>
										<div className="product-footer">
											<span className="product-seller">
												<img src="images/icons/avatar.png" className="product-avatar" alt="{product.seller}" />
												<span>{product.seller}</span>
											</span>
											<span className="product-date">상품등록일:   
												{dayjs(product.createdAt).format('YY년MM월DD일:hh시-mm분-ss초')}
											</span>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default MainPage;
