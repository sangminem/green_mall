import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from './../css/detail.module.css';

const DeliverylInfo = () => {
    //date
    const date = new Date();
    const am = new Date(date.setDate(date.getDate()+1)); //새벽배송
    const pm = new Date(date.setDate(date.getDate()+2)); //택배배송

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ['일','월','화','수','목','금','토'];
    let dayOfWeek = week[date.getDay()];
    let amOfWeek = week[am.getDay()];
    let pmOfWeek = week[pm.getDay()];
    
    console.log('date: ' + date.toLocaleDateString('ko-kr'));
    console.log('year: ' + year);
    console.log('month: ' + month);
    console.log('day: ' + day);
    console.log('week: ' + dayOfWeek);
    console.log('tomorrow: ' + amOfWeek);
    console.log('2 days later: ' + pmOfWeek);

    return (
        <React.Fragment>
            <Row className={`mt20 mb20 pt20 ${styles.delivery}`}>
                <Col sm={2}><strong>배송비</strong></Col>
                <Col sm={10}>3,000원 (5만원 이상 구매 시 무료)</Col>
                <Col sm={12}>
                    <ul>
                        <li>배송 상품 5만원 이상 주문 시 무료배송입니다. (단, 무료배송 상품 금액 제외)</li>
                        <li>택배 및 개별배송의 경우 제주 및 도서산간 지역의 배송비가 추가될 수 있습니다.</li>
                    </ul>
                </Col>
            </Row>
            <Row className={`mt20 mb20 pt20 ${styles.delivery}`} >
                <Col sm={2}><strong>배송정보</strong></Col>
                <Col sm={10}>새벽배송: 지금 주문하면 {month}월 {day+2}일({amOfWeek}) 오전 7시 전 도착<br />
                        택배배송: 지금 주문하면 {month}월 {day+1}일({dayOfWeek}) 출고 예정</Col>
            </Row>
        </React.Fragment>
    );
}

export default DeliverylInfo;