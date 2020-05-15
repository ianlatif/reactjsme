import React from "react";
import { CardDeviceWrapper } from "../styles";
import { Typography, Col, Row, Dropdown, Button, Menu } from "antd";
import {
  CheckCircleTwoTone,
  VideoCameraTwoTone,
  CloseCircleTwoTone,
  MoreOutlined,
  VideoCameraOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { PREFIX } from "../../../config/api";
import { Link } from "react-router-dom";

const { Text } = Typography;

const CardDevice = (props: any) => {
  const menu = (id: number) => {
    return (
      <Menu>
        <Menu.Item>
          <Link to={`${PREFIX}/devices/${id}/deactive`}>
            <MinusCircleOutlined /> Deactive
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`${PREFIX}/devices/${id}`}>
            <VideoCameraOutlined /> Detail
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <CardDeviceWrapper
      className="employee-list"
      cover={
        <img src={require("../../../assets/image.png")} alt="ini beruang" />
      }
    >
      <div className="employee-action">
        <Dropdown overlay={() => menu(1)} placement="bottomRight">
          <Button
            ghost
            type="link"
            icon={<MoreOutlined style={{ color: "#fff", fontSize: 22 }} />}
            shape="circle"
          />
        </Dropdown>
      </div>
      <div>
        <Text strong>23 April 2020</Text>
      </div>
      <div>Jakarta - JL Gudang Peluru RT02/11</div>
      <br />
      <Row justify="space-between" align="bottom">
        <Col>
          <Text>
            <VideoCameraTwoTone style={{ fontSize: 20 }} />
          </Text>
        </Col>
        <Col style={{ lineHeight: 1.2, textAlign: "right" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {props.qc ? (
              <CheckCircleTwoTone />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
            )}{" "}
            Tracker ID
          </Text>
          <br />
          <Text strong style={{ fontSize: 20 }}>
            #12323
          </Text>
        </Col>
      </Row>
    </CardDeviceWrapper>
  );
};

export default CardDevice;
