import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "광주 광역시에 거주하는 30대 남성이 이용하는 커뮤니티 통계",
    },
  },
  scales: {
    x: {
      max: 100,
      ticks: {
        callback: (value) => `${value}%`, // x축 레이블에 '%' 추가
      },
    },
  },
};

function CustomChart({ labels, firstDatas, secondDatas }) {
  const data = {
    labels,
    datasets: [
      {
        label: "2020년",
        data: firstDatas,
        borderColor: "#B4B4B4",
        backgroundColor: "#B4B4B4",
      },
      {
        label: "2021년",
        data: secondDatas,
        borderColor: "#53AC8E",
        backgroundColor: "#53AC8E",
      },
    ],
  };

  return (
    <div style={{ width: "50%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default CustomChart;
