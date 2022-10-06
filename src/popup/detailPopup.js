import React, { Component, Fragment, useState } from 'react';
import {Row} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Select } from 'antd';
import './../css/modal.css';
import 'antd/dist/antd.css'; 
import styled from 'styled-components';

const DetailPopup = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, cart } = props;

    //select
    const { Option } = Select;
    const handleChange = (value) => {
    console.log(`selected ${value}`);
    };

    //option-count&price
    const addCount = function(type) {
        count++;

        setCount(count);
        let total = price * count;
        setTotalPrice(total);
    }
    
    const minusCount = function() {
        count--;
    
        setCount(count);
        let total = price * count;
        setTotalPrice(total);
    }
    
    let [price, setPrice] = useState(9000);   // 가격 => 나중에 db에서 가져오는 걸로 수정하기
    let [count, setCount] = useState(1);  // 수량
    let [totalPrice, setTotalPrice] =  useState(9000);  // 총금액

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
            <section>
            <header>
                {header}
                <button className="close" onClick={close}>
                &times;
                </button>
            </header>
            <main>
                <Select defaultValue="disabled" onChange={handleChange}>
                    <Option value="disabled" disabled>[필수] 제품 옵션을 선택해주세요</Option>
                    <Option value="product">product</Option>
                </Select>
                <Select defaultValue="disabled" onChange={handleChange}>
                    <Option value="disabled" disabled>[필수] 택배 옵션을 선택해주세요</Option>
                    <Option value="product">새벽배송</Option>
                    <Option value="product">택배배송</Option>
                </Select>
                <div className='priceBox'>
                    <p className='hidden'>가격: {price}</p>
                    <div>
                        <div className='countBox'>
                            <span className='hidden'>수량:</span>
                            <button onClick={addCount}>+</button>
                            {count}
                            <button onClick={minusCount}>-</button>
                        </div>
                        <p className='totalPrice'>주문 금액 <span>{totalPrice}원</span></p>
                    </div>
                </div>
                
            </main>
            <footer>
                <button className="cart" onClick={cart}>담기</button>
            </footer>
            </section>
        ) : null}
        </div>
    );
};

export default DetailPopup;