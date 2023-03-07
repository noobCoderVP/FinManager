import React, { useState } from "react";
import { Data } from "data";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

function ChartComponent() {
    const [chartData, setChartData] = useState({
        labels: Data.map(data => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map(data => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020",
                        },
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
        </div>
    );
}

export default ChartComponent;

//* Tutorial
// command: npm i chart.js
// command: npm i react-chartjs-2
