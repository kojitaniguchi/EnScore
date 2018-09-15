import React from "react"
import { Chart } from "react-google-charts"

export default ({ data, graphId, height, options, width }) =>
  <div>
    <Chart
      chartType="PieChart"
      data={data}
      graph_id={graphId}
      height={height}
      options={options}
      width={width}
    />
  </div>