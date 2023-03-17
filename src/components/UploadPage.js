import React, { useEffect, useState } from "react";
import {API_URL} from "../config/constants";
import axios from "axios";
import { Form, Input, Button, Upload, Divider, InputNumber, Descriptions } from "antd";
import "./UploadPage.css";
const { TextArea } = Input;
const UploadPage = () => {
	const [imageUrl, setImageUrl]=useState(null);
	const onFinish = (val) => {
		console.log(val);
		
		axios.post(`${API_URL}/products`, {
			name: val.name,
			description: val.description,
			price: val.price,
			seller: val.seller,

		}).then().catch();
		

	};
	const onChangeImage = (info) => {
		if (info.file.status==="uploading"){
			return;
		}
		if(info.file.status==="done"){
			const response=info.file.response;
			const imageUrl=response.imageUrl;
			setImageUrl(imageUrl)
		}
	};

	return (
		<div id="upload-container">
			<Form name="uploadForm" onFinish={onFinish}>
				<Form.Item name="upload">
					<Upload name="image" action={`${API_URL}/image`} listType="picture" showUploadList={false} onChange={onChangeImage}>
					
					{imageUrl ? (
						<img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="" />
					):(
						<div id="upload-img-placeholder">
							<img src="/images/icons/camera.png" alt="" />
							<span>이미지를 업로드 해주세요</span>
						</div>
					)}	
						
						
						
						
						



					</Upload>
				</Form.Item>

				<Divider></Divider>
				<Form.Item label={<span className="upload-label">판매자명</span>} name="seller" rules={[{ required: true, message: "판매자명은 필수 입력 사항입니다." }]}>
					<Input className="upload-name" placeholder="상품명을 입력해주세요" size="large" />
				</Form.Item>


				<Form.Item label={<span className="upload-label">상품명</span>} name="name" rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}>
					<Input className="upload-name" placeholder="상품명을 입력해주세요" size="large" />
				</Form.Item>
				<Divider></Divider>
				<Form.Item label={<span className="upload-price">판매가</span>} name="price" rules={[{ required: true, message: "판매가는 필수 입력 사항입니다." }]}>
					<InputNumber className="upload-price" size="large" min={0} defaultValue={0} />
				</Form.Item>
				<Divider></Divider>
				<Form.Item label={<span className="upload-label">상품설명</span>} name="description" rules={[{ required: true, message: "상품설명은 필수 입력 사항입니다." }]}>
					<TextArea size="large" id="product-description" showCount maxLength={300} placeholder="상품설명을 작성해주세요"></TextArea>
				</Form.Item>
				<Form.Item>
					<Button id="submit-button" htmlType="submit">
						상품등록하기
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
export default UploadPage;
