/** 
 * @desc 상품 리스트 화면
 * @auth hy
 * @since 2022.08.23
 * */ 

 import React, { Fragment, useEffect, useState } from 'react';
 import axios from 'axios';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Button from 'react-bootstrap/Button';
 
 const Category = () => {
 
     const [products, setProducts] = useState([]);
 
     // 상품 데이터 db에서 가져오기
     const getData = function () {
         const url = "http://localhost:4000/api/products";
 
         axios.get(url)
             .then(function(res) {
                 console.log(res.data);
                 console.log("성공");
                 setProducts(res.data);                                                                                                                                                  
             })
             .catch(function(err) {
                 console.log("데이터 로드중 오류가 발생했습니다.");
             })
     }
 
     // 상품 정렬 기능
     const itemSort = function() {
 
     }
 
     useEffect(() => {
         getData()
     }, [])
 
     return (
         <React.Fragment>
             <Button variant="outline-dark">정렬</Button>
 
              <Container>
                  <Row>
                     {
                         products.map((a, i) => {
                             return (
                                 <React.Fragment key={i}>
                                     <Col md={3} sm={4} xs={6}>
                                         <p>{a.brand_nm}</p>
                                         <h4>{a.product_nm}</h4>
                                         <span>{a.item_price}</span>
                                     </Col>
                                 </React.Fragment>   
                             )
                         })
                     }
                   </Row>
                 </Container>
         </React.Fragment>
     );
   }
 
 
   export default Category;