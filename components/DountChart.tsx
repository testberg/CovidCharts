import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";
import { DotChartOutlined } from "@ant-design/icons";
import * as z from "zod";

const Pie = dynamic(() => import("@ant-design/plots").then(({ Pie }) => Pie), {
  ssr: false,
});

interface IData {
  type: string;
  value: number;
}

const DountChart: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataSchema = z.object({
    type: z.string(),
    value: z.string(),
  });

  const dataArraySchema = z.array(dataSchema);

  useEffect(() => {
    const helper = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;date>=2023-04-01;date<2023-05-01;areaName=england&structure={"type":"date","value":"newCasesByPublishDate"}`
        );
        const { data: tempData } = await response.json();

        const result = dataArraySchema.safeParse(data);

        if (result.success) {
          setData(tempData.filter((a: IData) => a.value !== 0));
        } else {
          console.error("Invalid Data Schema");
        }
      } catch (e) {
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    helper();
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  };
  return <Pie {...config} style={{ background: "#ffffff", zIndex: 1 }} />;
};

export default DountChart;
