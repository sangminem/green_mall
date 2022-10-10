import React, { Fragment, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Layout, Drawer, Row, Col, Divider } from "antd";
import {
  IoMenuSharp,
  IoHappyOutline,
  IoChevronBackSharp,
  IoCartOutline,
} from "react-icons/io5";
const { Header } = Layout;

const FixedHeader = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
          <p onClick={() => navigate("/login")}>로그인이 필요해요</p>
          <p onClick={() => navigate("/")}>홈</p>
          <Divider orientation="left">카테고리</Divider>
          <p onClick={() => navigate("/category/furniture")}>가구</p>
          <p onClick={() => navigate("/category/plant")}>식물/데코</p>
          <p onClick={() => navigate("/category/pet")}>반려동물</p>
          <Divider orientation="left">관리자 전용</Divider>
          <p onClick={() => navigate("/productMng")}>상품관리h</p>
          <Divider orientation="left"></Divider>
          <p
            onClick={() => navigate("/productMng")}
            style={{ fontSize: "14px", color: "#777" }}
          >
            로그아웃
          </p>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default FixedHeader;
