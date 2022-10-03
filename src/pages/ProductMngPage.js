/**
 * @desc 상품관리 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Button, Input, Select, Form, Radio, Modal } from "antd";
import swal from "sweetalert";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import addComma from "../Utils";
const { Option } = Select;

const ProductMngPage = () => {
  const SERVER_URL = "http://localhost:4000";

  // 상품 리스트 []
  const [productList, setProductList] = useState([]);

  // 상품 상세정보 {}
  const [productDetail, setProductDetail] = useState({
    category: "",
    product_nm: "",
    sale_price: "",
    discounted_rate: "",
    delivery_dvsn: "",
    detail_content: "",
  });

  const [img, setImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 처음 렌더링 시 실행
  useEffect(() => {
    getProductList();
  }, []);

  /**
   * 상품 리스트 가져오기
   *
   * @param {string} categoryId 카테고리ID
   * @return
   */
  const getProductList = function () {
    const url = `${SERVER_URL}/api/products`;

    axios
      .get(url)
      .then(function (res) {
        let data = res.data;

        for (let key in data) {
          data[key].IMAGE = `${SERVER_URL}/images/` + data[key].IMAGE; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        setProductList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 상세정보 가져오기
   *
   * @param {string}
   * @return
   */
  const getProductDetail = (idx) => {
    const url = `${SERVER_URL}/api/products/detail`;
    const data = {
      product_id: idx, // product_id 로 상품 상세정보 조회
    };

    axios
      .post(url, data)
      .then(function (res) {
        let data = res.data;

        data.IMAGE = `${SERVER_URL}/images/` + data.IMAGE;

        setProductDetail(data);

        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 상세정보 등록
   *
   * @param
   * @return
   */
  const registerItem = function (e) {
    e.preventDefault();

    const url = `${SERVER_URL}/api/register`;

    const formData = new FormData();
    formData.append("productDetail", JSON.stringify(productDetail));
    formData.append("img", img);

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
          getProductList();
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
   * input value 가져오기
   *
   * @param
   * @return
   */
  const getValue = (e) => {
    let { name, value } = e.target;

    setProductDetail({
      ...productDetail,
      [name]: value,
    });

    console.log(productDetail);
  };

  // 상품 등록/수정 버튼 클릭시
  const editProduct = (idx) => {
    setIsModalOpen(true);

    if (typeof idx == "number") {
      getProductDetail(idx);

      console.log("수정");
    } else {
      setProductDetail({
        category: "",
        product_nm: "",
        sale_price: "",
        discounted_rate: "",
        delivery_dvsn: "",
        detail_content: "",
      });
      console.log("등록");
    }

    console.log(productDetail);
  };

  // 이미지 업로드시 이미지 프리뷰
  const onChangeImage = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg(reader.result);

        resolve();
      };
    });
  };

  return (
    <Fragment>
      <Container>
        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <Button type="primary" onClick={editProduct}>
            상품 등록
          </Button>
        </div>

        <ProductList
          productList={productList}
          Button={Button}
          addComma={addComma}
          editProduct={editProduct}
        />

        <Modal
          title="상품 등록"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
          footer={[
            <Button type="primary" key="submit" onClick={registerItem}>
              등록
            </Button>,
          ]}
        >

          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
            autoComplete="off"
          >
            <Form.Item label="카테고리">
              <Radio.Group
                name="category"                
                onChange={getValue}                
              >
                <Radio value="furniture">가구</Radio>
                <Radio value="plant">식물/데코</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="상품명">
              <Input
                name="product_nm"                
                onChange={getValue}
              />
            </Form.Item>
            <Form.Item label="대표이미지">
              {previewImg ? (
                <img
                  src={previewImg}
                  style={{ width: "120px", border: "1px solid #ccc" }}
                  alt=""
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/noimg2.png"}
                  alt=""
                  style={{ width: "120px", border: "1px solid #ccc" }}
                />
              )}

              <Input
                type="file"                
                onChange={(e) => {
                  onChangeImage(e.target.files[0]);
                  setImg(e.target.files[0]);
                }}
              />
            </Form.Item>
            <Form.Item label="상품가격">
              <Input
                name="sale_price"
                type="number"                
                onChange={getValue}
              />
            </Form.Item>
            <Form.Item label="할인율">
              <Input
                name="discounted_rate"
                type="number"                
                onChange={getValue}
              />
            </Form.Item>
            <Form.Item label="배송구분">
              <Radio.Group
                name="delivery_dvsn"                
                onChange={getValue}
              >
                <Radio value="일반배송">일반배송</Radio>
                <Radio value="새벽배송">새벽배송</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default ProductMngPage;
