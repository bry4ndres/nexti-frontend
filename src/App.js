import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './components/EventDetails/EventDetails';
import EditEvent from './components/EventEdit/EditEvent';
import HomeButton from './components/HomeButton/HomeButton';
import CreateEvent from './components/CreateEvent/CreateEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    <Router>
      <div>
      <ToastContainer />
      <HomeButton />
        <Routes>       
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event/:id/edit" element={<EditEvent />} />
          <Route path="/create" element={<CreateEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
