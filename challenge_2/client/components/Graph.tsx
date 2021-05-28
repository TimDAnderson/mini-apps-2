import * as React from "react";
import { VictoryPie, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer, VictoryCursorContainer } from "victory";
import styled from "styled-components";

// import {Line} from 'react-chartjs-3'
// import Chart from 'chart.js/auto';

export interface GraphProps {
  dataArray: Array<Object>
}

const StyledLineGraph = styled.div`
  height: 400px;
  width: 800px;
`;

export const GraphComponent = (props: GraphProps) => {

  var [zoomDomain, setZoomDomain] = React.useState<any>(new Date(2009, 1, 1));

  const handleZoom = (domain: any) => {
    setZoomDomain(domain)
  }



  return (
    <div>
      <h3>This is the graph</h3>
    <StyledLineGraph>
    <VictoryChart width={600} height={470} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
            />


          }
        >
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={props.dataArray}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600} height={100} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={zoomDomain}
                onBrushDomainChange={handleZoom}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={props.dataArray}
              x="a"
              y="b"
            />
          </VictoryChart>
    </StyledLineGraph>
    </div>
  )
}