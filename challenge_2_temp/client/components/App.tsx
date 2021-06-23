import * as React from "react";
import axios from "axios";
import { GraphComponent } from './Graph';
// import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
// import { VictoryPie, VictoryChart, VictoryLine, VictoryTheme } from "victory";
// import { ResponsiveLine } from '@nivo/line'
// import { LineChart } from 'recharts';



export const App = () => {

  var [labels, setLabels] = React.useState<Array<string>>(['1', '2', '3', '4', '5', '6']);
  var [graphData, setGraphData] = React.useState<Array<number>>([12, 19, 3, 5, 2, 3]);
  var [dataArray, setDataArray] = React.useState<any>([]);

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await axios.get('/data/btc/historical')
    const dateObj = response.data.bpi;
    let tempArray = [];
    for (let key in dateObj) {
      tempArray.push({a: new Date(key), b: dateObj[key]})
    }
    console.log(tempArray)
    setDataArray(tempArray)
  }

  // console.log('this is the data');
  // console.log(dataArray);

  return (
    <div>
      <h1>welcome to the bit coin tracker thingy</h1>
      <GraphComponent dataArray={dataArray}/>
    </div>
  )
}