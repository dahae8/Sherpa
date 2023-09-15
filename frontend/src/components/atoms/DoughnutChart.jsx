import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function makeDoughnutChart({ labels, datas, width, fontSize }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: datas,
        backgroundColor: ["#D33B4D", "#F8CE7E", "#B4B4B4", "#53AC8E"],
        borderColor: ["#D33B4D", "#F8CE7E", "#B4B4B4", "#53AC8E"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: fontSize,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: width }}>
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default makeDoughnutChart;
