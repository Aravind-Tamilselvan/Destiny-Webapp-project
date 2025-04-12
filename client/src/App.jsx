import './App.css';
import './responsive.css'
import './pages/ui.css'
import './pages/authentication/auth.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useUser from './hooks/useUser';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Booking from './pages/booking/Booking';
import HomePage from './pages/Main-pages/HomePage';
import AdventurePage from './pages/Main-pages/AdventurePage';
import LuxuryPage from './pages/Main-pages/LuxuryPage';
import SoloBooking from './pages/Main-pages/SoloBooking';
import FamilyPage from './pages/Main-pages/FamilyPage';
import ProfilePage from './pages/authentication/ProfilePage';
import Details from './components/package-details/Details';
import TestimonialPage from './components/TestimonialPage';
import AuthPage from './pages/authentication/AuthPage';
import OrderConfirm from './pages/booking/OrderConfirm';
import ChatBot from './components/ChatBot';


function App() {
  const { user } = useUser()
  return (
    <div className="App">
      <div className='background-gradient'>
      </div>
      <div className='main-content'>
        {user && <NavBar />}
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/authentication" />} />
          <Route path='/authentication' element={!user ? <AuthPage /> : <Navigate to="/" />} />

          <Route path='/adventure-packages' element={<AdventurePage />} />
          <Route path='/luxury-packages' element={<LuxuryPage />} />
          <Route path='/family-packages' element={<FamilyPage />} />
          <Route path='/solo-packages' element={<SoloBooking />} />

          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/authentication" />} />
          <Route path="/packages/:id" element={user ? <Details /> : <Navigate to="/authentication" />} />
          <Route path="/Testimonial-page/:packageId/:id" element={user ? <TestimonialPage /> : <Navigate to="/authentication" />} />
          <Route path="/packages/:packageId/:id/booking" element={user ? <Booking /> : <Navigate to="/authentication" />} />
          <Route path="/booking-success" element={user === undefined ? (<p style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</p> ) : user ? ( <OrderConfirm /> ) : ( <Navigate to="/authentication" />)} />
          <Route path="/booking-cancel" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {user && <ChatBot />}
      {/* Footer */}
      {user && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
