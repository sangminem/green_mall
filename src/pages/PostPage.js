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
import { Row, Col, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IoHeartOutline } from "react-icons/io5";

// 카테고리 페이지
const CategoryPage = () => {
  const { id } = useParams(); // 카테고리 id
  const [products, setProducts] = useState([]); // 상품 리스트 []
  const [productCnt, setProductCnt] = useState(0); // 상품 갯수 number
  const [selected, setSelected] = useState("낮은가격순"); // 선택 정렬옵션
  const [cateTitle, setCateTitle] = useState("")    // 카테고리별 제목

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
          data[key].image = `${SERVER_URL}/images/` + data[key].image; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        // 상품의 카테고리와 useParam의 id가 일치하는 리스트만 담기
        let copy = data.filter((item) => {
          return item.category === id;
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
          return parseFloat(a.item_price) - parseFloat(b.item_price);
        });
        setSelected("낮은가격순");
        break;
      case 2:
        copy.sort((a, b) => {
          return parseFloat(b.item_price) - parseFloat(a.item_price);
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

      switch(id) {
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
                  {a.image !== "" ? (
                    <img
                      src={a.image}
                      alt=""
                      style={{ width: "100%", borderRadius: "12px" }}
                    />
                  ) : (
                    ""
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                      margin: "10px 0 6px",
                      color: "#555",
                    }}
                  >
                    {a.brand_nm}
                  </p>
                  <h4 style={{ fontSize: "14px" }}>{a.product_nm}</h4>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#27ae60",
                    }}
                  >
                    {addComma(a.item_price)} 원
                  </span>
                  <button
                    style={{ border: 0, background: "none", fontSize: "13px" }}
                  >
                    <IoHeartOutline /> 0
                  </button>
                </Col>
              </Fragment>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default CategoryPage;
