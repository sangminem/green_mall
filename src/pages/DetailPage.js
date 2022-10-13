import React, { Component, Fragment, useState } from 'react';
import {Button, Stack, Container, Row, Col, Card, Modal} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import styles from './../css/detail.module.css';
import styled from 'styled-components';
import Detailinfo from '../components/DetailInfo';
import DeliverylInfo from '../components/deliveryInfo';
import DetailPopup from '../popup/detailPopup';

const DetailPage = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('어메이징 원목 침대깔판')
    const [price, setPrice] = useState('70,000')

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
            <Container id='wrap'>
                <div className='productTitle'>
                    <Row>
                        <Col>
                            <Image style={{
                        width: "100%"
                    }} src="/images/detail/detail-product.jpg" />
                        </Col>
                    </Row>
                    <Stack gap={0}>
                        <div className={styles.title}>{title}<span>(7일 이내 무상반품)</span></div>
                        <div className={styles.price}><s>{price}</s><sup>85%</sup></div>
                        <div className={styles.salePrice}><span>9,900</span></div>
                    </Stack>
                    <DeliverylInfo />
                    <div className="d-grid gap-2">
                        <Button variant="secondary" onClick={openModal}>구매하기</Button>
                        <DetailPopup open={modalOpen} close={closeModal} header="장바구니 담기" title={title} price={price}>
                        </DetailPopup>
                    </div>
                    <Row className={`mt20 mb20 pt20`}>
                        <Col sm={2}><strong>상품 정보</strong></Col>
                        <Col sm={10}>용량, 수량: 상세정보 내 이미지 참고</Col>
                    </Row>
                </div>
                <div className='productInfo'>
                    <Card>
                        <Card.Img variant="top" src="/images/detail/detail-product.jpg" />
                        <Image style={{
                        width: "100%"
                    }} src="/images/detail/detail-product.jpg" />
                        <Image style={{
                        width: "100%"
                    }} src="/images/detail/detail-product.jpg" />
                        <Card.Body>
                            <Detailinfo></Detailinfo>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default DetailPage;