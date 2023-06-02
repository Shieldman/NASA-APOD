
import { useDeferredValue, useEffect, useState } from "react";
import "./App.css";
import RoverAPI from "./components/RoverAPI";
import ApodApi from "./components/apodApi";

function App() {
  // Recuperamos la fecha actual en un formato ISO -> 2023-01-01 (tuneado para hacerlo con estados)

  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const [page, setPage] = useState('apod');

  // Crearemos una función que setee la fecha a través de un input en el formato
  // necesario (igual que el formato de today)

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString()); // .toLocaleString() sirve para formatear la fecha
  };

  const handleClickToday = () => {
    setDate(today);
  };

  const handleSelectApi=(ev)=>{
    if(ev.target.value=='apod'){
      setPage('apod');
    } else {
      setPage('rover');
    }
  }

  const selectedPage = (ev) =>{
      if (ev=='apod') {
        return (<ApodApi date={date}/>);
      } else {
        return (<RoverAPI date={date}/>);
      }
  }

  useEffect(()=>{
    
  },[page]);

  return (
    <div className="App">
      <div className="search-container">
        <h1>NASA Pictures</h1>
        <div className="date-selector">
          <select name="api-select" id="api-select" onChange={handleSelectApi}>
            <option value="apod" defaultChecked>Astronomic picture of the Day</option>
            <option value="rover">Mars Rover Photo</option>
          </select>
          <p>Esta imagen corresponde con la fecha:</p>
          <input type="date" value={date} onChange={handleInput} max={today}/>
          <button onClick={handleClickToday}>Resetear la fecha</button>
        </div>
      </div>

      {selectedPage(page)}


    </div>
  );
}

export default App;
