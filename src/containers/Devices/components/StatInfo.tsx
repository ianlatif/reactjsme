import React from "react";
import { StatInfoWrapper } from "../styles";
import { StatInfoProps } from "../types";

const StatInfo = (props: StatInfoProps) => {
  return (
    <StatInfoWrapper bgColor={props.bgColor}>
      <div className="image">{props.image}</div>
      <div>{props.name}</div>
      <div className="value">{props.value}</div>
    </StatInfoWrapper>
  );
};

export default StatInfo;
