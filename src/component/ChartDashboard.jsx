import { Line } from "react-chartjs-2"
import React from "react"

export const ChartDashboard = () =>{
    return(
        <div>
            <Line 
                data={{ 
                    labels: ['Red','Red','Red','Red','Red','Red'],
                 }}

                 height={400}
                 width={400}
            
            />
        </div>
    )
}