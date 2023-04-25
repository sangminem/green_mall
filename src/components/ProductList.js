/**
 * @desc 상품리스트 조회 화면 (관리자)
 * @auth hy
 * @since 2022.08.29
 * */

import React, { Fragment, useEffect } from "react";
import { Table, Button, Popconfirm, Skeleton } from "antd";
import addComma from "../Utils";

const ProductList = (props) => {
  useEffect(() => {}, []);

  const productList = props.productList;
  const editProduct = props.editProduct;
  const deleteProduct = props.deleteProduct;

  const columns = [
    {
      title: "대표이미지",
      dataIndex: "IMAGE",
      width: 90,
      render: (image) => (
        image ? <img src={image} alt="" style={{ width: "60px", borderRadius: "5px" }} />
          : <Skeleton.Image active={true} style={{ width: "60px", height: "60px", borderRadius: "5px" }} />
      ),
    },
    {
      title: "상품명",
      dataIndex: "PRODUCT_NM",
      width: 200,
    },
    {
      title: "상품가격",
      dataIndex: "SALE_PRICE",
      width: 100,
      align: "right",
      render: (salePrice) => addComma(salePrice),
    },
    {
      title: "카테고리",
      dataIndex: "CATEGORY",
      width: 100,
    },
    {
      title: "변경",
      dataIndex: "",
      width: 140,
      render: (productDetail) => (
        <Fragment>
          <Button
            onClick={() => {
              editProduct({"productDetail": productDetail, "editYn": true});
            }}
          >
            수정
          </Button>
          <Popconfirm title="삭제하시겠습니까?" onConfirm={() => {deleteProduct(productDetail.PRODUCT_ID)}}>
            <Button>
              삭제
            </Button>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Table
        rowKey={(productDetail) => {
          return productDetail.PRODUCT_ID;
        }}
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
