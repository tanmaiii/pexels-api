import './App.css';
import Routes from './config/Routes';
import {BrowserRouter} from 'react-router-dom'
import Header from './components/header/Header';
import Pooter from './components/footer/Footer'

function App() {

  return (
    <BrowserRouter>
      <div className='container'>
          <Header />  
      </div>
      <Routes/>
      <Pooter/>
    </BrowserRouter>
  );
}

export default App;
