/**
 * @desc 상품정보 입력 화면 (관리자)
 * @auth hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {Button, Input} from "antd";

const ProductForm = (props) => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Form className="g-modal">      
          <h3>기본정보</h3>
          <img
            src={props.productDetail.image}
            style={{ width: "120px", border: "1px solid #ccc" }}
            alt=""
          ></img>
          <input
            type="file"
            onChange={(e) => {
              props.onChangeImage(e.target.files[0]);
              props.setContent(e.target.files[0]);
            }}
          />        
          <Input
            placeholder="브랜드명"
            type="text"
            name="brand_nm"
            value={props.productDetail.brand_nm}
            onChange={props.getValue}
          />
          <Input
            placeholder="상품명"
            type="text"
            name="product_nm"
            value={props.productDetail.product_nm}
            onChange={props.getValue}
          />
          <Input
            placeholder="상품요약명"
            type="text"
            name="product_summary"
            value={props.productDetail.product_summary}
            onChange={props.getValue}
          />
          <Input
            placeholder="가격"
              type="number"
              name="item_price"
              value={props.productDetail.item_price}
              onChange={props.getValue}
          />         
               
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
