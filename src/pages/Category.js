/** 
 * @desc 상품 리스트 화면
 * @auth hy
 * @since 2022.08.23
 * */ 

 import React, { Fragment, useEffect, useState } from 'react';
 import axios from 'axios';
 import swal from 'sweetalert';
 import addComma from '../Utils.js';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Dropdown from 'react-bootstrap/Dropdown';
 import DropdownButton from 'react-bootstrap/DropdownButton';
 import Button from 'react-bootstrap/Button';
 import {IoHeartOutline} from "react-icons/io5";
 
 const Category = () => {
 
    // 처음 렌더링 시 실행
    useEffect(() => {
         getData(); 
        }, [])
        
    const [products, setProducts] = useState([]);

    const SERVER_URL = "http://localhost:4000";

     // 상품 데이터 db에서 가져오기
     const getData = function () {
         const url = `${SERVER_URL}/api/products`;
 
         axios.get(url)
             .then(function(res) {

                let data = res.data;
                console.log("data", data);

                for (let key in data) {                    
                    data[key].image = `${SERVER_URL}/images/` + data[key].image;   // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에
                    console.log(data[key].image);
                }
               
                setProducts(res.data);        
             })
             .catch(function(err) {
                swal({
                    text: "서버 접속중 오류가 발생했습니다.",
                    icon: "error",
                    button: "확인",
                  });
                console.log(err);
             })
     }

 
     // 상품 정렬 기능
     const itemSort = function(gubun) {
        let prdCopy = [...products];
        
        if(gubun === "low") {   // 낮은 가격순 정렬
            prdCopy.sort((a, b) => {
                return parseFloat(a.item_price) - parseFloat(b.item_price);
            });
        } else {   // 높은 가격순 정렬
             prdCopy.sort((a, b) => {
                return parseFloat(b.item_price) - parseFloat(a.item_price);
            });
        }

        setProducts(prdCopy);
     }

    // [TODO] 상세페이지 이동
    const goDetail = () => {
        alert("[TODO] 상세페이지 이동 기능 추가 예정");
    } 
 

     return (
         <React.Fragment>           
              <Container>                  
                  <DropdownButton id="dropdown-basic-button" title="정렬">
                    <Dropdown.Item onClick={() => itemSort("low")}>낮은 가격순</Dropdown.Item>
                    <Dropdown.Item onClick={() => itemSort("high")}>높은 가격순</Dropdown.Item>
                  </DropdownButton>
                  <Row>
                     {
                         products.map((a, i) => {
                             return (
                                 <React.Fragment key={i}>
                                     <Col xs={6} style={{margin: "15px 0", padding: "20px"}}>
                                         
                                         {
                                            a.image !== '' ? (
                                                <img src={a.image} alt="" style={{width: "100%", borderRadius: "12px"}} />
                                            ) : (
                                                ""
                                            )
                                         }
                                         <p style={{fontSize: "12px", margin: "6px 0"}}>{a.brand_nm}</p>
                                         <h4 style={{fontSize: "14px"}}>{a.product_nm}</h4>
                                         <span style={{fontSize: "15px", fontWeight: 600}}>{addComma(a.item_price)} 원</span>
                                         <button style={{border: 0, background: "none", fontSize: "13px"}}><IoHeartOutline/> 0</button>
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