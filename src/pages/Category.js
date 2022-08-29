/**
 * @desc 상품 리스트 화면
 * @author hy
 * @since 2022.08.23
 */

import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import addComma from "../Utils.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoHeartOutline } from "react-icons/io5";

const Category = () => {
  const location = useLocation();
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  const SERVER_URL = "http://localhost:4000";

  // 경로가 변경될때마다 카테고리별 상품 데이터 가져오기
  useLayoutEffect(() => {}, []);

  /**
   * 상품 정렬 기능
   *
   * @param {string} gubun 정렬기준
   * @return
   */
  const itemSort = function (gubun) {
    let prdCopy = [...products];

    if (gubun === "low") {
      // 낮은 가격순 정렬
      prdCopy.sort((a, b) => {
        return parseFloat(a.item_price) - parseFloat(b.item_price);
      });
    } else {
      // 높은 가격순 정렬
      prdCopy.sort((a, b) => {
        return parseFloat(b.item_price) - parseFloat(a.item_price);
      });
    }

    setProducts(prdCopy);
  };

  // [TODO] 상세페이지 이동
  const goDetail = () => {
    alert("[TODO] 상세페이지 이동 기능 추가 예정");
  };

  return (
    <React.Fragment>
      <Container>
        <DropdownButton id="dropdown-basic-button" title="정렬">
          <Dropdown.Item onClick={() => itemSort("low")}>
            낮은 가격순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => itemSort("high")}>
            높은 가격순
          </Dropdown.Item>
        </DropdownButton>
        <Row>
          {products.map((a, i) => {
            return (
              <React.Fragment key={i}>
                <Col xs={6} style={{ margin: "18px 0", padding: "0 15px" }}>
                  {a.image !== "" ? (
                    <img
                      src={a.image}
                      alt=""
                      style={{ width: "100%", borderRadius: "12px" }}
                    />
                  ) : (
                    ""
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                      margin: "10px 0 6px",
                      color: "#555",
                    }}
                  >
                    {a.brand_nm}
                  </p>
                  <h4 style={{ fontSize: "14px" }}>{a.product_nm}</h4>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#27ae60",
                    }}
                  >
                    {addComma(a.item_price)} 원
                  </span>
                  <button
                    style={{ border: 0, background: "none", fontSize: "13px" }}
                  >
                    <IoHeartOutline /> 0
                  </button>
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Category;
