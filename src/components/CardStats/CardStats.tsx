import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

interface CardStatsWrapperProps {
  secondary?: boolean;
}

const { Text, Title } = Typography;

const CardStatsWrapper = styled.div`
  border-radius: 20px;
  color: #fff;
  padding: 20px;
  background: ${(props: CardStatsWrapperProps) =>
    props.secondary ? "#52de97" : "#1890ff"};
`;

const TextGroup = styled.div`
  display: flex;
  align-items: flex-end;
`;

function CardStats({ secondary }: CardStatsWrapperProps) {
  return (
    <CardStatsWrapper secondary={secondary}>
      <div>On Time</div>
      <TextGroup>
        <Title style={{ color: "#ffff", marginBottom: 0 }}>14</Title>
        <Text style={{ color: "#ffff", marginLeft: 10 }}>days in february</Text>
      </TextGroup>
    </CardStatsWrapper>
  );
}

export default CardStats;
