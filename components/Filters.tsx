import { Button, Grid, Space } from "antd";
import React from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { MdOutlineFileDownload, MdOutlineFilterList } from "react-icons/md";
import FilterButton from "./FilterButton";

export interface IButtonData {
  title: string;
  icon: React.ReactNode;
  withCount?: string;
  withBadge?: string;
}

export default function Filters() {
  const { useBreakpoint } = Grid;

  const { xs, lg } = useBreakpoint();
  const filterContainerStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    maxWidth: xs ? "100%" : "450px",
    marginBottom: lg ? "0" : "10px",
    overflowX: xs ? "scroll" : "hidden",
    padding: 10,
  };

  const demoButtons: IButtonData[] = [
    {
      title: "Export to PDF",
      icon: <MdOutlineFileDownload size={24} color={iconColor} />,
    },
    {
      title: "Notes",
      icon: <HiOutlineBars3BottomLeft size={24} color={iconColor} />,
      withCount: "(3)",
    },
    {
      title: "Filter",
      icon: <MdOutlineFilterList size={24} color={iconColor} />,
      withBadge: "+9",
    },
  ];
  return (
    <Space direction="horizontal" style={filterContainerStyle}>
      {demoButtons.map((button) => (
        <FilterButton key={button.title} {...button} />
      ))}
    </Space>
  );
}

const iconColor = "#4b9d8e";
