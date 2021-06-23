import * as React from "react";
import styled from "styled-components";

import { Line } from 'react-chartjs-3'
import Chart from 'chart.js/auto';

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
      hi
    </StyledLineGraph>
    </div>
  )
}