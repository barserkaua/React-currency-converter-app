import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import ConverterScreen from '../../screens/СonverterScreen/ConverterScreen';
import CurrentExchangeScreen from "../../screens/CurrentExchangeScreen/CurrentExchangeScreen";
import Header from '../Header/Header';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
              <Route path="/" element={<CurrentExchangeScreen/>} exact/>
              <Route path="/converter" element={<ConverterScreen/>}/>
          </Routes>
        </Container>
      </main>
    </Router>
    
  );
}

export default App;
