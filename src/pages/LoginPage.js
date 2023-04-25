import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Input, message } from "antd";
import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const LoginPage = () => {
  // 회원가입 input
  const [loginForm, setLoginForm] = useState({
    email_id: "",
    password: "",
  });

  let [loginYn, setLoginYn] = useState(false);
  let [loginId, setLoginId] = useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // ...
      // console.log(uid);
      if(!loginYn) {
        setLoginId(user.email);
        setLoginYn(true);
      }
    } else {
      // User is signed out
      // ...
      // console.log("signed out");
      if(loginYn) {
        setLoginId("");
        setLoginYn(false);
      }
    }
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

    signInWithEmailAndPassword(auth, loginForm["email_id"], loginForm["password"])
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        // console.log(user);
        message.success({
          content: "로그인 성공",
          className: "custom-class",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if(errorCode === "auth/user-not-found") {
          if(window.confirm("가입 내역이 없습니다. 가입하시겠습니까?")) {
            createUserWithEmailAndPassword(auth, loginForm["email_id"], loginForm["password"])
              .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                // ...
                // console.log(user);
                message.success({
                  content: "가입 성공",
                  className: "custom-class",
                });
                navigate("/");
              })
              .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log(errorCode, errorMessage);
                // ..
                message.success({
                  content: "가입 실패",
                  className: "custom-class",
                });
              });
          }
        } else {
          message.success({
            content: "로그인 실패",
            className: "custom-class",
          });
        }
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
