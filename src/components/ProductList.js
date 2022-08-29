/**
 * @desc 상품리스트 조회 화면 (관리자)
 * @auth hy
 * @since 2022.08.29
 * */

import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

const ProductList = (props) => {
  useEffect(() => {}, []);

  const products = props.products;

  return (
    <React.Fragment>
      <Container>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>대표이미지</th>
                <th>상품명</th>
                <th>상품가격</th>
                <th>카테고리</th>
                <th>변경</th>
              </tr>
            </thead>
            <tbody>
              {products.map((a, i) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>
                        {a.image !== "" ? (
                          <img
                            src={a.image}
                            alt=""
                            style={{ width: "60px", borderRadius: "12px" }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{a.product_nm}</td>
                      <td>{a.item_price}</td>
                      <td>{a.category}</td>
                      <td><props.Button>수정</props.Button></td>
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
