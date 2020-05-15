import React from "react";
import { useHistory } from "react-router";
import {
  Layout,
  Menu,
  Row,
  Col,
  Avatar,
  Dropdown,
  message,
  Breadcrumb,
} from "antd";
import { Link } from "react-router-dom";
import { PREFIX } from "../config/api";
import { useDispatch } from "react-redux";
import { loginProtected } from "../containers/Login/action";
import {
  TeamOutlined,
  AreaChartOutlined,
  ArrowLeftOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import Get from "../action/get";
import Axios from "axios";

const { Header, Content, Sider } = Layout;

interface Breadcrumbs {
  name: string;
  link: string;
}

interface Props {
  children: React.ReactElement[] | React.ReactElement;
  back?: boolean;
  twoColumn?: boolean;
  disableHeader?: boolean;
  selectedKeys: string[];
  breadcrumbs: Breadcrumbs[];
}

function MainLayout(props: Props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    message.info("Logout...");
    Get(
      {
        url: "/auth/logout",
      },
      () => {
        Axios.defaults.headers.common["Authorization"] = "";
        dispatch(loginProtected());
      }
    );
  };
  const menu = () => {
    return (
      <Menu>
        <Menu.Item onClick={onLogout}>Logout</Menu.Item>
      </Menu>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={240}
        style={{ backgroundColor: "#1da7d6" }}
      >
        <div className="logo">
          <img
            src={require("../assets/logoSecondary.png")}
            alt="logo adroady"
            width={150}
          />
        </div>
        <Menu
          style={{ backgroundColor: "#1da7d6", color: "#fff" }}
          mode="inline"
          className="menu"
          selectedKeys={props.selectedKeys}
        >
          <Menu.Item key="1">
            <Link to={`${PREFIX}/partner`}>
              <SolutionOutlined />
              <span className="nav-text">Partner</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`${PREFIX}/users`}>
              <TeamOutlined />
              <span className="nav-text">User</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link
              to={`${PREFIX}/devices`}
              style={{
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              <AreaChartOutlined />
              <span className="nav-text">Device</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {!props.disableHeader && (
          <Header style={{ background: "transparent", padding: "0 24px" }}>
            <Row justify="space-between" gutter={16}>
              <Col></Col>
              <Col>
                <Dropdown overlay={menu}>
                  <Avatar style={{ cursor: "pointer" }} />
                </Dropdown>
              </Col>
            </Row>
          </Header>
        )}

        {props.twoColumn ? (
          <Content className="user-bg-white">
            <Row gutter={16}>
              <Col sm={24} md={16}>
                <div className="two-column-children column-bg-white">
                  <div
                    style={{
                      maxWidth: "1050px",
                      margin: "0 auto",
                    }}
                  >
                    {Array.isArray(props.children) && props.children[0]}
                  </div>
                </div>
              </Col>
              <Col sm={24} md={8}>
                <div
                  className="two-column-children"
                  style={{
                    maxWidth: "400px",
                  }}
                >
                  {Array.isArray(props.children) && props.children[1]}
                </div>
              </Col>
            </Row>
          </Content>
        ) : (
          <Content
            style={{
              margin: "auto",
              maxWidth: "1050px",
              width: "100%",
              padding: 20,
            }}
          >
            {props.back && (
              <div style={{ marginBottom: 20 }}>
                <ArrowLeftOutlined onClick={() => history.goBack()} />
              </div>
            )}
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              {props.breadcrumbs.map((data) => (
                <Breadcrumb.Item key={data.name}>
                  <Link to={data.link}>{data.name}</Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <br />
            {props.children}
          </Content>
        )}
      </Layout>
    </Layout>
  );
}

export default MainLayout;
