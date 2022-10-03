/**
 * @desc 상품리스트 조회 화면 (관리자)
 * @auth hy
 * @since 2022.08.29
 * */

import React, { Fragment, useEffect, useState } from "react";
import { Table } from "antd";
import addComma from "../Utils";
const { Column, ColumnGroup } = Table;

const ProductList = (props) => {
  useEffect(() => {}, []);

  const productList = props.productList;
  const editProduct = props.editProduct;

  const columns = [
    {
      title: "대표이미지",
      dataIndex: "IMAGE",
      key: "IMAGE",
      render: (text) => (
        <img src={text} alt="" style={{ width: "60px", borderRadius: "5px" }} />
      ),
    },
    {
      title: "상품명",
      dataIndex: "PRODUCT_NM",
      key: "PRODUCT_NM",
    },
    {
      title: "상품가격",
      dataIndex: "SALE_PRICE",
      key: "SALE_PRICE",
      render: (text) => addComma(text),
    },
    {
      title: "카테고리",
      dataIndex: "CATEGORY",
      key: "CATEGORY",
    },
    {
      title: '변경',
      dataIndex: '',
      key: 'x',
      render: (text) => <button onClick={() => {editProduct(text.PRODUCT_ID)}}>수정</button>,
    },
  ];

  return (
    <React.Fragment>
      <Table
        columns={columns}
        dataSource={productList}
        pagination={{
          pageSize: 15,
        }}
        scroll={{
          y: 540,
        }}
      />
    </React.Fragment>
  );
};

export default ProductList;
