import {useEffect} from 'react';
import './App.css';
import Measure from './components/Measure';
import Plot from './components/Plot';
import Panel from './components/Panel';
import useGetFetch from './hooks/useGetFetch';


function App() {
  let [measures, refetchMeasures] = useGetFetch("/api/measures/", {"period": "48h"})
  let [measuresNow, refetchNow] = useGetFetch("/api/measures/now/", {})
  let [measuresAvg, refetchAvg] = useGetFetch("/api/measures/today/", {})

  useEffect(() => {
    setInterval(() => {refetchNow()}, 90000);
    setInterval(() => {refetchMeasures()}, 90000);
    setInterval(() => {refetchAvg()}, 300000);
  }, [])

  const about = (
    <div className="about">
      <p>
        <a href="#">Project description</a><br />
        <a href="#">Github repository</a>
      </p>
      <p>(c) Nikita Yurin</p>
    </div>
    )
    
  return (
    <div className="board">
      <Panel 
        title="≡ Temperature In" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.temperature_in} 
          dimension="℃" 
          avg={measuresAvg.response && measuresAvg.response.temperature_in} 
          />}
        content={
          measures.response && <Plot data={measures.response} field="temperature_in" />
        }
        />
      <Panel 
        title="☀ Temperature Out" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.temperature_out} 
          dimension="℃" 
          avg={measuresAvg.response && measuresAvg.response.temperature_out} 
          />}
          content={
            measures.response && <Plot data={measures.response} field="temperature_out" />
          }
        />
      <Panel 
        title="≡ Pressure In" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.pressure_in} 
          dimension="mmHg" 
          avg={measuresAvg.response && measuresAvg.response.pressure_in} 
          />}
        content={
          measures.response && <Plot data={measures.response} field="pressure_in" />
        }
        />
      <Panel 
        title="≡ Pressure Out" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.pressure_out} 
          dimension="mmHg" 
          avg={measuresAvg.response && measuresAvg.response.pressure_out} 
          />}
        content={
          measures.response && <Plot data={measures.response} field="pressure_out" />
        }
        />
      <Panel 
        title="≡ Humidity In" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.humidity_in} 
          dimension="%" 
          avg={measuresAvg.response && measuresAvg.response.humidity_in} 
          />}
        content={
          measures.response && <Plot data={measures.response} field="humidity_in" />
        }
        />
      <Panel 
        title="≡ Humidity Out" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.humidity_out} 
          dimension="%" 
          avg={measuresAvg.response && measuresAvg.response.humidity_out} 
          />}
        content={
          measures.response && <Plot data={measures.response} field="humidity_out" />
        }
        />
      <Panel 
        title="≡ Moisture" 
        info={<Measure 
          value={measuresNow.response && measuresNow.response.moisture} 
          dimension="%" 
          avg={measuresAvg.response && measuresAvg.response.moisture} 
          />}
        content={
          measures.response && <Plot data={measures.response} field="moisture" />
        }
        />
      <Panel content={about} />
    </div>
  );
}

export default App;
