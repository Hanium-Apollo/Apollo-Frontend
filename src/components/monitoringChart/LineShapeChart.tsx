import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { DataProps } from "../../pages/Monitoring/Monitor";

interface DataPoint {
  name: string;
  Percent: number;
}

const LineShapeChart = (props: DataProps) => {
  const [data, setData] = useState<DataPoint[]>([]);

  const xAxisRef = useRef<SVGSVGElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (xAxisRef.current) {
        const chartWidth = xAxisRef.current.getBoundingClientRect().width;
        const calculatedFontSize = chartWidth * 0.01; // 차트 너비의 1%를 폰트 크기로 설정
        setFontSize(calculatedFontSize);
      }
    };

    handleResize(); // 초기 로딩 시 폰트 크기 설정

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // props.values가 변경될 때마다 데이터 업데이트
    console.log("Props: ", props.timestamps, props.values);
    if (props.timestamps) {
      const newData = props.timestamps.map((timestamp, index) => ({
        name: moment(timestamp).format("HH:mm"),
        Percent: props.values[index],
      }));
      setData(newData);
    }
  }, [props.timestamps, props.values]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="chart-container">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" tick={{ dy: 8 }} reversed={true} />
          <YAxis tick={{ dy: 8 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="Percent"
            stroke="rgba(75,192,192,1)"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
      <style>{`.recharts-x-axis { font-size: ${fontSize}px; }`}</style>
    </div>
  );
};

export default LineShapeChart;
