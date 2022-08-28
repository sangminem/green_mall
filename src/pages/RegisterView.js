/** 
 * @desc 상품정보 조회 화면 (관리자)
 * @auth hy
 * @since 2022.08.24
 * */ 

 import React, { Fragment, useEffect, useState } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form';
 import Container from 'react-bootstrap/Container';
 import Button from 'react-bootstrap/Button';
 import swal from 'sweetalert';
 
 const RegisterView = () => {

    useEffect(() => {
        getData();
    }, [])

     const SERVER_URL = "http://localhost:4000";

     const [products, setProducts] = useState([]);
 
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
 
     return (
         <React.Fragment>
             <Container>
                 <h4>상품정보조회</h4>
                 {
                    products.map((a, i) => {
                       return (
                        <React.Fragment key={i}>
                            {a.product_nm}
                        </React.Fragment>
                        )
                    })
                 }
             </Container>
         </React.Fragment>
     );
   }
 
 
   export default RegisterView;