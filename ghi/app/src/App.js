import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatForm from './HatsForms';
import HatsList from './HatsList';

function App() {
  const [hats, setHats] = useState([]);
  const [locations, setLocations] = useState([])

  const getHats = async () => {
    const hatUrl = 'http://localhost:8090/api/locations'
    const hatResponse = await fetch(hatUrl);

    if (hatResponse.ok) {
      const data = await hatResponse.json();
      const hats = data.hats
      setHats(hats)
    }
  }

  const getLocations = async () => {
    const locationUrl = 'http://localhost8100/api/locations'
    const locationResponse = await fetch(locationUrl);

    if (locationResponse.ok) {
      const data = await locationResponse.json();
      const locations = data.locations
      setLocations(locations)
    }
  }

  useEffect( () => {
    getHats();
    getLocations();
  }, [
    setHats,
    setLocations,
  ]
  )
  console.log("These are the hats", hats);
  console.log("These are the locations", locations);

  if (hats === undefined && locations === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats">
            <Routh path="" element={<HatsList hats={hats} getHats={getHats} />}/>
            <Route path="new" element={<HatForm getHats={getHats} />} />
          </Route>
          <Route path="locations">
            <Route path="" element={<LocationsList locations={locations} getLocations={getLocations} />} />
            <Route path="new" element={<LocationForm getLocations={getLocations}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
