import React from "react";
import { DeviceWrapper } from "../style";
import { Row, Col, Button, Typography, Checkbox } from "antd";
import {
  VideoCameraFilled,
  UsergroupAddOutlined,
  AimOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { DevicesProps } from "../type";

const { Text } = Typography;

const Devices = (props: DevicesProps) => {
  return (
    <DeviceWrapper shadow={props.shadow}>
      <Row justify="space-between" align="middle">
        <Col className="flex-center">
          <span>
            <Button shape="circle" type={props.status ? "primary" : "default"}>
              <VideoCameraFilled />
            </Button>
          </span>
          <span>
            <div>
              <Text strong>Device A</Text>
            </div>
            <Text type="secondary">04 Maret 2020</Text>
          </span>
        </Col>
        <Col>{props.status ? "ON" : "OFF"}</Col>
        {!props.small ? (
          <>
            <Col className="flex-top">
              <Text>
                <HomeOutlined />
              </Text>
              <Text>
                <Text>Jakarta Selatan</Text>
                <br />
                JL Gudang Peluru RT02/11 No.160
              </Text>
            </Col>
            <Col>
              <AimOutlined /> 1,233
            </Col>
            <Col>
              <UsergroupAddOutlined /> 2 Sub Users
            </Col>
          </>
        ) : (
          <Col>
            <Checkbox />
          </Col>
        )}
      </Row>
    </DeviceWrapper>
  );
};

export default Devices;
