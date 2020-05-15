import React from "react";
import MainLayout from "../../layouts/Main";
import { breadcrumbsDevices } from "./Devices";
import { Row, Col, Typography, Avatar } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faBus,
  faBicycle,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";
import StatInfo from "./components/StatInfo";
import BarChart from "./components/BarChart";

const { Text } = Typography;

const DeviceDetail = () => {
  return (
    <MainLayout
      back
      selectedKeys={["2"]}
      breadcrumbs={[...breadcrumbsDevices, { name: "#123232", link: "/" }]}
    >
      <Row gutter={16} align="top">
        <Col span={16} style={{ height: 520 }}>
          <img
            src={require("../../assets/image.png")}
            style={{ width: "100%", borderRadius: 10, height: "100%" }}
            alt="ini"
          />
        </Col>
        <Col span={8} style={{ height: 520 }}>
          <div className="flex-between">
            <div>
              <div>
                <Text strong style={{ fontSize: 18 }}>
                  12 January 2020
                </Text>
              </div>
              <div>Tracker ID #1212123</div>
              <div>Jakarta - JL Gudang Peluru No20</div>
              <br />
              <Row gutter={16}>
                <Col>
                  <Text strong>Owner</Text>
                  <div>
                    <Avatar />
                  </div>
                </Col>

                <Col>
                  <Text strong>Members</Text>
                  <div className="members-group">
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                  </div>
                </Col>
              </Row>
            </div>
            <Row gutter={[16, 16]} style={{ margin: "-8px" }}>
              <Col span={12}>
                <StatInfo
                  name="Person"
                  value="1.000"
                  image={<FontAwesomeIcon icon={faWalking} />}
                />
              </Col>

              <Col span={12}>
                <StatInfo
                  name="Car"
                  value="1.000"
                  bgColor="#c70039"
                  image={<FontAwesomeIcon icon={faCar} />}
                />
              </Col>

              <Col span={12}>
                <StatInfo
                  name="Bus"
                  value="1.000"
                  bgColor="#f0a500"
                  image={<FontAwesomeIcon icon={faBus} />}
                />
              </Col>

              <Col span={12}>
                <StatInfo
                  name="Bicycle"
                  value="1.000"
                  bgColor="#fe346e"
                  image={<FontAwesomeIcon icon={faBicycle} />}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <br />
      <div>
        <BarChart title="Total Object Detected" />
        <BarChart title="Peak Hours" />
      </div>
    </MainLayout>
  );
};

export default DeviceDetail;
