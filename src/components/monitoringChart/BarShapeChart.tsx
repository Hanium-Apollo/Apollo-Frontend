import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
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
  Bytes: number;
}

const MAX_DATA_POINTS = 5;

const BarShapeChart = (props: DataProps) => {
  const [data, setData] = useState<DataPoint[]>([
    { name: moment().format("HH:mm"), Bytes: Math.floor(Math.random() * 100) },
  ]);
  const [fontSize, setFontSize] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData: DataPoint[] = [
          ...prevData.slice(-(MAX_DATA_POINTS - 1)),
          {
            name: moment().format("HH:mm"),
            Bytes: Math.floor(Math.random() * 100),
          },
        ];
        return newData;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleResize = () => {
    const chart = document.querySelector(".recharts-wrapper");
    if (chart) {
      const chartWidth = chart.getBoundingClientRect().width;
      const calculatedFontSize = chartWidth * 0.01; // 차트 너비의 1%를 폰트 크기로 설정
      setFontSize(calculatedFontSize);
    }
  };

  useEffect(() => {
    handleResize(); // 초기 로딩 시 폰트 크기 설정

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="chart-container">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ dy: 6 }} />
          <YAxis tick={{ dy: 8 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Bytes" fill="rgba(75,192,192,1)" />
        </BarChart>
      </ResponsiveContainer>
      <style>{`.recharts-x-axis { font-size: ${fontSize}px; }`}</style>
    </div>
  );
};

export default BarShapeChart;
