import React from "react";
import MainLayout from "../../layouts/Main";
import CardDevice from "./components/CardDevice";
import { List } from "antd";

export const breadcrumbsDevices = [
  {
    name: "Devices",
    link: "/devices",
  },
];

const Devices = () => {
  return (
    <MainLayout selectedKeys={["2"]} breadcrumbs={breadcrumbsDevices}>
      <List
        grid={{ gutter: 16, sm: 1, md: 4 }}
        dataSource={[{ qc: false }, { qc: true }, { qc: true }, { qc: false }]}
        renderItem={(item) => (
          <List.Item>
            <CardDevice {...item} />
          </List.Item>
        )}
      />
    </MainLayout>
  );
};

export default Devices;
