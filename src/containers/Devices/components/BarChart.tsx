import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChartWrapper } from "../styles";
import { Row, Typography, DatePicker } from "antd";
import { BarChartProps } from "../types";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const BarChart = (props: BarChartProps) => {
  const data = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    let gradient;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 100, 0);
    }

    return {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            gradient,
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  return (
    <div style={{ marginTop: 40 }}>
      <Row justify="space-between">
        <Text strong style={{ fontSize: 18 }}>
          {props.title}
        </Text>
        <RangePicker />
      </Row>
      <br />
      <BarChartWrapper>
        <Bar data={data} />
      </BarChartWrapper>
    </div>
  );
};

export default BarChart;
