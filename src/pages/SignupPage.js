import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Button, Input, Form, Modal } from "antd";

const SignupPage = () => {
  return (
    <React.Fragment>
      <Container>
        <p className="tit-lg">회원가입</p>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="이메일">
            <Input name="email_id" placeholder="이메일을 입력하세요" />
          </Form.Item>
          <Form.Item label="이름">
            <Input name="user_nm" placeholder="이름을 입력하세요"/>
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input name="password" placeholder="비밀번호를 입력하세요"/>
          </Form.Item>
          <Button type="primary">회원가입</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default SignupPage;
