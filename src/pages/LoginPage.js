import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Input, Form, message } from "antd";
import axios from "axios";

const LoginPage = () => {
  const SERVER_URL = "http://localhost:4000";

  // 회원가입 input
  const [loginForm, setLoginForm] = useState({
    email_id: "",    
    password: "",
  });

  /**
   * input value 가져오기
   *
   * @param
   * @return
   */
  const getValue = (e) => {
    let { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    const url = `${SERVER_URL}/api/login`;

    axios
      .post(url, loginForm)
      .then(function (res) {
        if (res.data.errCode == 0) {
          message.success({
            content: "로그인 성공",
            className: "custom-class",
          });
        } else {
          message.error({
            content: "로그인 실패",
            className: "custom-class",
          });
        }
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <p className="tit-lg">로그인</p>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="이메일">
            <Input
              name="email_id"
              placeholder="이메일을 입력하세요"
              onChange={getValue}
            />
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={getValue}
            />
          </Form.Item>
          <Button type="primary" onClick={login}>
            로그인
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
