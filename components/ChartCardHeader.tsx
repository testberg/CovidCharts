import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface HeaderProps {
  chartTitle: string;
  items: { title: string; id: string }[] | undefined;
  handle: (favTitle: string) => Promise<void>;
}
export default function ChartCardHeader({
  chartTitle,
  items,
  handle,
}: HeaderProps) {
  const [updatingFav, setUpdatingFav] = useState(false);
  const iconStyle: React.CSSProperties = {
    color: "red",
    width: 24,
    cursor: updatingFav ? "progress" : "pointer",
  };
  const handleFav = () => {
    setUpdatingFav(true);
    handle(chartTitle);
    setUpdatingFav(false);
  };

  return (
    <div style={charCardHeaderStyle}>
      {chartTitle}
      {items?.filter((el: { title: string }) => {
        return el.title === chartTitle;
      }).length === 0 ? (
        <FaHeart style={iconStyle} onClick={handleFav} />
      ) : (
        <FaRegHeart style={iconStyle} onClick={handleFav} />
      )}
    </div>
  );
}

const charCardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "15px",
  color: "black",
  fontWeight: "bold",
  cursor: "default",
};
