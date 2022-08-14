import React, { Fragment, useState } from 'react';
// import {Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap';
import { Button, Container, Grid } from '@mui/material';

const Category = () => {

    // [TODO] 데이터
    const furnitureData = [
        {id:0, title:"[5%쿠폰] 베가 폴라 투명 접이식의자 17colors(대량구매 추가할인)", desc:"", price: 30800, imgSrc: "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164325182439107818.jpg?gif=1&w=1280&h=1280&c=c&webp=1"},
        {id:1, title:"어메이징 원목 침대깔판 (7일 이내 무상반품)", desc:"", price: 9900, imgSrc: "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1542621980_107096_1.jpg?gif=1&w=1280&h=1280&c=c&webp=1"},
        {id:2, title:"[5%쿠폰] 키드니빈즈 접이식 좌식테이블 3colors 2size (보호캡증정)", desc:"", price: 19900, imgSrc: "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/162424305319088723.jpeg?gif=1&w=1280&h=1280&c=c&webp=1"},
        {id:3, title:"엘리 라운드 스탠드 전신거울 2size", desc:"", price: 69000, imgSrc: "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163574159114711715.jpg?gif=1&w=1280&h=1280&c=c&webp=1"},    
        {id:4, title:"콰트로 에어 데스크 20size 5colors(800~2000mm)", desc:"", price: 125000, imgSrc: "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/157242782195255523.jpg?gif=1&w=1280&h=1280&c=c&webp=1"},    
        {id:5, title:"오키 다용도 접이식 사이드 보조테이블 3colors", desc:"", price: 37900, imgSrc: "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/157233317070597151.jpg?gif=1&w=1280&h=1280&c=c&webp=1"}
    ]

    const [product, setProduct] = useState(furnitureData);
    const [sortPrd, setSort] = useState([]);


    // [TODO] 가격에 콤마 추가
    const addComma = (nStr) => {
        nStr += "";
		let x = nStr.split(".");
		let x1 = x[0];
		let x2 = x.length > 1 ? "." + x[1] : "";
		let rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, "$1" + "," + "$2");
		}
		return x1 + x2;
    }

    // [TODO] 상품 정렬
    const productSort = () => {
        let copy = [...furnitureData];

        // 이름순 정렬 
        copy.sort((a, b) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        })

        setProduct(copy);
    }

    // [TODO] 상세페이지 이동
    const goDetail = () => {
        alert("[TODO] 상세페이지 이동 기능 추가 예정");
    }

    return (
        <Fragment>
            <Container maxWidth="md">                   
                <Button variant="outlined" onClick={productSort}>정렬</Button>
                <Grid container spacing={3}> 
                    {
                        product.map((a, i) => {
                            return (
                                <Fragment key={i}>                                     
                                    <Grid item xs={4} onClick={goDetail}> 
                                        <img src={a.imgSrc} style={{width:"100%"}}/>
                                        <h2 style={{fontSize:"16px"}}>{a.title}</h2>
                                        <span>{addComma(a.price)}</span>
                                    </Grid>                                
                                </Fragment>   
                            )
                        })
                    }
                </Grid>      
            </Container>
        </Fragment>
    );
  }

  export default Category;