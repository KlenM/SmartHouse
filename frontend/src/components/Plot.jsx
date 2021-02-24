import { Line } from 'react-chartjs-2';
import './Plot.css';


export default function Plot(props) {
  let color = "rgba(255, 255, 255, 0.6)"

  if (props.data) {
    return ( 
        <div className="plot">
            <div style={{"position": "relative", "height": "99%", "width": "99%"}}>
            <Line 
              data={{
                labels: props.data.map((measure) => new Date(measure["date"])),
                datasets: [
                  {
                    data: props.data.map((measure) => measure[props.field]),
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    fill: false,
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                  }
                ]
              }}
              options={{ 
                maintainAspectRatio: false, 
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                legend: {
                  display: false,
                },
                elements: {
                  line: {
                    tension: 0
                  }
                },
                tooltips: {
                    intersect: false,
                    mode: "index",
                    position: "nearest",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
                scales: {
                  xAxes: [{
                    type: 'time',
                    gridLines: {
                      display: false,
                      color: color,
                      lineWidth: 1,
                      },
                    ticks: {
                      fontColor: color,
                      minRotation: 15,
                      maxRotation: 15,
                      autoSkipPadding: 20,
                      sampleSize: 1,
                      major: {
                        enabled: true,
                        fontColor: "rgba(255, 255, 255, 0.8)"
                      },
                    },
                  }],
                  yAxes: [{
                    position: "right",
                    gridLines: {
                      display: true,
                      color: "rgba(255, 255, 255, 0.03)",
                      lineWidth: 1,
                      },
                    ticks: {
                      display: true,
                      fontColor: color,
                      minRotation: 0,
                      maxRotation: 0,
                      autoSkipPadding: 30
                    }
                  }]
                }
                }}
                />
            </div>
        </div>
      )
    } else {
    return (
      <div className="plot">
        Loading...
      </div>
    )
  }  
  }