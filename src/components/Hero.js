import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chartjs.register(LineElement, CategoryScale, LinearScale, PointElement);

const Hero = () => {
  const data = {
    labels: [
      "1-р сар",
      "2-р сар",
      "3-р сар",
      "4-р сар",
      "5-р сар",
      "6-р сар",
      "7-р сар",
      "8-р сар",
      "9-р сар",
      "10-р сар",
      "11-р сар",
      "12-р сар",
    ],
    datasets: [
      {
        label: "Халуун ус",
        data: [8, 7.8, 6, 8, 6, 9, 7, 5, 6, 5, 8.8, 6],
        backgroundColor: "transparent",
        borderColor: "#f26c6d",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
      {
        label: "Хүйтэн ус",
        data: [5, 6, 7, 8, 5, 7, 6, 8, 7, 6, 9, 7],
        backgroundColor: "transparent",
        borderColor: "#36a2eb",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: (value) => value + "K",
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  useEffect(() => {
    const lastDataPoint1 =
      data.datasets[0].data[data.datasets[0].data.length - 1];
    const lastDataPoint2 =
      data.datasets[1].data[data.datasets[1].data.length - 1];

    console.log("Халуун ус: ", lastDataPoint1);
    console.log("Хүйтэн ус: ", lastDataPoint2);
  }, []);

  return (
    <div
      className="chartGrid"
      style={{
        width: "600px",
        height: "350px",
        marginTop: "80px",
        marginLeft: "40px",
      }}
    >
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default Hero;
