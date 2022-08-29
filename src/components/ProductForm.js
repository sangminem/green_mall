/**
 * @desc 상품정보 입력 화면 (관리자)
 * @auth hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ProductForm = (props) => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Form className="g-modal">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Select name="category" value={props.productDetail.category} onChange={props.getValue}>
            <option>카테고리</option>
            <option value="furniture">가구</option>
            <option value="plant">식물/데코</option>
            <option value="interior">인테리어</option>
          </Form.Select>
          <Form.Label>브랜드명</Form.Label>
          <Form.Control type="text" name="brand_nm" value={props.productDetail.brand_nm} onChange={props.getValue} />
          <Form.Label>상품명</Form.Label>
          <Form.Control
            type="text"
            name="product_nm"
            value={props.productDetail.product_nm}
            onChange={props.getValue}
          />
          <Form.Label>상품대표이미지</Form.Label>
          <img src={props.productDetail.image} style={{width: "120px", border: "1px solid #ccc"}} alt=""></img>
          {/* {
            props.previewImg ? <img src={props.previewImg} style={{width: "120px", border: "1px solid #ccc"}} alt=""></img> : <img src={process.env.PUBLIC_URL + '/noimg2.png'} style={{width: "120px", border: "1px solid #ccc"}} alt=""></img>
          } */}
          <Form.Control
            type="file"
            onChange={(e) => {props.onChangeImage(e.target.files[0]); props.setContent(e.target.files[0]) }}
          />
          <Form.Label>판매가격</Form.Label>
          <Form.Control
            type="number"
            name="item_price"
            value={props.productDetail.item_price}
            onChange={props.getValue}
          />
          <Form.Label>상품설명</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            name="product_summary"
            value={props.productDetail.product_summary}
            onChange={props.getValue}
          />
        </Form.Group>

        <Button onClick={props.registerItem} style={{ margin: "16px 0" }}>
          상품 등록
        </Button>
        <Button
          variant="light"
          onClick={() => {
            props.setIsModalOpen(false);
          }}
          style={{ margin: "16px 6px" }}
        >
          취소
        </Button>
      </Form>
      <div
        className="modal-overlay"
        onClick={() => {
          props.setIsModalOpen(false);
        }}
      ></div>
    </React.Fragment>
  );
};

export default ProductForm;
