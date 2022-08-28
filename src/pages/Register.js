/**
 * @desc 상품정보 등록 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

const Register = () => {
  // 상품정보 
  const [productInfo, setProductInfo] = useState({
    product_nm: "",
    product_summary: "",
    item_price: "",
    category: "",
    brand_cd: "",
    brand_nm: "",
  });

  const [content, setContent] = useState("");
  const [products, setProducts] = useState([]);

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
        swal({
          text: "서버 접속중 오류가 발생했습니다.",
          icon: "error",
          button: "확인",
        });
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
        swal({
          text: "서버 접속중 오류가 발생했습니다.",
          icon: "error",
          button: "확인",
        });
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
    let tag = e.currentTarget;

    let copy = products.filter((item) => {
      return item.product_id == 21;
    });

    console.log(copy[0].product_nm);

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

  return (
    <React.Fragment>
      <Container>
        <Button
          onClick={() => {
            console.log("");
          }}
        >
          상품 등록
        </Button>
        {/* 상품 리스트  */}
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>이미지</th>
                <th>상품명</th>
                <th>상품가격</th>
                <th>카테고리</th>
              </tr>
            </thead>
            <tbody>
              {products.map((a, i) => {
                return (
                  <React.Fragment key={i}>
                    <tr
                      onClick={(e) => {
                        setData(e);
                      }}
                    >
                      <td>
                        {a.image !== "" ? (
                          <img
                            src={a.image}
                            alt=""
                            style={{ width: "60px", borderRadius: "12px" }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{a.product_nm}</td>
                      <td>{a.item_price}</td>
                      <td>{a.category}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 상품 등록  */}
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>브랜드명</Form.Label>
            <Form.Control type="text" name="brand_nm" onChange={getValue} />
            <Form.Label>브랜드코드</Form.Label>
            <Form.Control type="text" name="brand_cd" onChange={getValue} />
            <Form.Label>상품명</Form.Label>
            <Form.Control type="text" name="product_nm" onChange={getValue} />
            <Form.Label>판매가격</Form.Label>
            <Form.Control type="number" name="item_price" onChange={getValue} />
            <Form.Label>상품설명</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              name="product_summary"
              onChange={getValue}
            />
          </Form.Group>
          <Form.Select name="category" onChange={getValue}>
            <option>카테고리</option>
            <option value="furniture">가구</option>
            <option value="plant">식물/데코</option>
            <option value="interior">인테리어</option>
          </Form.Select>

          <Form.Label>상품대표이미지</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setContent(e.target.files[0])}
          />

          <Button onClick={registerItem} style={{ margin: "16px 0" }}>
            상품 등록
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default Register;
