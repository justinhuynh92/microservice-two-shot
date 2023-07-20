import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { useState, useEffect } from 'react';
import ShoesList from './ListShoes';
import CreateShoe from './CreateShoe';

function App() {

  const [ shoes, setShoes ] = useState([]);

  async function getShoes() {
    const url = 'http://localhost:8080/api/shoes/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes);
    }
  }

  useEffect(() => {
    getShoes();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes" element={<ShoesList shoes={shoes} getShoes={getShoes} />} />
          <Route path="create-shoe" element={<CreateShoe getShoes={getShoes}  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
