/** 
 * @desc 상품정보 등록 화면 (관리자)
 * @auth hy
 * @since 2022.08.24
 * */ 

 import React, { Fragment, useEffect, useState } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form';
 import Container from 'react-bootstrap/Container';
 import Button from 'react-bootstrap/Button';
 import swal from 'sweetalert';
 
 const Register = () => {

    useEffect(() => {
         
    }, [])
 
     const [product_nm, setProduct_nm] = useState("");
     const [product_summary, setProduct_summary] = useState("");
     const [item_price, setItem_price] = useState("");
     const [category, setCategory] = useState("");
     const [brand_cd, setBrand_cd] = useState("");
     const [brand_nm, setBrand_nm] = useState("");
     const [content, setContent] = useState("");
     const [uploadedImg, setUploadedImg] = useState({fileName: "", fillPath: ""});

     const SERVER_URL = "http://localhost:4000";
 
     /** 
      * 상품 데이터 db에 등록
     */
     const registerItem = function(e) {
         e.preventDefault();
 
         const url = `${SERVER_URL}/api/register`;
 
         const formData = new FormData();
         formData.append("product_nm", product_nm); 
         formData.append("product_summary", product_summary); 
         formData.append("item_price", item_price); 
         formData.append("category", category); 
         formData.append("brand_cd", brand_cd); 
         formData.append("brand_nm", brand_nm); 
         formData.append("img", content); 
 
         axios.post(url, formData)
             .then(function (res){
                 // status가 200인 경우 여기로 들어옴
                 // 실제로 db insert가 성공인지 실패인지 구분하기 위해, 서버에서 성공인 경우 errCode를 0으로 보내도록 해놓음
                 if(res.data.errCode == 0) {
                     swal({
                        text: "상품정보를 성공적으로 등록했습니다.",
                        icon: "success",
                        button: "확인",
                      });
                 } else {
                    swal({
                        text: "상품정보 등록중 오류가 발생했습니다.",
                        icon: "error",
                        button: "확인",
                      });
                 }
                 console.log(res);
             }).catch(function (err) {
                 // 서버 자체에 에러가 있는 경우 여기로 빠짐. status가 200이 아닌 경우
                 swal({
                    text: "서버 접속중 오류가 발생했습니다.",
                    icon: "error",
                    button: "확인",
                  });
                 console.log(err);
             });
     }
 
     return (
         <React.Fragment>
             <Container>
                 <h4>상품정보등록</h4>
                 <Form>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>상품 이름</Form.Label>
                         <Form.Control type="text" value={product_nm} onChange={(e) => setProduct_nm(e.target.value)}/>                        
                         <Form.Label>상품 설명</Form.Label>
                         <Form.Control type="text" value={product_summary} onChange={(e) => setProduct_summary(e.target.value)}/>
                         <Form.Label>상품 가격</Form.Label>
                         <Form.Control type="text" value={item_price} onChange={(e) => setItem_price(e.target.value)}/>
                         <Form.Label>브랜드 이름</Form.Label>
                         <Form.Control type="text" value={brand_nm} onChange={(e) => setBrand_nm(e.target.value)}/>
                         <Form.Label>브랜드 코드</Form.Label>
                         <Form.Control type="text" value={brand_cd} onChange={(e) => setBrand_cd(e.target.value)}/>
                     </Form.Group>
                     <Form.Select onChange={(e) => setCategory(e.target.value)}>
                         <option>카테고리</option>
                         <option value="furniture">가구</option>
                         <option value="plant">식물/데코</option>
                         <option value="interior">인테리어</option>
                     </Form.Select>

                     <Form.Label>상품 이미지</Form.Label>
                     <Form.Control type="file" onChange={(e) => setContent(e.target.files[0])}/> 
 
                     <Button onClick={registerItem}>상품 등록</Button>
                 </Form>
             </Container>
         </React.Fragment>
     );
   }
 
 
   export default Register;