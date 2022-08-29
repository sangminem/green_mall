/**
 * @desc 상품정보 입력 화면 (관리자)
 * @auth hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

const ProductForm = (props) => {
  useEffect(() => {
    getData();
  }, []);

  const SERVER_URL = "http://localhost:4000";

  const [products, setProducts] = useState([]);

  return (
    <React.Fragment>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>브랜드명</Form.Label>
            <Form.Control
              type="text"
              name="brand_nm"
              onChange={props.getValue}
            />
            <Form.Label>브랜드코드</Form.Label>
            <Form.Control
              type="text"
              name="brand_cd"
              onChange={props.getValue}
            />
            <Form.Label>상품명</Form.Label>
            <Form.Control
              type="text"
              name="product_nm"
              onChange={props.getValue}
            />
            <Form.Label>판매가격</Form.Label>
            <Form.Control
              type="number"
              name="item_price"
              onChange={props.getValue}
            />
            <Form.Label>상품설명</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              name="product_summary"
              onChange={props.getValue}
            />
          </Form.Group>
          <Form.Select name="category" onChange={props.getValue}>
            <option>카테고리</option>
            <option value="furniture">가구</option>
            <option value="plant">식물/데코</option>
            <option value="interior">인테리어</option>
          </Form.Select>

          <Form.Label>상품대표이미지</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => props.setContent(e.target.files[0])}
          />

          <Button onClick={props.registerItem} style={{ margin: "16px 0" }}>
            상품 등록
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default ProductForm;
