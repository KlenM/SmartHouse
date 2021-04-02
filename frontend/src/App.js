import {useEffect} from 'react';
import './App.css';
import Info from './components/Info';
import Plot from './components/Plot';
import Panel from './components/Panel';
import useGetFetch from './hooks/useGetFetch';
// import {useWindowWidth} from '@react-hook/window-size'


function App() {
  let [measures, refetchMeasures] = useGetFetch("https://smarthouse.yurin.space/api/measures/", {"period": "48h"})
  let [measuresNow, refetchNow] = useGetFetch("https://smarthouse.yurin.space/api/measures/now/", {})
  let [measuresAvg, refetchAvg] = useGetFetch("https://smarthouse.yurin.space/api/measures/today/", {})

  // useEffect(() => {
  //   setInterval(() => {refetchNow()}, 90000);
  //   setInterval(() => {refetchMeasures()}, 90000);
  //   setInterval(() => {refetchAvg()}, 300000);
  // }, [])

  const panels = [
    {"title": "Temperature In", "field": "temperature_in", "dimension": "℃"},
    {"title": "Temperature Out", "field": "temperature_out", "dimension": "℃"},
    {"title": "Pressure Out", "field": "pressure_out", "dimension": "mmHg"},
    {"title": "Pressure In", "field": "pressure_in", "dimension": "mmHg"},
    {"title": "Humidity In", "field": "humidity_in", "dimension": "%"},
    {"title": "Humidity Out", "field": "humidity_out", "dimension": "%"},
    {"title": "Moisture", "field": "moisture", "dimension": "%"}
  ]  
  
  return (
    <div className="board">
      {panels.map((value) => (
        <Panel key={value.field}>
          <Info 
            title={value.title} 
            value={measuresNow.response && measuresNow.response[value.field]} 
            dimension={value.dimension} 
            avg={measuresAvg.response && measuresAvg.response[value.field]} 
            />
          <Plot 
            data={measures.response} 
            field={value.field} 
            />
        </Panel>
      ))}

      <Panel>
        <div className="about">
          <div>
            <a href="#">Project description</a><br />
            <a href="https://github.com/NYurin/SmartHouse" target="__blank">Github repository</a>
            <br/><br/>
            (c) Nikita Yurin
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default App;
