import React, { useEffect, useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import * as z from 'zod';

const Column = dynamic(
  () => import('@ant-design/charts').then(({ Column }) => Column),
  { ssr: false },
);

type ChartType = 'New Cases' | 'New Deaths';

interface IData {
  type: ChartType;
  value: number;
  date: string;
}

interface IApiData {
  date: string;
  name: string;
  code: string;
  newCases: number;
  newDeaths: number;
}

const ColumnsChart = () => {
  const [chartData, setChartData] = useState<IData[]>([]);

  // using css to show chart skeleton instead of loading
  // as rendering chart takes some time after loading from api
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataSchema = z.object({
    type: z.string(),
    value: z.number(),
    date: z.string(),
  });

  const dataArraySchema = z.array(dataSchema);

  useEffect(() => {
    const helper = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.coronavirus.data.gov.uk/v1/data?filters=date>=2023-05-01;areaName=England;areaType=nation&structure={"date":"date","name":"areaName","code":"areaCode","newCases":"newCasesByPublishDate","newDeaths":"newDeaths28DaysByPublishDate"}`,
        );
        const { data } = await response.json();
        let tempData: IData[] = [];
        data.forEach((element: IApiData) => {
          if (element.newCases > 0 && element.newDeaths > 0) {
            tempData.push({
              type: 'New Deaths',
              value: element.newDeaths,
              date: element.date,
            });
            tempData.push({
              type: 'New Cases',
              value: element.newCases,
              date: element.date,
            });
          }
        });
        if (tempData.length > 0) {
          const result = dataArraySchema.safeParse(tempData);

          if (result.success) {
            setChartData(tempData);
          } else {
            console.error('Invalid Data Schema');
          }
        }
      } catch (e) {
        setChartData([]);
      } finally {
        // setIsLoading(false);
      }
    };
    helper();
  }, []);

  const config = {
    data: chartData,
    isGroup: true,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',

    color: ['#7dcdb2', '#4b9d8f'],
  };
  return <Column {...config} style={{ background: '#ffffff', zIndex: 1 }} />;
};
export default ColumnsChart;
