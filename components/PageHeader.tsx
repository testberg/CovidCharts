import { Layout } from "antd";
import React from "react";

export default function PageHeader() {
  const { Header } = Layout;

  return (
    <Header style={headerStyle}>
      <div style={logoStyle}>App title</div>
    </Header>
  );
}

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 50,
  paddingInline: 50,
  lineHeight: "50px",
  backgroundColor: "#ffffff",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  zIndex: 1,
};

const logoStyle: React.CSSProperties = {
  textAlign: "left",
  fontSize: 16,
  fontWeight: "bold",
  color: "#18403b",
};
