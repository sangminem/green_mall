import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Drawer, Row, Col, Divider, message } from "antd";
import { IoMenuSharp, IoCartOutline } from "react-icons/io5";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
const { Header } = Layout;

const FixedHeader = () => {
  const [open, setOpen] = useState(false);
  let [loginYn, setLoginYn] = useState(false);
  let [loginId, setLoginId] = useState("");

  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const _signOut = () => {
    signOut(auth).then(() => {
      message.success({
        content: "로그아웃 성공",
        className: "custom-class",
      });
      onClose();
      navigate("/");
    }).catch((err) => {
      message.success({
        content: "로그아웃 실패",
        className: "custom-class",
      });
    });
  }

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

  return (
    <Fragment>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "700px",
          background: "#fff",
        }}
      >
        <Row>
          <Col span={8}>
            <span onClick={showDrawer}>
              <IoMenuSharp style={{ fontSize: "24px" }} />
            </span>
          </Col>
          <Col span={8} style={{ textAlign: "center", fontWeight: "500" }}>
            <h4 style={{ fontSize: "15px" }} onClick={() => navigate("/")}>
              GREEN MALL
            </h4>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <IoCartOutline style={{ fontSize: "24px" }} />
          </Col>
        </Row>
      </Header>
      <Drawer
        title="GREEN MALL"
        placement={"left"}
        width={380}
        onClose={onClose}
        open={open}        
      >
        <div className="g-menu">
          {
            loginYn ? <p onClick={() => {navigate("/mypage"); setOpen(false);}}>{loginId} 님 환영해요!</p>
            : <p onClick={() => {navigate("/login"); setOpen(false);}}>로그인이 필요해요</p>
          }          
          <p onClick={() => {navigate("/"); setOpen(false);} }>홈</p>
          <Divider orientation="left">카테고리</Divider>
          <p onClick={() => {navigate("list"); setOpen(false);} }>전체</p>
          <p onClick={() => {navigate("/category/furniture"); setOpen(false);}}>가구</p>
          <p onClick={() => {navigate("/category/plant"); setOpen(false);}}>식물/데코</p>
          <p onClick={() => {navigate("/category/pet"); setOpen(false);}}>반려동물</p>
          {
            loginYn ?
            <>
              <Divider orientation="left">관리자 전용</Divider>
              <p onClick={() => {navigate("/productMng"); setOpen(false);}}>상품관리</p>
              <Divider orientation="left"></Divider>
              <p
                onClick={_signOut}
                style={{ fontSize: "14px", color: "#777" }}
              >
                로그아웃
              </p>
            </> : null
          }
        </div>
      </Drawer>
    </Fragment>
  );
};

export default FixedHeader;
