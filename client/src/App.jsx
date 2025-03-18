import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
    </>
  )
}

export default App