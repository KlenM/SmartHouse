import './Measure.css';


export default function Measure(props) {
    return (
      <div className="measure">
        { props.value &&
          <div className="value">
            {props.value} <sup>{props.dimension}</sup>
          </div>
        }
        { props.avg &&
          <div className="avg">
            Avg today: <span className="avg-value">{props.avg}</span> <sup>{props.dimension}</sup>
          </div>
        }
      </div>
    )
  }