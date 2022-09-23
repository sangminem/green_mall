import React, { Component, Fragment } from 'react';
import {Row} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Select, InputNumber } from 'antd';
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

    //InputNumber
    const onChange = (value) => {
        console.log('changed', value);
    };

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
                    <Option value="disabled" disabled>[필수] 옵션을 선택해주세요</Option>
                    <Option value="product">product</Option>
                </Select>
                <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                <p className='price'>주문 금액 <span>165,000원</span></p>
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