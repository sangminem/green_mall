import React, { Component, Fragment } from 'react';
import {Button, Stack, Container, Row, Col} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import styles from './../css/detail.module.css';
import styled from 'styled-components';

let image = styled.img`
    width: 100%;
`
const Detail = () => {
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col className={styles.productBox}>
                        <Image style={{
					width: "60%"
				}} src="/images/detail/detail-product.jpg" />
                    </Col>
                </Row>
                <Stack gap={2}>
                    <div>어메이징 원목 침대깔판 <span>(7일 이내 무상반품)</span></div>
                    <div><s>70,000</s><sup>85%</sup></div>
                    <div>9,900</div>
                </Stack>
                <Row>
                    <Col sm={3}><strong>배송정보</strong></Col>
                    <Col sm={7}>새벽배송: 지금 주문하면 8월 15일(월) 오전 7시 전 도착<br />
                            택배배송: 지금 주문하면 8월 16일(화) 출고 예정</Col>
                </Row>
                <Row>
                    <Col>
                        <ul>
                            <li>출고 및 도착 예정일은 결제 완료 시점 기준으로 산정됩니다.</li>
                            <li>새벽배송 지역의 경우 새벽배송으로 지정배송됩니다.</li>
                            <li>(장바구니에서 배송지 입력 후 확인할 수 있습니다.)</li>
                            <li>새벽배송의 경우 출고일 다음날 오전 7시 전 도착 예정입니다.</li>
                            <li>택배 및 개별배송의 경우 신선식품은 출고 후 다음 날, 상온식품은 1~3일 후 도착 예정입니다. (제주 및 도서산간 지역은 1~2일 추가 소요)</li>   
                            <li>택배사의 사정에 따라 실제 도착일은 다를 수 있습니다.</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}><strong>배송비</strong></Col>
                    <Col sm={7}><p>3,000원 (5만원 이상 구매 시 무료)</p></Col>
                </Row>
                <Row>
                    <Col>
                        <ul>
                            <li>배송 상품 5만원 이상 주문 시 무료배송입니다. (단, 무료배송 상품 금액 제외)</li>
                            <li>택배 및 개별배송의 경우 제주 및 도서산간 지역의 배송비가 추가될 수 있습니다.</li>
                        </ul>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg">구매하기</Button>
                </div>
                <Row>
                    <Col><strong>상품 정보</strong></Col>
                </Row>
                <Row>
                    <Col sm={3}>용량, 수량</Col>
                    <Col sm={7}>상세정보 내 이미지 참고</Col>
                    <Col sm={3}>보관방법</Col>
                    <Col sm={7}>수령 후 즉시 냉동 보관</Col>
                    <Col sm={3}>유통기한</Col>
                    <Col sm={7}>아래 상세정보 참조</Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default Detail;