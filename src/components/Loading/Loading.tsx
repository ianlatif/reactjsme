import React from "react";
import Lottie from "react-lottie";

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../../assets/animation/adroady.json")
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Lottie options={defaultOptions} width="500px" height="500px" />
    </div>
  );
}
