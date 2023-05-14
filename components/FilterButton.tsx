import { Badge, Button } from "antd";
import React from "react";
import { IButtonData } from "./Filters";

export default function FilterButton({
  icon,
  title,
  withCount,
  withBadge,
}: IButtonData) {
  return (
    <Button className={"button"} icon={icon}>
      <div style={buttonContentStyle}>
        {title}
        {withCount && <span style={countContentStyle}>{withCount}</span>}
        {withBadge && (
          <div>
            <Badge
              color={"primary"}
              count={withBadge}
              style={badgeContentStyle}
            />
          </div>
        )}
      </div>
    </Button>
  );
}

const buttonContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row-reverse",
  alignContent: "center",
  flexWrap: "wrap",
};

const countContentStyle: React.CSSProperties = {
  color: "#c4c7ca",
  marginLeft: 5,
};

const badgeContentStyle: React.CSSProperties = {
  fontSize: "10px",
  width: "20px",
  padding: 0,
  height: "20px",
  marginBottom: 3,
  marginLeft: 5,
  backgroundColor: "#4b9d8e",
};
