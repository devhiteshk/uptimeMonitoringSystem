import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale } from "chart.js/auto";
Chart.register(CategoryScale);

interface plotInterface {
  lineData: number[];
  labels: string[];
  title: string;
  type: string;
}

export const BarChart = ({ lineData, labels, title, type }: plotInterface) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#fff", // Color of the x-axis labels
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#fff", // Color of the y-axis labels
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Response Time",
        backgroundColor:
          type === "UP" ? "#00c853" : type === "DOWN" ? "#dd2c00" : "#fb8c00",
        fill: false,
        borderColor:
          type === "UP" ? "#00c853" : type === "DOWN" ? "#dd2c00" : "#fb8c00",
        borderWidth: 0.6,
        tension: 0.6,
        data: lineData,
      },
    ],
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography textAlign={"center"} variant="body2" color="#f06292">
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Bar data={data} options={options} />
      </Box>
    </>
  );
};
