import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "forecast of temprature in F",
    },
  },
};
const ForecastWeather = ({ forecastData }: any) => {
  const labels = forecastData?.map((item: any) => item?.dt_txt?.split(" ")[1]);

const highTemp=forecastData.map((item: any) => item?.main?.temp_max);
const lowTemp=forecastData.map((item: any) => item?.main?.temp_min)
  const data = {
    labels,
    datasets: [
      {
        label: "Maximum temperature",
        data: highTemp,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Minimum temperature",
        data: lowTemp,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ForecastWeather;
