/**
 * @desc 상품 리스트 화면
 * @author hy
 * @since 2022.08.23
 */

import React, { useEffect, useState } from "react";
import addComma from "../Utils.js";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { Skeleton } from "antd";

const ListPage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  /**
   * 상품 리스트 호출
   */
  const getData = async function () {
    try {
      let dataList = [];
      let docData = {};
      const querySnapshot = await getDocs(collection(db, "TBGM_PRODUCT"));
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        docData = doc.data();
        docData['PRODUCT_ID'] = doc.id;
        dataList.push(docData);
      });
      setProductList(dataList);
      for(let i=0; i<dataList.length; i++) {
        try{
          const url = await getDownloadURL(ref(storage, 'images/' + dataList[i]['PRODUCT_ID'] + '.jpg'));
          dataList[i]['IMAGE'] = url;
        } catch(err) {
          dataList[i]['IMAGE'] = '/noimg.jpg';
        }
        setProductList([...dataList]);
      }
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * 상품 정렬 기능
   */
  const itemSort = function (gubun) {
    let prdCopy = [...productList];

    if (gubun === "low") {
      // 낮은 가격순 정렬
      prdCopy.sort((a, b) => {
        return parseFloat(a.SALE_PRICE) - parseFloat(b.SALE_PRICE);
      });
    } else {
      // 높은 가격순 정렬
      prdCopy.sort((a, b) => {
        return parseFloat(b.SALE_PRICE) - parseFloat(a.SALE_PRICE);
      });
    }

    setProductList(prdCopy);
  };

  return (
    <React.Fragment>
      <Container>
        <DropdownButton id="dropdown-basic-button" title="정렬">
          <Dropdown.Item onClick={() => itemSort("low")}>
            낮은 가격순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => itemSort("high")}>
            높은 가격순
          </Dropdown.Item>
        </DropdownButton>
        <Row>
          {productList.map((a, i) => {
            return (
              <React.Fragment key={i}>
                <Col xs={6} style={{ margin: "18px 0", padding: "0 15px" }}>
                  <Link to={`/detail/${a.PRODUCT_ID}`}>
                  {a.IMAGE ?
                    <img
                      src={a.IMAGE}
                      alt=""
                      style={{ width: "100%", borderRadius: "12px" }}
                    /> : <div className="square"><Skeleton.Image active={true} style={{ borderRadius: "5px" }} /></div> }
                    <p
                      style={{
                        fontSize: "12px",
                        margin: "10px 0 6px",
                        color: "#555",
                      }}
                    >
                      {a.CATEGORY}
                    </p>
                    <h4 style={{ fontSize: "14px" }}>{a.PRODUCT_NM}</h4>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#27ae60",
                      }}
                    >
                      {addComma(a.SALE_PRICE)} 원
                    </span>
                    <button
                      style={{
                        border: 0,
                        background: "none",
                        fontSize: "13px",
                      }}
                    >
                      <IoHeartOutline /> 0
                    </button>
                  </Link>
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ListPage;
