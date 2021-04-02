import './Info.css';


export default function Info(props) {
    return (
      <div className="info">
        <div className="title">
          {props.title}
        </div>
        {props.value && 
          <div className="data">
            {props.value} <sup>{props.dimension}</sup>
            <div className="description">
              Avg. today <b>{props.avg}</b> <sup>{props.dimension}</sup>
            </div>
          </div>
        }
      </div>
    )
  }