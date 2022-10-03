/**
 * @desc 상품 카테고리 페이지
 * @author hy
 * @since 2022.08.23
 */

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import addComma from "../Utils.js";
import { Container } from "react-bootstrap";
import { Row, Col, Dropdown, Menu, Space, Modal, Tag, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IoHeartOutline } from "react-icons/io5";

// 카테고리 페이지
const CategoryPage = () => {
  let { id } = useParams(); // 카테고리 id
  let [products, setProducts] = useState([]); // 상품 리스트 []
  let [productCnt, setProductCnt] = useState(0); // 상품 갯수 number
  let [selected, setSelected] = useState("낮은가격순"); // 선택 정렬옵션
  let [cateTitle, setCateTitle] = useState(""); // 카테고리별 제목
  let [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈
  let [price, setPrice] = useState(9000); // 가격
  let [count, setCount] = useState(1); // 수량
  let [totalPrice, setTotalPrice] = useState(9000); // 총금액

  // 정렬 드롭다운 메뉴
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a href="javascript:void(0)" onClick={() => itemSort(1)}>
              낮은가격순
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a href="javascript:void(0)" onClick={() => itemSort(2)}>
              높은가격순
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a href="javascript:void(0)" onClick={() => itemSort(3)}>
              최신순
            </a>
          ),
        },
      ]}
    />
  );

  useEffect(() => {
    getData();
    pageTitle(id);
  }, [id]);

  const SERVER_URL = "http://localhost:4000";

  /**
   * 상품 카테고리 리스트 조회
   */
  const getData = function () {
    const url = `${SERVER_URL}/api/products`;

    axios
      .get(url)
      .then(function (res) {
        let data = res.data;

        for (let key in data) {
          data[key].IMAGE = `${SERVER_URL}/images/` + data[key].IMAGE; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        // 상품의 카테고리와 useParam의 id가 일치하는 리스트만 담기
        let copy = data.filter((item) => {
          return item.CATEGORY === id;
        });

        setProducts(copy);
        setProductCnt(copy.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 정렬 기능
   * @param sort_type (1: 낮은가격순, 2: 높은가격순, 3:최신순)
   */
  const itemSort = function (sort_type) {
    let copy = [...products];

    switch (sort_type) {
      case 1:
        copy.sort((a, b) => {
          return parseFloat(a.SALE_PRICE) - parseFloat(b.SALE_PRICE);
        });
        setSelected("낮은가격순");
        break;
      case 2:
        copy.sort((a, b) => {
          return parseFloat(b.SALE_PRICE) - parseFloat(a.SALE_PRICE);
        });
        setSelected("높은가격순");
        break;
      default:
        console.log("default case");
        break;
    }

    setProducts(copy);
  };

  /**
   * 카테고리별 제목 추가
   * @param
   */
  const pageTitle = function (id) {
    let title = "";

    switch (id) {
      case "furniture":
        title = "🛋가구";
        break;
      case "plant":
        title = "🪴식물/데코";
        break;
      default:
        break;
    }

    setCateTitle(title);
  };

  /**
   * 장바구니 모달
   * @param
   */
  const showModal = function (props) {
    setIsModalOpen(true);

    console.log("props", props);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setLocalItem();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * 장바구니 수량 계산
   * @param
   */
  const calcCount = function (type) {
    if (type === 1) {
      count++;
    } else {
      count--;
    }

    setCount(count);
    let total = price * count;
    setTotalPrice(total);
  };

  /**
   * 로컬스토리지에 담기
   * @param
   */
  const setLocalItem = function () {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }

    let newItem = localStorage.getItem("cart");
    newItem = JSON.parse(newItem);

    newItem.push({ count: count });

    localStorage.setItem("cart", JSON.stringify(newItem));
  };

  return (
    <Fragment>
      <Container>
        <p className="tit-lg">{cateTitle}</p>
        <div className="flex">
          <span>총 {productCnt} 개</span>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a href="javascript:void(0)">
              <Space>
                {selected}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Row gutter={24}>
          {products.map((a, i) => {
            return (
              <Fragment key={i}>
                <Col span={12} style={{ margin: "18px 0" }}>
                  {a.IMAGE !== "" ? (
                    <img
                      src={a.IMAGE}
                      alt=""
                      style={{ width: "100%", borderRadius: "12px" }}
                    />
                  ) : (
                    ""
                  )}
                  <p style={{ marginTop: "16px", fontSize: "14px" }}>{a.PRODUCT_NM}</p>
                  <p style={{fontSize: "12px"}}>
                    <span style={{ color: "#27ae60", fontWeight: 700, marginRight: "5px" }}>
                      {a.DISCOUNTED_RATE}%
                    </span>
                    <del style={{color: "#999", fontSize: "13px"}}>{addComma(a.SALE_PRICE)} 원</del>
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    {addComma(a.SALE_PRICE * a.DISCOUNTED_RATE / 100)} 원
                  </p>
                  <Tag color="blue">{a.DELIVERY_DVSN}</Tag>
                  <button
                    style={{ border: 0, background: "none", fontSize: "13px" }}
                  >
                    <IoHeartOutline /> 0
                  </button>
                  <button onClick={() => showModal(a)}>장바구니</button>
                </Col>
              </Fragment>
            );
          })}
        </Row>
      </Container>
      <Modal
        title="장바구니 담기"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>상품명: </p>
        <p>가격: {price}</p>
        <button
          onClick={() => {
            calcCount(1);
          }}
        >
          +
        </button>
        <p>수량: {count}</p>
        <button
          onClick={() => {
            calcCount(2);
          }}
        >
          -
        </button>

        <p>총금액: {totalPrice}</p>
      </Modal>
    </Fragment>
  );
};

export default CategoryPage;
