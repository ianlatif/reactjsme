import styled from "styled-components";
import { Card } from "antd";
import { StatInfoWrapperProps } from "./types";

export const CardDeviceWrapper = styled(Card)`
  border-radius: 10px;
  overflow: hidden;
`;

export const StatInfoWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  .image {
    font-size: 24px;
    padding: 10px;
    background-color: ${(props: StatInfoWrapperProps) =>
      props.bgColor || " #1da7d6"};
    color: #fff;
    border-radius: 58px;
    width: 58px;
    height: 58px;
    margin: 0 auto 20px;
  }
  .value {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const BarChartWrapper = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
`;
