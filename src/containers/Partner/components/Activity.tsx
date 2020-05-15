import React from "react";
import styled from "styled-components";
import { Typography, Avatar } from "antd";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const ActivityWrapper = styled.div`
  display: flex;
  padding: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const ActivityRequestWrapper = styled.div`
  background-color: #52de97;
  color: #fff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: calc(100% - 10px);
  margin: -10px auto 0;
  display: flex;
  padding: 20px;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

function ActivityRequest() {
  const history = useHistory();
  const onClick = () => {
    history.push("/dashboard/pengajuan");
  };

  return (
    <ActivityRequestWrapper onClick={onClick}>
      <Avatar
        size={64}
        icon="unordered-list"
        style={{ backgroundColor: "#fff", color: "#52de97" }}
      />
      <Title
        level={4}
        style={{ marginLeft: 20, marginBottom: 0, color: "#fff" }}
      >
        Create Submission
      </Title>
    </ActivityRequestWrapper>
  );
}

function Activity() {
  return (
    <ActivityWrapper>
      <Avatar size={64} icon="user" />
      <div style={{ marginLeft: 20 }}>
        <Title level={4}>Morning Meeting</Title>
        <Typography>Seluruh Anggota Perusahaan</Typography>
        <Typography>10.10 AM</Typography>
      </div>
    </ActivityWrapper>
  );
}

export default Activity;
export { ActivityRequest };
