import './Panel.css';


export default function Panel(props) {
    return (
      <div className="panel">
        <div className="info">
          <div className="title">
            { props.title && <h3>{props.title}</h3> }
          </div>
          <div className="body">
          {props.info}
          </div>
        </div>
        <div className="content">
          {props.content}
        </div>
      </div>
    )
  }