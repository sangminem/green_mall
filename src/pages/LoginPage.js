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

  let [loginYn, setLoginYn] = useState(false);
  let [loginId, setLoginId] = useState("");

  useEffect(() => {
    if(sessionStorage.getItem("userInfo")) {
      setLoginYn(true);

      let userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
      setLoginId(userinfo.USER_NM);
    }
  }, [])

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
        if (res.data) {
          message.success({
            content: "로그인 성공",
            className: "custom-class",
          });

          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
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
        {loginYn ? (
          <p> {loginId} 님 환영합니다!</p>
        ) : (
          <div style={{ width: "450px" }}>
            <p className="tit-lg">로그인</p>
            <Input
              name="email_id"
              placeholder="아이디를 입력하세요"
              onChange={getValue}
              style={{ marginBottom: "12px" }}
              size="large"
            />
            <Input
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={getValue}
              style={{ marginBottom: "12px" }}
              size="large"
            />
            <Button
              size="large"
              type="primary"
              onClick={login}
              style={{ width: "450px" }}
            >
              로그인
            </Button>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
