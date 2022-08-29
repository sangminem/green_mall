/**
 * @desc 상품관리 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import ProductList from "../components/ProductList";
import ProductForm from "./ProductForm";

const ProductMng = () => {
  // 상품정보
  const [productInfo, setProductInfo] = useState({
    product_nm: "",
    product_summary: "",
    item_price: "",
    category: "",
    brand_nm: "",
  });

  const [content, setContent] = useState("");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SERVER_URL = "http://localhost:4000";

  // 처음 렌더링 시 실행
  useEffect(() => {
    getData();
  }, []);

  /**
   * 상품 데이터 DB에 등록
   *
   * @param
   * @return
   */
  const registerItem = function (e) {
    e.preventDefault();

    const url = `${SERVER_URL}/api/register`;

    const formData = new FormData();
    formData.append("productInfo", JSON.stringify(productInfo));
    formData.append("img", content);

    axios
      .post(url, formData)
      .then(function (res) {
        if (res.data.errCode == 0) {
          swal({
            text: "상품정보를 성공적으로 등록했습니다.",
            icon: "success",
            button: "확인",
          });
          setIsModalOpen(false);
          getData();
        } else {
          swal({
            text: "상품정보 등록중 오류가 발생했습니다.",
            icon: "error",
            button: "확인",
          });
        }
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 카테고리별 상품 데이터 가져오기
   *
   * @param {string} categoryId 카테고리ID
   * @return
   */
  const getData = function (categoryId) {
    let url = "";
    if (categoryId) {
      url = `${SERVER_URL}/api/products/${categoryId}`;
    } else {
      url = `${SERVER_URL}/api/products/all`;
    }

    axios
      .get(url)
      .then(function (res) {
        let data = res.data;

        for (let key in data) {
          data[key].image = `${SERVER_URL}/images/` + data[key].image; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        setProducts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 상세정보 가져오기
   *
   * @param {string} categoryId 카테고리ID
   * @return
   */
  const setData = (e) => {
    console.log(e);

    let copy = products.filter((item) => {
      return item.product_nm == 21;
    });

    // setProduct_nm(copy[0].product_nm);
  };

  /**
   * input value 가져오기
   *
   * @param
   * @return
   */
  const getValue = (e) => {
    let { name, value } = e.target;

    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };


  /**
   * 상품 정보 등록/수정 버튼 클릭시
   *
   * @param
   * @return
   */
  const editProduct = () => {
    setIsModalOpen(true);
  }


  return (
    <React.Fragment>
      <Container>
        <Button onClick={editProduct}>
          상품 등록
        </Button>

        <ProductList Button={Button} products={products}/>

        {isModalOpen && (
          <ProductForm
            registerItem={registerItem}
            getValue={getValue}
            setContent={setContent}
            setIsModalOpen={setIsModalOpen}
            getData={getData}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default ProductMng;
