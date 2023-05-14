import { Avatar, Card, Col, Skeleton } from "antd";
import React from "react";
import ChartCardHeader from "./ChartCardHeader";
import ColumnsChart from "./ColumnsChart";
import DountChart from "./DountChart";
import { MdOutlineMessage } from "react-icons/md";
import { DotChartOutlined } from "@ant-design/icons";

export default function ChartContainer({
  chartTitle,
  items,
  index,
  handle,
}: {
  chartTitle: string;
  items: { title: string; id: string }[] | undefined;
  index: number;
  handle: (favTitle: string) => Promise<void>;
}) {
  return (
    <Col xs={{ span: 24 }} md={{ span: 12 }} key={chartTitle}>
      <Card
        hoverable
        title={
          <ChartCardHeader
            chartTitle={chartTitle}
            items={items}
            handle={handle}
          />
        }
        bordered={false}
        actions={[
          <div key={"actions"} style={footerStyle}>
            <Avatar
              key={"avatar"}
              size={"default"}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <div key={"messages"} style={messagesWrapperStyle}>
              <div key={"number"}>3</div>
              <MdOutlineMessage
                key={"icon-message"}
                size={32}
                style={messagesIconStyle}
              />
            </div>
          </div>,
        ]}
      >
        <div key={"content-div"} style={chartContainerStyle}>
          <div key={"skeleton-div"} style={skeletonWrapperStyle}>
            <Skeleton.Node style={skeletonStyle} active={true}>
              <DotChartOutlined style={chartIconStyle} />
            </Skeleton.Node>
          </div>
          <div key={"chart-div"} style={chartStyle}>
            {index === 0 ? <ColumnsChart /> : <DountChart />}
          </div>
        </div>
      </Card>
    </Col>
  );
}

const footerStyle: React.CSSProperties = {
  display: "flex",
  padding: "0 24px",
  justifyContent: "space-between",
  color: "#c4c7ca",
  fontSize: "15px",
  cursor: "default",
};

const chartStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 10,
};

const skeletonStyle: React.CSSProperties = {
  height: 400,
  width: 400,
};

const skeletonWrapperStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const chartIconStyle: React.CSSProperties = {
  fontSize: 40,
  color: "#bfbfbf",
};

const messagesWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  fontSize: 18,
};

const messagesIconStyle: React.CSSProperties = {
  transform: "scaleX(-1)",
  marginLeft: 5,
};

const chartContainerStyle: React.CSSProperties = {
  position: "relative",
  height: 400,
};
