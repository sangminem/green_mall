/**
 * @desc 상품리스트 조회 화면 (관리자)
 * @auth hy
 * @since 2022.08.29
 * */

import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

const ProductList = (props) => {
  useEffect(() => {}, []);

  const productList = props.productList;

  return (
    <React.Fragment>
      <Container>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>대표이미지</th>
                <th style={{ width: "40%" }}>상품명</th>
                <th style={{ width: "15%" }}>상품가격</th>
                <th style={{ width: "15%" }}>카테고리</th>
                <th style={{ width: "15%" }}>변경</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((a, i) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td style={{ width: "15%" }}>
                        {a.image !== "" ? (
                          <img
                            src={a.image}
                            alt=""
                            style={{ width: "70px", borderRadius: "12px" }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td style={{ width: "40%" }}>{a.product_nm}</td>
                      <td style={{ width: "15%", textAlign: "right" }}>
                        {props.addComma(a.item_price)} 원
                      </td>
                      <td style={{ width: "15%", textAlign: "center" }}>
                        {a.category}
                      </td>
                      <td style={{ width: "15%" }}>
                        <props.Button
                          variant="light"
                          onClick={() => {
                            props.editProduct(a.product_id);
                          }}
                        >
                          수정
                        </props.Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ProductList;
