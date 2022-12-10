import { Line } from "react-chartjs-2"
import React from "react"
import { Chart as ChartJS } from "chart.js/auto"
import styles from "../style/Chart.module.css"
import { useUser } from "./UserContext";
import {useEffect, useRef, useState} from 'react'
import axios from "axios"

export const ChartDashboard = () =>{

    const[chartData,setChartData] = useState([]);
    const currentUser = useUser();
    const [loadingStatus, setLoading] = useState(true);

    async function fetchData() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances/weekly`, {
            headers: {
                Authorization: `Bearer ${currentUser}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setChartData(response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
      fetchData();
   }, [currentUser]);

   function filterById(obj) {
    if (obj.id !== 6 && obj.id !== 7) 
    {
      return true
    }
    return false;
  }

  let chartFiltered = chartData.filter(filterById);
  let maxAttendance = Math.max(...chartFiltered.map(data => data.userAtt));

  const dataSource = () => ({
    labels: chartFiltered.map((data) => data.day),
    datasets: [
      {
        label: "Total User",
        data: chartFiltered.map((data) => data.userAtt),
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

            min : 0,
            max : maxAttendance,
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
          {loadingStatus &&
            <div className={styles.spinner}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          }

          {!loadingStatus &&
            <div className={styles.attendanceChart}>
              <Line data={dataSource()} options={option} className={styles.lineChart} id="lineChart" height={110} width={600}/>
            </div>
        }
            
        </div>
    )
}