import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

const FloatingActionWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
`;

interface FloatingActionProps {
  onClick?: () => any;
}

const FloatingAction = ({ onClick }: FloatingActionProps) => {
  return (
    <FloatingActionWrapper onClick={onClick}>
      <Button
        type="primary"
        size="large"
        shape="circle"
        icon={<PlusOutlined />}
      ></Button>
    </FloatingActionWrapper>
  );
};

export default FloatingAction;
