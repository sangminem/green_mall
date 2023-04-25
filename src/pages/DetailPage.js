import React, { useEffect, useState } from "react";
import { Button, Stack, Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import styles from "./../css/detail.module.css";
import Detailinfo from "../components/DetailInfo";
import DeliverylInfo from "../components/deliveryInfo";
import DetailPopup from "../popup/detailPopup";
import ReactHtmlParser from "react-html-parser";
import { db, storage } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import addComma from "../Utils";
import { Skeleton } from "antd";

const DetailPage = () => {
  let { id } = useParams(); // 카테고리 id
  const [productDetail, setProductDetail] = useState({}); // 상품 상세정보 {}

  // 처음 렌더링 시 실행
  useEffect(() => {
    // 매개변수로 id를 넣어줘야 product_id값을 가져갈수 있어서 id를 넣어줘야 해
    getProductDetail(id);
  }, [id]);

  /**
   * 상품 단건 가져오기
   *
   * @param {string}
   * @return
   */
  const getProductDetail = async (idx) => {
    try {
      let docData = {};
      const querySnapshot = await getDoc(doc(db, "TBGM_PRODUCT", idx));
      docData = querySnapshot.data();
      docData['PRODUCT_ID'] = idx;
      setProductDetail(docData);

      const url = await getDownloadURL(ref(storage, 'images/' + idx + '.jpg'));
      setProductDetail({
        ...docData,
        IMAGE: url
      });
    } catch(err) {
      console.log(err);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Container id="wrap">
        <div className="productTitle">
          <Row>
            <Col>
              { productDetail.IMAGE ?
                  <Image
                  style={{
                    width: "100%",
                  }}
                  src={productDetail.IMAGE}
                /> : <div className="square"><Skeleton.Image active={true} style={{ borderRadius: "5px" }} /></div>
              }
            </Col>
          </Row>

          <Stack gap={0}>
            <p>{productDetail.PRODUCT_NM}</p>

            <p>{addComma(productDetail.SALE_PRICE)} 원</p>

            <div className={styles.title}>
              {productDetail.PRODUCT_NM}
              <span>(7일 이내 무상반품)</span>
            </div>

            <div className={styles.price}>
              <s>{addComma(productDetail.SALE_PRICE)}</s> 원
              <sup>{productDetail.DISCOUNTED_RATE}%</sup>
            </div>

            <div className={styles.salePrice}>
              <span>9,900</span>
            </div>
          </Stack>

          <DeliverylInfo />

          <div className="d-grid gap-2">
            <Button variant="secondary" onClick={openModal}>
              구매하기
            </Button>

            <DetailPopup
              open={modalOpen}
              close={closeModal}
              header="장바구니 담기"
              title={productDetail.PRODUCT_NM}
              price={addComma(productDetail.SALE_PRICE)}
            ></DetailPopup>
          </div>

          <Row className={`mt20 mb20 pt20`}>
            <Col sm={2}>
              <strong>상품 정보</strong>
            </Col>

            <Col sm={10}>용량, 수량: 상세정보 내 이미지 참고</Col>
          </Row>
        </div>

        <div className="productInfo">
          <Card>
            <Card.Body>
              {ReactHtmlParser(productDetail.DETAIL_CONTENT)}

              <Detailinfo></Detailinfo>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default DetailPage;
