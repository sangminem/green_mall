import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Input, Form, message } from "antd";
import axios from "axios";

const SignupPage = () => {
  const SERVER_URL = "http://localhost:4000";

  // 회원가입 input
  const [userForm, setUserForm] = useState({
    email_id: "",
    user_nm: "",
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

    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const signup = (e) => {
    e.preventDefault();

    const url = `${SERVER_URL}/api/signup`;

    axios
      .post(url, userForm)
      .then(function (res) {
        if (res.data.errCode == 0) {
          message.success({
            content: "회원가입 성공",
            className: "custom-class",
          });
        } else {
          message.error({
            content: "회원가입 실패",
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
        <p className="tit-lg">회원가입</p>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="이메일">
            <Input
              name="email_id"
              placeholder="이메일을 입력하세요"
              onChange={getValue}
            />
          </Form.Item>
          <Form.Item label="이름">
            <Input
              name="user_nm"
              placeholder="이름을 입력하세요"
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
          <Button type="primary" onClick={signup}>
            회원가입
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default SignupPage;
