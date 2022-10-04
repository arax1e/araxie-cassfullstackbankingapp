//define router components from the routing library
const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props){ //creates the card component used in all the other pages 
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' '; //if bgcolor, put it in there, if not set it blank
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white'; //if txtcolor, add it in, if not, set to text-white
      return 'card mb-3 ' + bg + txt;
    }
    function styles(){
      const wdth = props.width ? props.width : 18;
      return {maxWidth: `${wdth}rem`};
    }
  
    return (
      <div className={classes()} style={styles()}>
        <div className="card-header">{props.header}</div> {/*Takesa property header, which the component using this card can pass in */}
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)} {/*Check if these properties exist, add if they do */}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)} {/*will be used to notify and update the UI when we do things like creating accounts */}
        </div>
      </div>      
    );    
  }