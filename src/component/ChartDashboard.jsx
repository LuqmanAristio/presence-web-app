import { Line } from "react-chartjs-2"
import React from "react"
import { DataSource } from "../data/DataSource"
import { Chart as ChartJS } from "chart.js/auto"
import styles from "../style/Chart.module.css"

export const ChartDashboard = () =>{

    

    const dataSource = () => ({
        labels: DataSource.map((data) => data.day),
        datasets: [
          {
            label: "Total User",
            data: DataSource.map((data) => data.userAtt),
            borderColor : 'rgba(76, 71, 230, 1)',
            backgroundColor: 'rgba(60, 55, 255, 1)',
            pointBackgroundColor : 'rgba(60, 55, 255, 1)',
            borderJoinStyle : 'round',
            fill: {
                target: 'origin',
                above: () => {
                  var ctx = document.getElementById("lineChart").getContext("2d");
                  const gradient = ctx.createLinearGradient(0, 100, 0, 500);
                  gradient.addColorStop(0, "rgba(76, 71, 230, 0.9)");
                  gradient.addColorStop(0.4, "rgba(76, 71, 230, 0.7)");
                  gradient.addColorStop(0.7, "rgba(76, 71, 230, 0.3)");
                  gradient.addColorStop(1, "rgba(60, 55, 255, 0.2)");
                  return gradient;
                },
            },
            tension : 0.4,
            pointBorderWidth : 7,
          },
        ],
      });

      const option = ({
        responsive : true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },
        },

        scales: {
            y: {
                ticks: {
                    padding : 10,
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 74);
                         return {
                           size: size,
                          weight: 600,
                          family : "Poppins",
                        };
                      },
                    color : 'rgba(63, 62, 75, 1)',
                },

                min : 1000,
                max : 1500,
            },

            x: {
                ticks: {
                    color : 'rgba(63, 62, 75, 1)',
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 64);
                         return {
                           size: size,
                          weight: 600,
                          family : "Poppins",
                        };
                      },
                    padding : 10,
                }
            }
        },
      })

    return(
        <div className={styles.chartContent}>
            <div className={styles.attendanceChart}>
                <Line data={dataSource()} options={option} className={styles.lineChart} id="lineChart" height={110} width={600}/>
            </div>
        </div>
    )
}