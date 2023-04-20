/**
 * @desc 상품리스트 조회 화면 (관리자)
 * @auth hy
 * @since 2022.08.29
 * */

 import React, { Fragment, useEffect } from "react";
 import { Table, Button, Popconfirm } from "antd";
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
       render: (text) => (
         <img src={text} alt="" style={{ width: "60px", borderRadius: "5px" }} />
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
       render: (text) => addComma(text),
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
       render: (text) => (
         <Fragment>
           <Button
             onClick={() => {
               editProduct(text);
             }}
           >
             수정
           </Button>
           <Popconfirm title="삭제하시겠습니까?" onConfirm={() => {deleteProduct(text.PRODUCT_ID)}}>
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
         rowKey={(item) => {
           return item.PRODUCT_ID;
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
 