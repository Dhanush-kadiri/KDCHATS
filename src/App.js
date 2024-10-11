import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import BusinessPartnerPage from './components/BusinessPartnerPage';




function App() {
  return (
   <BrowserRouter>
        <Routes>

          <Route path='/' element = { < Home /> } />
          <Route path='/CostomerPage' element = { < CustomerPage /> } />
          <Route path='/BusinessPartnerPage' element = { < BusinessPartnerPage /> } />

        </Routes>
   </BrowserRouter>
  );
}

export default App;