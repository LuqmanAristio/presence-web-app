import { Line } from "react-chartjs-2"
import React from "react"
import { DataSource } from "../data/DataSource"
import { Chart as ChartJS } from "chart.js/auto"
import styles from "../style/Chart.module.css"

export const ChartDashboard = () =>{

    const dataSource = ({
        labels: DataSource.map((data) => data.day),
        datasets: [
          {
            label: "Total User",
            data: DataSource.map((data) => data.userAtt),
            borderColor : 'rgba(54, 94, 125, 1)',
            backgroundColor: 'rgba(54, 94, 125, 1)',
            pointBackgroundColor : 'rgba(54, 94, 125, 1)',
            borderJoinStyle : 'round',
            fill: {
                target: 'origin',
                above: 'rgba(54, 94, 125, 0.4)',
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
                          weight: 600
                        };
                      },
                    color : 'rgba(54, 94, 125, 1)',
                },

                min : 1000,
                max : 1500,
            },

            x: {
                ticks: {
                    color : 'rgba(54, 94, 125, 1)',
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 64);
                         return {
                           size: size,
                          weight: 600
                        };
                      },
                    padding : 10,
                }
            }
        },
      })

    return(
        <div className={styles.chartContent}>
            <h1>Overview</h1>
            <div className={styles.attendanceChart}>
                <h3 className={styles.titleChart}>Attendance</h3>
                <Line data={dataSource} options={option} className={styles.lineChart} height={110} width={600}/>
            </div>
            <div className={styles.absentChart}>
                <h3 className={styles.titleChart}>Absent</h3>
                <Line data={dataSource} options={option} className={styles.lineChart} height={110} width={600}/>
            </div>
        </div>
    )
}